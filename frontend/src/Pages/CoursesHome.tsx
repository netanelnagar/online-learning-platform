import { useGetCoursesQuery } from '../redux/api/courseApi';
import CourseCard from './CourseCard';
import Loader from '../Components/Ui/Loader';

export default function CoursesHome() {
    const { data: courses, isError, isLoading } = useGetCoursesQuery();
 
    if (isLoading) return <div className='grid place-items-center w-full md:h-[390px]'><Loader className='h-20 w-20' /></div>;
    if (isError) return <div>Error :(</div>;
    return (
        <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-scroll md:h-[390px]">
            {courses?.data.length ? courses.data.map((course) => <CourseCard key={course._id} course={course} className={`max-w-[350px] md:w-auto`} />) : <div>no courses found</div>}
        </div>
    )
}
