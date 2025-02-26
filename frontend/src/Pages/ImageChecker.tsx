import { Loader } from "lucide-react";
import { useState } from "react";

interface ImageCheckerProps {
    imageUrl?: string;
    imageClass: string;
    pClass: string;
    errValue: string;
}

function ImageChecker({ imageUrl, imageClass, pClass, errValue }: ImageCheckerProps): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const handleLoad = () => setIsLoading(false);
    const handleError = () => {
        setIsLoading(false);
        setIsError(true);
    };

    if (!imageUrl || isError) {
        return <p className={`${imageClass} ${pClass}`}>{errValue}</p>;
    }

    return (
        <div className="relative">
            {isLoading && (
                <p className={`${imageClass} ${pClass}`}>
                    <Loader className="animate-spin" />
                </p>
            )}
            <img
                src={imageUrl}
                className={`${imageClass} ${isLoading ? "hidden" : ""}`}
                alt="Image"
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
}

export default ImageChecker;