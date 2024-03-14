import Form from "./components/Form";
import { Content, Heading, Modal, Stack, TextInput } from "@carbon/react";
import { TaskList } from "./components/TaskList";
import { useContext } from "react";
import { TaskContext } from "./contexts/task";
import { SubmitHandler, useForm } from "react-hook-form";


interface Input {
	title: string;
}


function App() {
	const { editAction, cancelAction, edit, id, taskTitle } = useContext(TaskContext);
    const { register, handleSubmit, reset } = useForm<Input>({
		defaultValues: {
			title: taskTitle
		}
	})

	const onSubmit: SubmitHandler<Input> = (data) => {
		console.log(data)
		if (data.title !== '') edit({ ...data, id: id, checked: false });
		cancelAction();
		reset();
	}

	return (
		<>
			<Content>
				<Stack gap={7}>
					<Heading >To do List</Heading>
					<Form />
					<TaskList />
				</Stack>
				<Modal
					open={editAction}
					modalHeading={`Tarefa: ${taskTitle}`}
					modalLabel={"Editar tarefa"}
					primaryButtonText="Salvar"
					secondaryButtonText="Cancelar"
					onRequestClose={cancelAction}
					onRequestSubmit={handleSubmit(onSubmit)}
				>
					<TextInput id="edit" type="text" required labelText="" defaultValue={taskTitle} {...register("title")}/>
				</Modal>
			</Content>
		</>
	)
}

export default App;
