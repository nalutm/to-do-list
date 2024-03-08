import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {v4 as uuidv4} from 'uuid';        

import "./Form.css";

import Button from "../Button/Button";
import { TaskContext } from "../../contexts/task";

interface Input {
    title: string;
}

interface FormProps {
  type: "create" | "edit",
  formClassName: string,
  htmlFor: string,
  label: string,
  formId: string
}

function Form({type, formClassName, htmlFor, label, formId}: FormProps) {
    const { register, handleSubmit, reset } = useForm<Input>();
    const { create, cancelAction, id, edit } = useContext(TaskContext);

    const onSubmit: SubmitHandler<Input> = (data) => {
      if (type === "create") {
        create({...data, id: uuidv4().toString(), checked: false});
      } else if (type === "edit") {
        edit({...data,  id: id, checked: false})
      }
      reset();
    }

    return (<>
        <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper">
              <label htmlFor={htmlFor}>{label}</label>
              <input 
                autoFocus 
                type="text"
                id={formId}
                placeholder="Digite uma tarefa" 
                className="text-input"
                {...register("title")}
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
    </>
    )
}

export default Form;