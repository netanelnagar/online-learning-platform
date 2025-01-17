interface ILoader {
    className?: string;
}
function Loader({ className }: ILoader) {
    return (
        <span className={`loader ${className}`}></span>
    )
}

export default Loader