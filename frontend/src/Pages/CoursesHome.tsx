import React, { useEffect, useState } from 'react'
import { useGetCoursesMutation } from '../redux/api/courseApi';
import CourseCard from './CourseCard';

export default function CoursesHome() {
    const [getCourses, { data:courses, isError, isLoading }] = useGetCoursesMutation();
    const [fetchAgain, setFetchAgain] = useState(true);

    useEffect(() => {
        getCourses();
    }, [fetchAgain]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div onClick={() => setFetchAgain(f => !f)}>Error :(</div>;
    return (
        <> {courses?.data.length ? courses.data.map((course) => <CourseCard key={course._id} course={course} className={`max-w-[350px] md:w-auto`} />) : <div>no courses found</div>}</>
    )
}
