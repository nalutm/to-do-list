import { MouseEvent } from "react";


interface ButtonProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
    className?: string,
    id?: string,
    children: string
}

function Button({
    onClick,
    className,
    id,
    children
} : ButtonProps) {
    return (
        <button onClick={onClick} className={className} id={id}>{children}</button> 
    )
}

export default Button;