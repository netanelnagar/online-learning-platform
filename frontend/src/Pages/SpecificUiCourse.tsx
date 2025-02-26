import { useState } from "react";
import { ICourse } from "../types/types";
import Card from "../Components/Ui/Card";
import { PlayCircle } from "lucide-react";
import Button from "../Components/Ui/Button";
import { useNavigate } from "react-router-dom";
import ImageChecker from "./ImageChecker";

interface ISpecificUiCourse {
    course: ICourse;
    isTeacher?: boolean;
    editCourse?: (id: string) => void;
}
export function SpecificUiCourse({
    course,
    isTeacher = false,
    editCourse
}: ISpecificUiCourse) {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const navigate = useNavigate();
    const { _id,
        title,
        description,
        category,
        thumbnail,
        rating,
        price,
        lessons,
        studentsEnrolled } = course;

    const handleEnroll = () => {
        // TODO: Implement actual enrollment logic with Stripe integration
        setIsEnrolled(true);
        // toast({
        //     title: "Successfully enrolled!",
        //     description: `You have been enrolled in ${title}`,
        // });
    };

    return (
        <Card className="flex flex-col" onClick={() => {
            if (!isTeacher) {
                navigate(`/courses/${_id}`);
            }
        }}>
            <ImageChecker imageUrl={thumbnail} imageClass="w-full h-80 object-cover rounded-xl" pClass="bg-blue-100" errValue="No Image" />
            {/* <img src={thumbnail} alt={title} className="object-cover w-full h-48" /> */}
            <div className="p-0 md:p-6 flex flex-col flex-grow justify-between">
                <div className="flex items-start my-4">
                    <div className="flex-1 min-w-0 ">
                        <h3 className="mb-2 text-xl font-bold line-clamp-2">{title}</h3>
                        {category && <div className="flex mb-2">
                            <div key={category} className="px-2 py-1 rounded-full bg-primary text-sm">{category}</div>
                        </div>}
                        <div className="flex items-center gap-2 w-[180px]">
                            <span className="text-yellow-500">★</span>
                            <span>{rating.total.toFixed(1)} ({rating.amount} ratings)</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold">${price}</p>
                        <p className="text-sm text-gray-500">{studentsEnrolled.length} students</p>
                    </div>
                </div>

                <p className="mb-4 text-gray-600">{description}</p>

                <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2 px-3">
                        <h4 className="font-semibold">Course Content</h4>
                        <h4 className="font-semibold">Amount: {lessons.length}</h4>
                    </div>
                    <div className="space-y-2 max-h-24 overflow-y-auto">
                        {lessons.map((lesson, index) => (
                            <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <PlayCircle className="w-4 h-4 text-primary" />
                                    <span>{lesson.title}</span>
                                </div>
                                <span className="text-sm text-gray-500">{lesson.duration}min</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    {isTeacher && editCourse ? (
                        <Button
                            className="w-full"
                            onClick={() => editCourse(_id!)}
                        >Edit Course</Button>
                    ) : (
                        <Button
                            className="w-full"
                            onClick={handleEnroll}
                            disabled={isEnrolled}
                        >
                            {isEnrolled ? "Enrolled" : "Enroll Now"}
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}