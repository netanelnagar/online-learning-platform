import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface IButton {
    children: JSX.Element | string;
    to?: string;
    className?: string;
    onClick?: MouseEventHandler;
}
function Button({ children, className, to, onClick }: IButton) {
    const classes = 'bg-sky-500 text-white px-6 py-3 rounded-full text-lg'

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
        }}>{children}</button>
    )
}

export default Button;