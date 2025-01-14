import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface IButton {
    children: any;
    to?: string;
    className?: string;
    onClick?: MouseEventHandler;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | "outline";
}
function Button({ children, className, to, onClick, disabled, variant }: IButton) {
    let classes;

    switch (variant) {
        case 'secondary':
            classes = 'bg-secondary hover:bg-secondary/80 text-white px-6 py-3 rounded-full text-lg'
            break;
        case 'outline':
            classes = 'hover:bg-primary/50 text-black px-6 py-3 rounded-full text-lg border-2 border-primary/50'
            break;
        default:
            classes = 'bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-full text-lg'
            break;
    }



    if (to) {
        return (
            <Link to={to} className={`${classes}  ${className}`} onClick={e => {
                e.stopPropagation();
                onClick && onClick(e);
            }}>{children}</Link>
        )
    }

    return (
        <button className={`${classes}  ${className}`} onClick={e => {
            e.stopPropagation();
            onClick && onClick(e);
        }} disabled={disabled}>{children}</button>
    )
}

export default Button;