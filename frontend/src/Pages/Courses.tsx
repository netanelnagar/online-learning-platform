import { FC, useEffect } from "react";
import CourseCard from "./CourseCard";
import Footer from "./Footer";
import { useGetCoursesQuery } from "../redux/api/courseApi";
import Loader from "../Components/Ui/Loader";
import { useAppSelector } from "../redux/app/store";
import { selectAuth } from "../redux/authSlice";
import { IStudent } from "../types/types";
import { isEnrolled } from "../utils/utils";



const Courses: FC = () => {

  const { data: courses, isError, isLoading } = useGetCoursesQuery();
  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    document.title = "Courses";
  }, []);

  if (isLoading ) return <div className='flex m-auto'><Loader className='w-20 h-20' /></div>;

  if (isError) return <div className='flex m-auto'>Error :(.
    Please Refresh The Page</div>;

  return (
    <div className="flex flex-col min-h-full overflow-y-auto">
      <div className="container flex-grow px-4 py-8 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-primary">Available Courses</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses?.data.map((course, index) => {
            return user && user.role === 'student' && isEnrolled(course._id, (user as IStudent).enrolledCourses) ? null : <CourseCard key={index} course={course} />
          })}
        </div>
      </div>
      {courses && <Footer />}
    </div>
  )
};




export default Courses;