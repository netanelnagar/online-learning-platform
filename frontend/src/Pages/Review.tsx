import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Web Development Student",
        content: "The courses here transformed my career. I went from knowing nothing about coding to landing my dream job in just 6 months!",
        image: "/placeholder.svg"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "UX Design Student",
        content: "The instructors are world-class and the community support is amazing. Best learning investment I've ever made.",
        image: "/placeholder.svg"
    },
    {
        id: 3,
        name: "Emma Davis",
        role: "Data Science Student",
        content: "The practical projects and hands-on approach made complex concepts easy to understand. Highly recommended!",
        image: "/placeholder.svg"
    }
];
export default function Review() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    useEffect(() => {
        const timer = setInterval(nextTestimonial, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="mx-auto px-4 py-12 w-full max-w-4xl">
            <h2 className="mb-12 font-bold text-3xl text-center text-primary">
                What Our Students Say
            </h2>
            <div className="relative">
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <div className="relative p-8 h-full">
                        <div className="flex md:flex-row flex-col items-center gap-8">
                            <img
                                src={testimonials[currentIndex].image}
                                alt={testimonials[currentIndex].name}
                                className="rounded-full w-24 h-24 object-cover"
                            />
                            <div className="flex-1">
                                <p className="mb-4 text-gray-700 text-lg italic">
                                    "{testimonials[currentIndex].content}"
                                </p>
                                <div className="text-right">
                                    <p className="font-semibold text-primary">
                                        {testimonials[currentIndex].name}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        {testimonials[currentIndex].role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={prevTestimonial}
                    className="top-1/2 left-0 absolute bg-white hover:bg-gray-50 shadow-lg p-2 rounded-full transition-colors -translate-x-4 -translate-y-1/2"
                >
                    <ChevronLeft className="w-6 h-6 text-primary" />
                </button>

                <button
                    onClick={nextTestimonial}
                    className="top-1/2 right-0 absolute bg-white hover:bg-gray-50 shadow-lg p-2 rounded-full transition-colors -translate-y-1/2 translate-x-4"
                >
                    <ChevronRight className="w-6 h-6 text-primary" />
                </button>
            </div>
        </div>
    );
}
