/**
 To avoid the ContainedList, ContainedListItem import error
 * @ts-ignore */
import { Button, ContainedList, ContainedListItem, Tag } from "@carbon/react";
import { CheckmarkOutline, CircleStroke, Edit, TrashCan } from '@carbon/react/icons';
import { useContext } from "react";
import { TaskContext } from "../contexts/task";
import ModalDelete from "./ModalDelete";

export const TaskList = () => {
    const { data, check, selectTask } = useContext(TaskContext);

    const itemAction = <>
        <Button 
            kind="ghost" 
            iconDescription="Editar" 
            hasIconOnly 
            renderIcon={Edit} 
            aria-label="Editar" 
            onClick={(evt) => selectTask(evt.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.id, "edit")} 
        />
        <Button 
            kind="ghost" 
            iconDescription="Deletar" 
            hasIconOnly 
            renderIcon={TrashCan} 
            aria-label="Deletar" 
            onClick={(evt) => selectTask(evt.currentTarget.parentElement?.parentElement?.parentElement?.parentElement?.id, "delete")}  
        />
    </>
    return (
        <> {data.length > 0 &&
            <ContainedList label={<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                      <span>List title</span>
                      <Tag size="sm" role="status" aria-label={`${data.length} itens na lista`}>
                        {data.length}
                      </Tag>
                    </div>} kind="on-page">

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
                <ModalDelete />
            </ContainedList>
        }
        </>
    )
};