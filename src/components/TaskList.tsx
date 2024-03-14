/**
 To avoid the ContainedList, ContainedListItem import error
 * @ts-ignore */
import { Button, ContainedList, ContainedListItem } from "@carbon/react";
import { CheckmarkOutline, CircleStroke, Edit, TrashCan } from '@carbon/react/icons';
import { useContext } from "react";
import { TaskContext } from "../contexts/task";

export const TaskList = () => {
    const { data, check, deleteTask, selectTask } = useContext(TaskContext);

    const itemAction = <>
        <Button 
            kind="ghost" 
            iconDescription="Editar" 
            hasIconOnly 
            renderIcon={Edit} 
            aria-label="Editar" 
            onClick={(evt) => selectTask(evt.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.id)} 
        />
        <Button 
            kind="ghost" 
            iconDescription="Deletar" 
            hasIconOnly 
            renderIcon={TrashCan} 
            aria-label="Deletar" 
            onClick={(evt) => deleteTask(evt.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.id)}  
        />
    </>
    return (
        <> {data.length > 0 &&
            <ContainedList label="Tarefas" kind="on-page">
                {data.map((task) => {
                    return (
                        <ContainedListItem 
                            key={task.id} 
                            renderIcon={task.checked ? CheckmarkOutline : CircleStroke} 
                            id={task.id} 
                            action={itemAction} 
                            onClick={() => check(task.id)}
                            style={{textDecoration: task.checked ? "line-through" : "none"}}
                        >
                            {task.title}
                        </ContainedListItem>
                    )
                })}
            </ContainedList>
        }
        </>
    )
};