import React from 'react'

interface InputProps {
    className?: string;
    placeholder?: string;
    type?: string;
    value?: string | number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export default function Input({
    className, placeholder, type, value, onChange
}: InputProps) {
    const classes = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    return (
        <input
            className={`${classes} ${className}`}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
        ></input>
    )
}
