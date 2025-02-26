import { ProgressBar } from "primereact/progressbar";
import Card from "../../Components/Ui/Card";
import { FC, useEffect, useState } from "react";
import { IEnrolledCorses, IStudent } from "../../types/types";
import LessonsAndVideo from "./LessonsAndVideo";
import { useAppSelector } from "../../redux/app/store";
import { selectAuth } from "../../redux/authSlice";
import { useCompletionCourseMutation } from "../../redux/api/courseApi";



interface CoursesTabProps {
    courses: IEnrolledCorses[];
}

const CoursesTab: FC<CoursesTabProps> = ({ courses }) => {
    const [selectedCourse, setSelectedCourse] = useState<IEnrolledCorses | null>(null);
    const [progress, setProgress] = useState<Record<string, number>>({});
    const { user } = useAppSelector(selectAuth);
    const [completionCourse, { isSuccess }] = useCompletionCourseMutation();



    useEffect(() => {
        user && courses && courses.forEach((course) => {
            const courseDataFromUser = (user as IStudent)?.enrolledCourses.find((c) => c.course === course._id);
            const present = 100 / course.lessons.length;
            const progressCourse = present * (courseDataFromUser?.completedLessons?.length || 0);
            setProgress((prev) => {
                if (prev[course.title] === 100) {
                    return prev;
                } else {
                    prev[course.title] && progressCourse === 100 && completionCourse(course._id);
                    return { ...prev, [course.title]: progressCourse }
                }
            });
        });
    }, [courses, user]);

    useEffect(() => {
        // 
        // isSuccess && toast.success('Course completed');
    }, [isSuccess]);
    return (
        <div className="grid w-full grid-cols-1 gap-6">
            {courses.map((course) => {
                return (
                    <Card key={course.title} className="p-6" onClick={() => setSelectedCourse(course)}>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <div className="flex-1">
                                <h3 className="mb-2 text-xl font-semibold">{course.title}</h3>
                                <p className="mb-2 text-gray-500">Instructor: {course.teacherName}</p>
                            </div>
                            <div className="w-full md:w-48">
                                <p className="mb-2 text-sm text-gray-500">Progress</p>
                                <ProgressBar showValue={false} value={progress[course.title]} className="h-5 bg-sky-200" color="rgb(14 165 233)" />
                                <p className="mt-1 text-sm text-right">{progress[course.title]}%</p>
                            </div>
                        </div>
                        {selectedCourse === course && <LessonsAndVideo course={course} setSelectedCourse={setSelectedCourse} />}
                    </Card>
                );
            })}
        </div>
    );
};

export default CoursesTab;
