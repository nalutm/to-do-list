// import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
// import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
// import Button from "../Button/Button";
// import InputText from "../InputText/InputText";

// interface Task {
//     className: string,
//     id: string

// }

// function Task({
//     className,
//     id
// }: Task) {
//     return (
//       <>
//         <div className={className} id={id}>
//               {!task.checked && <ImCheckboxUnchecked className="checkbox" onClick={checkTask}/>}
//               {task.checked && <ImCheckboxChecked className="checkbox" onClick={checkTask}/>}
//               {task.title}
//             </div>
//               {!isTaskEdit && <div className="task-actions" id={task.id.toString()}>
//                 <FaRegTrashAlt onClick={deleteTask} className="task-icon task-icon--delete"/>
//                 <FaPencilAlt onClick={selectTaskToEdit} className="task-icon"/>
//               </div>}
//               {isTaskEdit && taskSelectedId !== task.id.toString() && <div className="task-actions" id={task.id.toString()}>
//                 <FaRegTrashAlt onClick={deleteTask} className="task-icon task-icon--delete"/>
//                 <FaPencilAlt onClick={selectTaskToEdit} className="task-icon"/>
//               </div>}


//               {isTaskEdit && taskSelectedId === task.id.toString() && <div>
//                 <div className="edit">
//                   <div className="input-edit">
//                   <InputText 
//                     name="editTask" 
//                     autoFocus={true}
//                     htmlFor="edit-task" 
//                     label="Editar tarefa"
//                     type="text"
//                     id="edit-task"
//                     value={taskEdited}
//                     onChange={editTask}
//                     className={editWarning ? "text-input text-input--invalid" : "text-input"}
//                   />
//                     {/* <label htmlFor="edit-task">Editar tarefa</label>
//                     <input autoFocus type="text" id="edit-task" value={taskEdited} onChange={editTask} className={editWarning ? "text-input text-input--invalid" : "text-input"}/>  */}
//                   </div>
//                   <div className="input-edit--actions">
//                     <Button onClick={submitEditedTask} id={taskSelectedId}>Salvar</Button>
//                     <Button onClick={cancelEditTask} className="button--cancel">Cancelar</Button>
//                   </div>
//                 </div>
//                 {editWarning && <span className="invalid-input invalid-input--edit-task">Digite sua tarefa</span>}
//               </div>
//       </>  
//     )
// }

// export default Task;