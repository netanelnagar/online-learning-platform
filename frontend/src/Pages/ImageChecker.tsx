import { Loader } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface ImageCheckerProps {
    imageUrl?: string;
    className: string;
    username: string;
}

function ImageChecker({ imageUrl, className, username }: ImageCheckerProps): JSX.Element {
    const [isImage, setIsImage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const imgRef = useRef<HTMLImageElement>(new Image());

    const p = <p className={`${className} bg-blue-800 text-white flex items-center justify-center `} >{`${username.charAt(0)}${username.split(" ")[1]?.charAt(0)}`}</p>


    useEffect(() => {
        if (imageUrl) {
            imgRef.current.src = imageUrl;

            imgRef.current.onload = () => {
                setIsImage(true);
                setIsLoading(false);
                if (imgRef.current) {
                    imgRef.current.src = imageUrl;
                }
            };

            imgRef.current.onerror = () => {
                setIsImage(false);
                setIsLoading(false);
            };
        }

        return () => {
            imgRef.current.onload = null;
            imgRef.current.onerror = null;
        };
    }, [imageUrl]);

    if (!imageUrl) return p;

    if (isLoading) {
        return <p className={`${className} bg-blue-800 text-white flex items-center justify-center text-5xl font-extrabold`} ><Loader className='animate-spin' /></p>;
    }

    if (isImage) {
        return <img className={className} ref={imgRef} alt="Image" />;
    } else {
        return p;
    }
}

export default ImageChecker;