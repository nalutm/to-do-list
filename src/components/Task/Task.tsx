import { useContext } from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

import "./Task.css"

import { TaskContext } from "../../contexts/task";
import Form from "../Form/Form";

interface Task {
	checkClassName: string,
	taskID: string,
	isChecked: boolean,
	title: string
}

function Task({
	checkClassName,
	taskID,
	isChecked,
	title
}: Task) {
	const { deleteTask, check, editAction, selectTask, id } = useContext(TaskContext);

	return (
		<>
			<div className="task-content">
				<div className={checkClassName}>
					{!isChecked &&
						<ImCheckboxUnchecked className="checkbox" onClick={() => check(taskID)} />}
					{isChecked &&
						<ImCheckboxChecked className="checkbox" onClick={() => check(taskID)} />}
					{title}
				</div>
				{!editAction &&
					<div className="task-actions">
						<FaRegTrashAlt onClick={() => deleteTask(taskID)} className="task-icon task-icon--delete" />
						<FaPencilAlt onClick={() => selectTask(taskID)} className="task-icon" />
					</div>}
				{editAction && id !== taskID &&
					<div className="task-actions">
						<FaRegTrashAlt onClick={() => deleteTask(taskID)} className="task-icon task-icon--delete" />
						<FaPencilAlt onClick={() => selectTask(taskID)} className="task-icon" />
					</div>}
			</div>
			{editAction && id === taskID &&
				<div>
					<Form
						type="edit"
						formClassName="edit"
						htmlFor="edit-task"
						label="Editar Tarefa"
						formId="edit-task"
					/>
				</div>
			}
		</>
	)
}

export default Task;