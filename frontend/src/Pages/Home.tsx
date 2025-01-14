import { Link } from "react-router-dom";
import Button from "../Ui/Button";
import CourseCard from "./CourseCard";
import Footer from "./Footer";
import { courses, teachers } from "./providers";
import Review from "./Review";
import { TeacherCard } from "./TeacherCard";
// import Teachers from "./Teachers";


export default function Home(): JSX.Element {


    return (
        <div className="overflow-y-scroll">
            <div className="container p-4 mx-auto">
                <h1 className="mb-8 text-4xl font-bold text-center">Welcome to Our Online Courses Platform!</h1>
                <p className="mb-8 text-center">Join thousands of students learning from the best teachers online!</p>
                <div className="flex justify-center mb-8">
                    <Button to="/signup">Get Started</Button>
                </div>
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-primary">Most Popular Courses</h2>
                    <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-scroll md:h-[390px]"> {/* Single Course */}
                        {courses.map(course => <CourseCard key={course._id} course={course} className={`max-w-[350px] md:w-auto`} />)}
                    </div>
                </div>
                <Review />
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-primary">Our Top Teachers</h2>
                    <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-scroll h-[290px]">
                        {teachers.map((teacher) => <TeacherCard key={teacher._id} teacher={teacher} className={`max-w-[350px] md:w-auto`} />)}
                    </div>
                </div>
                <div className="p-8 mt-16 text-center bg-gray-50 rounded-xl">
                    <h2 className="mb-4 text-2xl font-semibold text-primary">Need Help?</h2>
                    <p className="mb-4 text-gray-600">Our support team is here for you</p>
                    <Link to={"/"} className="inline-flex items-center justify-center h-10 gap-2 px-4 py-2 text-sm font-medium border rounded-md border-input bg-background hover:bg-slate-300">Contact Support</Link>
                </div>
            </div>
        </div>
    );
}
