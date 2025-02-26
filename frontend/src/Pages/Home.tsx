import { Link } from "react-router-dom";
import Button from "../Components/Ui/Button";
import Footer from "./Footer";
import CoursesHome from "./CoursesHome";
import TeachersHome from "./TeachersHome";
import { useAppSelector } from "../redux/app/store";
import Review from "./Review";
import { useGetReviewsQuery } from "../redux/api/reviewApi";




export default function Home(): JSX.Element {
    const { isAuthenticated } = useAppSelector(store => store.auth);
    const { data: reviews, isLoading, isError } = useGetReviewsQuery(); 
    return (
        <div className="flex flex-col min-h-full overflow-y-auto">
            <div className="container flex-grow p-4 mx-auto">
                <h1 className="mb-8 text-4xl font-bold text-center">Welcome to Our Online Courses Platform!</h1>
                {isAuthenticated ?
                    <p className="mb-8 text-center">Welcome back! Continue learning from where you left off</p>
                    :
                    <>
                        <p className="mb-8 text-center">Join thousands of students learning from the best teachers online!</p>
                        <div className="flex justify-center mb-8">
                            <Button to="/signup">Get Started</Button>
                        </div>
                    </>}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-primary">Most Popular Courses</h2>
                    <CoursesHome />

                </div>
                <Review reviews={reviews?.data} isLoading={isLoading} isError={isError} />
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-primary">Our Top Teachers</h2>
                    <TeachersHome />

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
