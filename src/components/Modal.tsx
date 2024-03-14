import {Modal as CarbonModal, Form as CarbonForm, TextInput} from "@carbon/react";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TaskContext } from "../contexts/task";

interface InputTask {
	editTitle: string;
}

function Modal() {
    const { editAction, cancelAction, edit, id, taskTitle } = useContext(TaskContext);
    const { register, handleSubmit, reset } = useForm<InputTask>({
        defaultValues: {
            editTitle: taskTitle
        }
    });

	const onSubmit: SubmitHandler<InputTask> = (data) => {
		if (data.editTitle !== '') edit({ title: data.editTitle, id: id, checked: false });
		cancelAction();
		reset();
	}

    return (
        <CarbonModal
            open={editAction}
            modalHeading={`Tarefa: ${taskTitle}`}
            modalLabel={"Editar tarefa"}
            primaryButtonText="Salvar"
            secondaryButtonText="Cancelar"
            onRequestClose={cancelAction}
            onRequestSubmit={handleSubmit(onSubmit)}
        >
            <CarbonForm>
                <TextInput id="edit" type="text" labelText="" placeholder={taskTitle} {...register("editTitle")} />
            </CarbonForm>
        </CarbonModal>
    )
}

export default Modal;