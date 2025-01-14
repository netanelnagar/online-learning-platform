import { useState } from "react";
import { ICourse } from "../types/types";
import Card from "../Ui/Card";
import { Badge } from "lucide-react";
import { PlayCircle, FileText, Link as LinkIcon } from "lucide-react";
import Button from "../Ui/Button";

export function SpecificUiCourse({
    title,
    description,
    category,
    thumbnail,
    rating,
    price,
    lessons,
    studentsEnrolled,
    // isTeacher = false
}: ICourse) {
    const [isEnrolled, setIsEnrolled] = useState(false);

    const handleEnroll = () => {
        // TODO: Implement actual enrollment logic with Stripe integration
        setIsEnrolled(true);
        // toast({
        //     title: "Successfully enrolled!",
        //     description: `You have been enrolled in ${title}`,
        // });
    };

    return (
        <Card className="">
            <img src={thumbnail} alt={title} className="object-cover w-full h-48" />
            <div className="p-0 md:p-6">
                <div className="flex items-start my-4">
                    <div className="flex-1 min-w-0 ">
                        <h3 className="mb-2 text-xl font-bold line-clamp-2">{title}</h3>
                        <div className="flex gap-2 mb-2">
                            <div className="flex gap-2 mb-2 overflow-x-scroll max-w-[250px]">
                                {category.map((cat) => (
                                    <><div key={cat} className="px-2 py-1 rounded-full bg-primary">{cat}</div>
                                        <div key={cat} className="px-2 py-1 rounded-full bg-primary">{cat}</div>
                                        <div key={cat} className="px-2 py-1 rounded-full bg-primary">{cat}</div></>
                                ))}
                                {category.map((cat) => (
                                    <><div key={cat} className="px-2 py-1 rounded-full bg-primary">{cat}</div>
                                        <div key={cat} className="px-2 py-1 rounded-full bg-primary">{cat}</div>
                                        <div key={cat} className="px-2 py-1 rounded-full bg-primary">{cat}</div></>
                                ))}
                            </div>
                        </div>
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
                    <h4 className="mb-2 font-semibold">Course Content</h4>
                    <div className="space-y-2">
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
                    {true ? (
                        <Button className="w-full">Edit Course</Button>
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