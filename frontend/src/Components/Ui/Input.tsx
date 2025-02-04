
interface InputProps {
    className?: string;
    placeholder?: string;
    type?: string;
    register: any;
    label: string;
    showLabel?: boolean;
}
export default function Input({
    className, placeholder, type, register, label, showLabel
}: InputProps) {
    const id = crypto.randomUUID();
    const classes = " w-full rounded-md border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:ring-primary"
    return (
        <>
            {showLabel && <label htmlFor={id} className="capitalize">{label}</label>}
            <input
                id={id}
                className={`${classes} ${className}`}
                placeholder={placeholder}
                type={type}
                {...register(label)}
            />
        </>
    )
}

