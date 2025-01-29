import { useEffect } from "react";
import CourseCard from "./CourseCard";
import Footer from "./Footer";
import { useGetCoursesQuery } from "../redux/api/courseApi";
import Loader from "../Components/Ui/Loader";



function Courses() {

  const {data: courses, isError, isLoading} = useGetCoursesQuery();


  useEffect(() => {
   document.title = "Courses";
  }, []);

  if (isLoading) return <div className='flex m-auto'><Loader className='h-20 w-20' /></div>;

  if (isError) return <div className='flex m-auto'>Error :(. 
  Please Refresh The Page</div>;

  return (
    <div className="flex flex-col min-h-full overflow-y-auto">
      <div className="container px-4 py-8 mx-auto flex-grow">
        <h2 className="mb-8 text-3xl font-bold text-primary">Available Courses</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses?.data.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      {courses && <Footer />}
    </div>
  )
}




export default Courses;