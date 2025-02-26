import { useGetCoursesQuery } from '../redux/api/courseApi';
import CourseCard from './CourseCard';
import Loader from '../Components/Ui/Loader';
import { useAppSelector } from '../redux/app/store';
import { selectAuth } from '../redux/authSlice';
import { IStudent } from '../types/types';
import { isEnrolled } from '../utils/utils';



export default function CoursesHome() {
    const { data: courses, isError, isLoading } = useGetCoursesQuery();
    const { user } = useAppSelector(selectAuth);

    if (isLoading) return <div className='grid place-items-center w-full md:h-[390px]'><Loader className='h-20 w-20' /></div>;
    if (isError) return <div>Error :(</div>;

    return (
        <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-scroll md:h-[390px]">
            {courses?.data.length ? courses.data.map((course) => {
                return user && user.role === 'student' && isEnrolled(course._id, (user as IStudent).enrolledCourses) ? null : <CourseCard key={course._id} course={course} className={`max-w-[350px] md:w-auto`} />;
            }) : <div>no courses found</div>}
        </div>
    )
}



