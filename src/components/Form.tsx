import { Button, Form as CarbonForm, Stack, TextInput } from "@carbon/react";
import { ChangeEvent, useContext, useState } from "react";
import { TaskContext } from "../contexts/task";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

interface Input {
	title: string;
}

function Form() {
	const { create } = useContext(TaskContext);
    const { register, handleSubmit, reset } = useForm<Input>();
    const [invalid, setInvalid] = useState(false);
    const [title, setTitle] = useState('');

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setTitle(evt.target.value);
        setInvalid(false);
    }

    const onSubmit = () => {
        if (!title) {
            setInvalid(true);
            return
        }
        
        create({ title, id: uuidv4().toString(), checked: false });
        reset();
		setTitle('');
	}

    return (
        <CarbonForm  onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={7}>
                <TextInput 
                    type="text" 
                    labelText="Tarefa" 
                    id="create" 
                    {...register("title")} 
                    placeholder="Digite sua tarefa" 
                    autoFocus
                    invalid={invalid}
                    invalidText="Digite uma tarefa"
                    onChange={handleChange}
                />
                
                <Button type="submit" kind="secondary">Criar Tarefa</Button>
            </Stack>
        </CarbonForm>
    )
}

export default Form;