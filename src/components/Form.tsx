import { Button, Form as CarbonForm, Stack, TextInput } from "@carbon/react";
import { useContext } from "react";
import { TaskContext } from "../contexts/task";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

interface Input {
	title: string;
}

function Form() {
	const { create } = useContext(TaskContext);
    const { register, handleSubmit, reset } = useForm<Input>();

    const onSubmit: SubmitHandler<Input> = (data) => {
        create({ ...data, id: uuidv4().toString(), checked: false });
		reset();
	}

    return (
        <CarbonForm  onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={7}>
                <TextInput type="text" required labelText="Tarefa" id="create" {...register("title")} placeholder="Digite sua tarefa" autoFocus/>
                <Button type="submit" kind="secondary">Criar Tarefa</Button>
            </Stack>
        </CarbonForm>
    )
}

export default Form;