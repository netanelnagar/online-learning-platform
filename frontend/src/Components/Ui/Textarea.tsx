interface TextareaProps {
    className?: string;
    placeholder?: string;
    type?: string;
    register: any;
    label: string;
    showLabel?: boolean;
    showErr?: boolean;
    err?: any;
    rows?: number;
}
export default function Textarea({ className, placeholder, type, showErr, err, register, label, showLabel, rows = 4 }: TextareaProps) {
    const id = crypto.randomUUID();
    const classes = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    return (
        <div>
            {showLabel && <label htmlFor={id} className="capitalize block mb-1 text-sm font-medium">{label}</label>}
            <textarea
                id={id}
                className={`${classes} ${className}`}
                placeholder={placeholder}
                {...register(label)}
                rows={rows}
            />
            {showErr && err && <p className='m-1 text-red-600'>{err.message}</p>}
        </div>
    )
}
