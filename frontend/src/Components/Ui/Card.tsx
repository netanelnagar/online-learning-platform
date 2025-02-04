import { MouseEventHandler } from "react";

export default function Card({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: MouseEventHandler}) {
    const classes = "bg-white shadow-sm p-6 rounded-lg border"
    return (
        <div onClick={(e)=>{
            e.stopPropagation();
            onClick && onClick(e);
        }} className={`${classes} ${className}`}>{children}</div>
    )
}

const colorMap = {
    primary: "bg-primary/10",
    secondary: "bg-secondary/10",
};
export function specificCard({ title, amount, color, icon }: { title: string, amount: string, color: string, icon: JSX.Element }) {
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