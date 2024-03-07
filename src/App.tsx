import { MouseEvent, ChangeEvent, useState, useEffect, useRef } from "react";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import {v4 as uuidv4} from 'uuid';        

import "./App.css";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

function App() {
  interface Task {
    title: string;
    id: number;
    checked: boolean;
  }

  const inputRef = useRef(null);

  const localTasksList = localStorage.getItem("tasks");
  const [task, setTask] = useState({
    title: '',
    id: '',
    checked: false
  });
  const tasksListInitialValue: Task[] = []
  const [tasksList, setTasksList] = useState(() => 
    localTasksList ? JSON.parse(localTasksList) : tasksListInitialValue
  );
  const [isTaskEdit, setisTaskEdit] = useState(false);
  const [taskSelectedId, setTaskSelectedid] = useState('');
  const [taskEdited, setTaskEdited] = useState('');
  const [warning, setWarning] = useState(false);
  const [editWarning, setEditWarning] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }, [tasksList])

  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWarning(false);
    setTask({
      title: event.target.value,
      id: uuidv4(),
      checked: false
    })
  }

  const validadeInput = (title: string) => {
    if (title === '') {
      setWarning(true)
      return false 
    } else {
      return true
    }
  }
  
  const createTask = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const validInput = validadeInput(task.title);
    if (!validInput) return
    setTasksList([...tasksList, task])
    setTask({
      title: '',
      id: '',
      checked: false
    })
  }

  const checkTask = (event: MouseEvent) => {
    const id = event.currentTarget.parentElement?.id;
    if (id) setTaskSelectedid(id);

    const newTasks = tasksList.map((task: Task) => {
      if (task.id.toString() === id) task.checked = !task.checked;
      return task
    });

    setTasksList(newTasks);
  }

  const deleteTask = (event: MouseEvent) => {
    const id = event.currentTarget.parentElement?.id
    const taskList = tasksList.filter((task: Task) => task.id.toString() !== id)

    setTasksList(taskList)
  }

  const selectTaskToEdit = (event: MouseEvent) => {
    const id = event.currentTarget.parentElement?.id
    setisTaskEdit(true);

    const taskTitle = tasksList.filter((task: Task) => {
      if (task.id.toString() === id) {
        console.log(task.title)
        return task
      }
    })[0]["title"]

    setTaskEdited(taskTitle)
    if (id) setTaskSelectedid(id)
  }

  const editTask = (event: ChangeEvent<HTMLInputElement>) => {
    setEditWarning(false);
    setTaskEdited(event.target.value)
  }
  
  const submitEditedTask = (event: MouseEvent<HTMLButtonElement>) => {
    if (taskEdited === '') {
      setEditWarning(true)
      return
    }
    const id = event.currentTarget.id;

    const newTasks = tasksList.map((task: Task) => {
      if (task.id.toString() === id) task.title = taskEdited;
      return task
    })
    setTasksList(newTasks);

    setTaskEdited('');
    setisTaskEdit(false);
    if (inputRef.current) inputRef.current.focus();
  }

  const cancelEditTask = () => {
    setEditWarning(false);
    setisTaskEdit(false);
    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <>
      <h1>To do List</h1> 
      <form className="form">
        <div className="input">
          <label htmlFor="task">Tarefa</label>
          <input autoFocus ref={inputRef} type="text" id="task" value={task.title} onChange={handleChange} placeholder="Tarefa" className={warning ? "text-input text-input--invalid" : "text-input" }/> 
        </div>
        <button onClick={createTask} className="form-btn">Criar tarefa</button> 
      </form>
      {warning && !taskEdited && <span className="invalid-input">Digite sua tarefa</span>}

      <ul className="tasks-list">
        {tasksList && tasksList.map((task: Task)=> {
          return <li className="task" key={task.id} id={task.id.toString()}>
            <div className={task.checked ? "task-title task-title--checked" : "task-title"} id={task.id.toString()}>
              {!task.checked && <ImCheckboxUnchecked className="checkbox" onClick={checkTask}/>}
              {task.checked && <ImCheckboxChecked className="checkbox" onClick={checkTask}/>}
              {task.title}
            </div>
              {!isTaskEdit && <div className="task-actions" id={task.id.toString()}>
                <FaRegTrashAlt onClick={deleteTask} className="task-icon task-icon--delete"/>
                <FaPencilAlt onClick={selectTaskToEdit} className="task-icon"/>
              </div>}
              {isTaskEdit && taskSelectedId !== task.id.toString() && <div className="task-actions" id={task.id.toString()}>
                <FaRegTrashAlt onClick={deleteTask} className="task-icon task-icon--delete"/>
                <FaPencilAlt onClick={selectTaskToEdit} className="task-icon"/>
              </div>}
              {isTaskEdit && taskSelectedId === task.id.toString() && <div>
                <div className="edit">
                  <div className={"input-edit"}>
                    <label htmlFor="edit-task">Editar tarefa</label>
                    <input autoFocus type="text" id="edit-task" value={taskEdited} onChange={editTask} placeholder="Tarefa" className={editWarning ? "text-input text-input--invalid" : "text-input"}/> 
                  </div>
                  <div className="input-edit--actions">
                    <button onClick={submitEditedTask} id={taskSelectedId}>Salvar</button> 
                    <button className="button--cancel" onClick={cancelEditTask}>Cancelar</button>
                  </div>
                </div>
                {editWarning && <span className="invalid-input invalid-input--edit-task">Digite sua tarefa</span>}
              </div>
              }
          </li>
        })}
      </ul>
    </>
  )
}

export default App;
