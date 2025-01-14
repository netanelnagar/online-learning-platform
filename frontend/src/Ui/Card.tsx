
export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    const classes = "bg-white shadow-sm p-6 rounded-lg border"
    return (
        <div className={`${classes} ${className}`}>{children}</div>
    )
}

const colorMap = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
};
export function specificCard({ title, amount, color, icon }: { title: string, amount: string, color: string, icon: any }) {
    return (
        <Card className="p-6" key={title}>
            <div className="flex items-center gap-4">
                <div className={`${colorMap[color === "primary" ? color : "secondary"]} p-3 rounded-lg`}>
                    {icon}
                </div>
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <p className="font-bold text-2xl">{amount}</p>
                </div>
            </div>
        </Card>
    )
}