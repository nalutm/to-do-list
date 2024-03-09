import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

import "./Form.css";

import Button from "../Button/Button";
import { TaskContext } from "../../contexts/task";

interface Input {
	title: string;
	category: string;
}

interface FormProps {
	type: "create" | "edit",
	formClassName: string,
	htmlFor: string,
	label: string,
	formId: string
}

function Form({ type, formClassName, htmlFor, label, formId }: FormProps) {
	const { create, cancelAction, id, edit, taskTitle } = useContext(TaskContext);
	const { register, handleSubmit, reset, formState: { errors } } = useForm<Input>({
		defaultValues: {
			title: type === "create" ? '' : taskTitle
		}
	});

	const onSubmit: SubmitHandler<Input> = (data) => {
		if (type === "create") {
			create({ ...data, id: uuidv4().toString(), checked: false });
		} else if (type === "edit") {
			edit({ ...data, id: id, checked: false })
		}
		reset();
	}

	return (<div>
		<form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
			<div className="input-wrapper">
				<label htmlFor={htmlFor}>{label}</label>
				<input
					autoFocus
					type="text"
					id={formId}
					placeholder="Digite uma tarefa"
					className="text-input"
					{...register("title", {
						required: {
							value: true,
							message: "Digite uma tarefa"
						}
					})}
				/>
			</div>
			{type === "create" && <Button type="submit" className="form-btn">Criar tarefa</Button>}
			{type === "edit" &&
				<div className="input-edit--actions">
					<Button type="submit" id={id}>Salvar</Button>
					<Button onClick={cancelAction} className="button--cancel">Cancelar</Button>
				</div>
			}
		</form>
		{errors.title && <span className="error">{errors.title.message}</span>}
	</div>
	)
}

export default Form;