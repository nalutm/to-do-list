import { MouseEvent } from "react";

import "./Button.css"

interface ButtonProps {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
    type?: "submit" | "reset" | "button" | undefined,
    className?: string,
    id?: string,
    children: string
}

function Button({
    onClick,
    type,
    className,
    id,
    children
} : ButtonProps) {
    return (
        <button onClick={onClick} type={type} className={className} id={id}>{children}</button> 
    )
}

export default Button;