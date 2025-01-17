import { ICourse } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { course } from "./providers";
import CourseCard from "./CourseCard";
import Footer from "./Footer";



function Courses() {

  const [courses, setCourses] = useState<ICourse[] | null>(null);

  // Fetching courses from API
  useEffect(() => {
    // const fetchData = async () => {
    //   return (await axios("http://localhost:5000/api/courses")).data;
    // };
    try {
      // setCourses();
      // setCourses(await fetchData());
      setTimeout(() => {
        setCourses(Array.from({ length: 10 }, () => course) as ICourse[]);

      }, 1000);
    } catch (error) {
      console.error(error);
    } finally {
    };
  }, []);

  return (
    <div className="flex flex-col min-h-full overflow-y-auto">
      <div className="container px-4 py-8 mx-auto flex-grow">
        <h2 className="mb-8 text-3xl font-bold text-primary">Available Courses</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses?.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
      {courses && <Footer />}
    </div>
  )
}




export default Courses;