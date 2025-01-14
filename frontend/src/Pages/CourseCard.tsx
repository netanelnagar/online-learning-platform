import { Link } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { ICourse } from "../types/types";
import { Star, Users } from "lucide-react";

interface ICourseCard {
    course: ICourse;
    className?: string;
}

export default function CourseCard({ course, className }: ICourseCard) {
    return (
        <Link to={`/courses/${course._id}`} className={`transition-shadow bg-white border rounded-lg hover:shadow-lg ${className}`}>
            <img
                src={course.thumbnail}
                alt={course.title}
                className="object-cover w-full h-48"
            />
            <div className="p-6">
                <div className="flex items-start justify-between mb-2 space-x-4">
                    {course.title.length > 30 && <Tooltip target=".course-title" content={course.title} position="top" />}
                    <h3 className="text-xl font-semibold text-primary course-title" >{course.title}</h3>
                </div>
                <p className="mb-4 text-gray-600 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                            <span className="ml-1 font-medium">{(course.rating.amount / course.rating.total) || 0.0}</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-700" />
                            <span className="ml-1 font-medium">{course.studentsEnrolled.length || 0}</span>
                        </div>
                    </div>
                    <div className="flex items-center font-medium">
                        <span className="">${course.price}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

