import { ChangeEvent } from "react";

interface InputTextProps {
    name: string,
    htmlFor: string, 
    label: string, 
    type: string, 
    id: string, 
    value: string, 
    onChange: (event: ChangeEvent<HTMLInputElement>) => void, 
    placeholder?: string,
    className: string,
    autoFocus?: boolean,
}

function InputText({name,
    htmlFor, 
    label,
    type,
    id,
    value,
    onChange,
    placeholder,
    className,
    autoFocus
    }: InputTextProps) {

        return (<>
            <label htmlFor={htmlFor}>{label}</label>
            <input name={name} autoFocus={autoFocus} type={type} id={id} value={value} onChange={onChange} placeholder={placeholder} className={className}/> 
        </>
        );
}

export default InputText;