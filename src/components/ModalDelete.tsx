import {Modal as CarbonModal} from "@carbon/react";
import { useContext } from "react";
import { TaskContext } from "../contexts/task";


function ModalDelete() {
    const { cancelAction, id, taskTitle, deleteTask, deleteAction } = useContext(TaskContext);

	const onSubmit = () => {
        deleteTask(id);
		cancelAction("delete");
	}

    return (
        <CarbonModal
            open={deleteAction}
            danger
            modalHeading={`Tarefa: ${taskTitle}`}
            modalLabel={"Deletar tarefa"}
            primaryButtonText="Deletar"
            secondaryButtonText="Cancelar"
            onRequestClose={() => cancelAction("delete")}
            onRequestSubmit={onSubmit}
        >
        </CarbonModal>
    )
}

export default ModalDelete;