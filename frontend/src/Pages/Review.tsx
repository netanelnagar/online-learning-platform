import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ImageChecker from './ImageChecker';




const windowWidth = window.innerWidth;
let reviewCount: number;

if (windowWidth < 768) {
    reviewCount = 1;
} else if (windowWidth < 1024) {
    reviewCount = 2;
} else {
    reviewCount = 3;
}
interface ReviewProps {
    reviews?: any[];
    isLoading: boolean;
    isError: boolean;
}

export default function Review({ reviews, isLoading, isError }: ReviewProps) {
    const currentIndex = useRef(0);
    const [currentReview, setCurrentReview] = useState(reviews);

    const nextTestimonial = () => {
        if (!reviews?.length) return;

        if (currentIndex.current >= reviews.length - 1) {
            currentIndex.current = 0;
        }

        setCurrentReview(() => {
            const data = [...reviews.slice(currentIndex.current, currentIndex.current + reviewCount)]
            if (data.length < reviewCount) {
                data.push(...reviews.slice(0, reviewCount - data.length))
            }
            return data;
        });
        currentIndex.current += reviewCount;
    };

    const prevTestimonial = () => {
        if (!reviews?.length) return;

        if (currentIndex.current <= 0) {
            currentIndex.current = reviews.length - 1;
        }

        currentIndex.current -= reviewCount;
        setCurrentReview(() => {
            const data = [...reviews.slice(currentIndex.current <= 0 ? 0 : currentIndex.current, currentIndex.current + reviewCount)];
            if (data.length < reviewCount) {
                data.push(...reviews.slice((reviews.length) - (reviewCount - data.length), reviews.length));
            }
            return data;
        });
    };

    useEffect(() => {
        let timer: number;
        reviews && reviews.length > reviewCount && (timer = setInterval(nextTestimonial, 5000));
        nextTestimonial();
        return () => { timer && clearInterval(timer) };
    }, [reviews]);

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error...</div>

    console.log(currentReview);

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold text-center text-primary">
                What Our Students Say
            </h2>
            <div className="relative grid w-full grid-cols-1 gap-4 px-4 py-12 overflow-hidden bg-white md:grid-cols-2 lg:grid-cols-3">
                {currentReview?.length ? currentReview.map((review) => (
                    <div key={review._id} className="flex flex-col items-center gap-8 md:flex-row p-8 shadow-lg rounded-xl min-h-[250px]">
                        <ImageChecker errValue={`${review.name?.charAt(0) || "N"}${review.name?.split(" ")[1]?.charAt(0) || "N"}`} imageClass='object-cover w-24 h-24 rounded-full' pClass='flex items-center justify-center text-xl font-extrabold bg-blue-800 text-white' />
                        <div className="flex-1">
                            <p className="mb-4 text-lg italic text-gray-700">
                                "{review.content}" {review.id}
                            </p>
                            <div className="text-right">
                                <p className="font-semibold text-primary">
                                    {review.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {review.role}
                                </p>
                            </div>
                        </div>
                    </div>
                )) : <div className='col-span-1 text-center text-gray-500 md:col-span-2 lg:col-span-3'>No reviews found</div>}
                {currentReview?.length &&
                    <>
                        <button
                            onClick={prevTestimonial}
                            className="absolute p-2 transition-colors -translate-x-4 -translate-y-1/2 bg-white rounded-full shadow-lg left-4 top-1/2 hover:bg-gray-50"
                        >
                            <ChevronLeft className="w-6 h-6 text-primary" />
                        </button>

                        <button
                            onClick={nextTestimonial}
                            className="absolute p-2 transition-colors translate-x-4 -translate-y-1/2 bg-white rounded-full shadow-lg right-4 top-1/2 hover:bg-gray-50"
                        >
                            <ChevronRight className="w-6 h-6 text-primary" />
                        </button>
                    </>}
            </div>
        </div>
    );
}
