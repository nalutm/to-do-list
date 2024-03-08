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
            <div className={checkClassName} id={taskID}>
                {!isChecked && <ImCheckboxUnchecked className="checkbox" onClick={check}/>}
                {isChecked && <ImCheckboxChecked className="checkbox" onClick={check}/>}
                {title}
              </div>
                {!editAction && <div className="task-actions" id={taskID}>
                  <FaRegTrashAlt onClick={deleteTask} className="task-icon task-icon--delete"/>
                  <FaPencilAlt onClick={selectTask} className="task-icon"/>
                </div>}
                {editAction && id !== taskID && <div className="task-actions" id={taskID}>
                  <FaRegTrashAlt onClick={deleteTask} className="task-icon task-icon--delete"/>
                  <FaPencilAlt onClick={selectTask} className="task-icon"/>
                </div>}
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