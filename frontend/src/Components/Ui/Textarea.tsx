interface TextareaProps {
    id?: string;
    name?: string;
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    rows?: number;
    required?: boolean;
}
export default function Textarea({ id, name, className, placeholder, value, onChange, required, rows }: TextareaProps) {
    const classes = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    return (
        <textarea
            id={id}
            name={name}
            className={`${classes} ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
        />
    )
}
