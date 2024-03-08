import { useContext } from "react";   

import { TaskContext } from "../../contexts/task";
import Task from "../Task/Task";

import "./TaskList.css";

function TaskList() {
  const { data } = useContext(TaskContext); 

    return (
        <ul className="tasks-list">
        {data && data.map((task)=> {
          return (
            <li className="task" key={task.id}>
              <Task 
                checkClassName={task.checked ? "task-title task-title--checked" : "task-title"} 
                taskID={task.id.toString()}
                isChecked={task.checked} 
                title={task.title}
              />
            </li>
          )
        })}
      </ul>

    )
}

export default TaskList;