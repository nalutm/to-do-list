import { GlobalTheme } from "@carbon/react";
import { createContext, useState, useEffect } from "react";

type Task = {
	title: string;
	id: string;
	checked: boolean;
}

type TaskContextType = {
	cancelAction(action: 'edit' | 'delete'): void;
	check(taskId: string): void;
	create(task: Task): void;
	data: Task[];
	deleteAction: boolean;
	deleteTask(taskId?: string): void;
	edit(task: Task): void;
	editAction: boolean;
	id: string,
	selectTask(taskId?: string, action?: 'edit' | 'delete'): void;
	taskTitle: string;
}

type TaskProviderProps = {
	children: JSX.Element;
}

const localToDoList = localStorage.getItem("tasks");
const toDoListInitialValue: Task[] = [];

export const TaskContext = createContext<TaskContextType>({
	cancelAction(action) {
		console.log(action);
	},
	check(taskId) {
		console.log(taskId, "checked");
	},
	create(task) {
		console.log(task, "created");
	},
	data: [],
	deleteAction: false,
	deleteTask(taskId) {
		console.log(taskId, "deleted");
	},
	editAction: false,
	edit(task) {
		console.log(task, "edited");
	},
	id: '',
	selectTask(taskId, action) {
		console.log(taskId, action);
	},
	taskTitle: ''
})

export function TaskProvider({ children }: TaskProviderProps) {
	const theme = 'g100';

	const [toDoList, setToDoList] = useState(() =>
		localToDoList ? JSON.parse(localToDoList) : toDoListInitialValue
	);

	const [taskSelectedId, setTaskSelectedid] = useState('');
	const [taskTitleEdited, setTaskTitleEdited] = useState('');
	
	const [open, setOpen] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const createTask = (task: Task) => {
		setToDoList([...toDoList, task])
	}
	
	const deleteTask = (taskId: string) => {
		const taskList = toDoList.filter((task: Task) => task.id.toString() !== taskId)

		setToDoList(taskList);
		setOpenDeleteModal(false);
	}

	const checkTask = (taskId: string) => {
		const newTasks = toDoList.map((task: Task) => {
			if (task.id.toString() === taskId) task.checked = !task.checked;
			return task
		});

		setToDoList(newTasks);
	}

	const selectTaskto = (taskId: string, action: 'edit' | 'delete') => {
		if (taskId) setTaskSelectedid(taskId);

		const taskTitle = toDoList.filter((task: Task) =>
			(task.id.toString() === taskId)
		)[0]["title"];

		setTaskTitleEdited(taskTitle);
		
		if (action === "edit") {
			setOpen(true);
	
		} else if (action === "delete") {
			setOpenDeleteModal(true);
		}
	}

	const cancelTaskAction = (action: string) => {
		if (action === 'edit') {
			setOpen(false);
		} else if (action === 'delete') {
			setOpenDeleteModal(false);
		}
	}

	const editTask = (taskEdited: Task) => {
		const newTasks = toDoList.map((task: Task) => {
			if (task.id.toString() === taskEdited.id) task.title = taskEdited.title;
			return task
		});

		setToDoList(newTasks);
		setOpen(false);
	}

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(toDoList));
	}, [toDoList])


	useEffect(() => {
		document.documentElement.dataset.carbonTheme = theme;
	}, [theme]);

	const value = {
		cancelAction: cancelTaskAction,
		check: checkTask,
		create: createTask,
		data: toDoList,
		deleteAction: openDeleteModal, 
		deleteTask: deleteTask,
		edit: editTask,
		editAction: open,
		id: taskSelectedId,
		selectTask: selectTaskto,
		taskTitle: taskTitleEdited,
	}

	return (
		<TaskContext.Provider value={value}>
			<GlobalTheme theme={theme}>
				{children}
			</GlobalTheme>
		</TaskContext.Provider>
	)
}