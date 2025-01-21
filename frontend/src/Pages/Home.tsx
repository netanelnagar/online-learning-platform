import { Link } from "react-router-dom";
import Button from "../Components/Ui/Button";
import Footer from "./Footer";
import CoursesHome from "./CoursesHome";
import TeachersHome from "./TeachersHome";



export default function Home(): JSX.Element {

    return (
        <div className="flex flex-col min-h-full overflow-y-auto">
            <div className="container p-4 mx-auto flex-grow">
                <h1 className="mb-8 text-4xl font-bold text-center">Welcome to Our Online Courses Platform!</h1>
                <p className="mb-8 text-center">Join thousands of students learning from the best teachers online!</p>
                <div className="flex justify-center mb-8">
                    <Button to="/signup">Get Started</Button>
                </div>
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-primary">Most Popular Courses</h2>
                    <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-scroll md:h-[390px]"> {/* Single Course */}
                        {/* {!coursesError && !courses ? <>loading..</> :
                        coursesError ? <div>{coursesError}</div> : courses.data.length ? courses.data.map((course) => <CourseCard key={course._id} course={course} className={`max-w-[350px] md:w-auto`} />) : <div>no courses found</div>} */}
                        {/* {courses.map(course => <CourseCard key={course._id} course={course} className={`max-w-[350px] md:w-auto`} />)} */}
                        <CoursesHome />
                    </div>
                </div>
                {/* <Review/> */}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-primary">Our Top Teachers</h2>
                    <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-scroll h-[290px]">
                        <TeachersHome />
                    </div>
                </div>
                <div className="p-8 mt-16 text-center bg-gray-200 rounded-xl">
                    <h2 className="mb-4 text-2xl font-semibold text-primary">Need Help?</h2>
                    <p className="mb-4 text-gray-600">Our support team is here for you</p>
                    <Link to={"/contact"} className="inline-flex items-center justify-center h-10 gap-2 px-4 py-2 text-sm font-medium border rounded-md border-input bg-background hover:bg-slate-300">Contact Support</Link>
                </div>
            </div>
            <Footer />

        </div>
    );
}
