import { ChangeEvent, MouseEvent } from "react";

import "../Button/Button.css";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";



interface FormProps {
    className: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void, 
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function Form({
    className,
    value,
    onChange,
    onClick
}: FormProps) {
    return (
        <form className="form">
            <div className="input-wrapper">
            <InputText 
                name="createTaks" 
                autoFocus={true}
                htmlFor="task" 
                label="Tarefa"
                type="text"
                id="task"
                value={value}
                onChange={onChange}
                placeholder="Digite uma tarefa" 
                className={className}
            />
            {/* <label htmlFor="task">Tarefa</label>
            <input autoFocus={true} ref={inputRef} type="text" id="task" value={task.title} onChange={handleChange} placeholder="Tarefa" className={warning ? "text-input text-input--invalid" : "text-input" }/>  */}
            </div>
            <Button onClick={onClick} className="form-btn">Criar tarefa</Button>
        </form>
    )
}

export default Form;