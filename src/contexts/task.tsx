import { createContext, useState, useEffect } from "react";

type Task = {
	title: string;
	id: string;
	checked: boolean;
}

type TaskContextType = {
	data: Task[];
	id: string,
	editAction: boolean;
	taskTitle: string;
	cancelAction(): void;
	create(task: Task): void;
	deleteTask(taskId: string): void;
	check(taskId: string): void;
	selectTask(taskId: string): void;
	edit(task: Task): void;
}

type TaskProviderProps = {
	children: JSX.Element;
}

const localToDoList = localStorage.getItem("tasks");
const toDoListInitialValue: Task[] = [];

export const TaskContext = createContext<TaskContextType>({
	data: [],
	id: '',
	editAction: false,
	taskTitle: '',
	cancelAction() {
		console.log("cancel");
	},
	selectTask(taskId) {
		console.log(taskId, "deleted");
	},
	create(task) {
		console.log(task, "created");
	},
	deleteTask(taskId) {
		console.log(taskId, "deleted");
	},
	check(taskId) {
		console.log(taskId, "checked");
	},
	edit(task) {
		console.log(task, "edited");
	}
})

export function TaskProvider({ children }: TaskProviderProps) {
	const [toDoList, setToDoList] = useState(() =>
		localToDoList ? JSON.parse(localToDoList) : toDoListInitialValue
	);
	const [isTaskEdit, setisTaskEdit] = useState(false);
	const [taskSelectedId, setTaskSelectedid] = useState('');
	const [taskTitleEdited, setTaskTitleEdited] = useState('');

	const createTask = (task: Task) => {
		setToDoList([...toDoList, task])
	}

	const deleteTask = (taskId: string) => {
		const taskList = toDoList.filter((task: Task) => task.id.toString() !== taskId)

		setToDoList(taskList);
	}

	const checkTask = (taskId: string) => {

		const newTasks = toDoList.map((task: Task) => {
			if (task.id.toString() === taskId) task.checked = !task.checked;
			return task
		});

		setToDoList(newTasks);
	}

	const selectTaskToEdit = (taskId: string) => {
		setisTaskEdit(true);

		const taskTitle = toDoList.filter((task: Task) => 
			(task.id.toString() === taskId) 
		)[0]["title"];

		setTaskTitleEdited(taskTitle);
		if (taskId) setTaskSelectedid(taskId);
	}

	const cancelEditTask = () => {
		setisTaskEdit(false);
	}

	const editTask = (taskEdited: Task) => {
		console.log(taskEdited);
		const newTasks = toDoList.map((task: Task) => {
			if (task.id.toString() === taskEdited.id) task.title = taskEdited.title;
			return task
		});

		setToDoList(newTasks);
		setisTaskEdit(false);
	}

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(toDoList));
	}, [toDoList])

	const value = {
		data: toDoList,
		id: taskSelectedId,
		editAction: isTaskEdit,
		taskTitle: taskTitleEdited,
		cancelAction: cancelEditTask,
		create: createTask,
		deleteTask: deleteTask,
		check: checkTask,
		selectTask: selectTaskToEdit,
		edit: editTask
	}

	return (
		<TaskContext.Provider value={value}>
			{children}
		</TaskContext.Provider>
	)

}