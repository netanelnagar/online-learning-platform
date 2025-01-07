import { DollarSign, Star, Users } from "lucide-react";
import { ICourse } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { course } from "./providers";
import { Link } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";



function Courses() {

  const [courses, setCourses] = useState<ICourse[]>([]);

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
    <div className="mx-auto px-4 py-8 container">
      <h2 className="mb-8 font-bold text-3xl text-sky-500">Available Courses</h2>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>

  )
}

export const CourseCard = ({ course }: { course: ICourse }) => {
  return (
    <Link to={`/courses/${course._id}`} className="bg-white shadow-lg rounded-lg transition-transform duration-300 overflow-hidden hover:scale-105">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start space-x-4 mb-2">
          {course.title.length > 3 && <Tooltip target=".course-title" content={course.title} position="top" />}
          <h3 className="line-clamp-2 font-semibold text-xl course-title" >{course.title}{course.title}{course.title}{course.title}{course.title}</h3>
          {course.category.length > 1 && <Tooltip target=".course-category" content={course.category} position="top" />}
          <span className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-sm">
            {course.category.length > 1 ?
              <><Tooltip target=".course-category" content={course.category} position="top" />{ course.category[0]}...</>
              : course.category
            }
          </span>
        </div>
        <p className="mb-4 line-clamp-2 text-gray-600">{course.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="ml-1 font-semibold">{(course.rating.amount / course.rating.total) || 0.0}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-700" />
              <span className="ml-1 font-semibold">{course.studentsEnrolled.length || 0}</span>
            </div>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-sky-500" />
            <span className="font-bold text-lg">{course.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};




export default Courses;