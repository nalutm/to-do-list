import {Modal as CarbonModal, TextInput} from "@carbon/react";
import { ChangeEvent, useContext, useState } from "react";
import { TaskContext } from "../contexts/task";

function Modal() {
    const { editAction, cancelAction, edit, id, taskTitle } = useContext(TaskContext);
    const [newTitle, setNewTitle] = useState(taskTitle);   

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(evt.target.value);
    }

	const onSubmit = () => {
        if (!newTitle) {
            setNewTitle(taskTitle);
            cancelAction("edit");
            return
        }
        if (newTitle) {
            edit({ title: newTitle, id: id, checked: false });
            cancelAction("edit");
        }
		
	}

    if (taskTitle === '') {
        return null;
    }

    return (
        <CarbonModal
            open={editAction}
            modalHeading={`Tarefa: ${taskTitle}`}
            modalLabel={"Editar tarefa"}
            primaryButtonText="Salvar"
            secondaryButtonText="Cancelar"
            onRequestClose={() => cancelAction("edit")}
            onChange={handleChange}
            onRequestSubmit={onSubmit}
        >
            <TextInput 
                id="edit" 
                type="text" 
                labelText="" 
                required
                autoFocus
                defaultValue={taskTitle} 
            />
        </CarbonModal>
    )
}

export default Modal;