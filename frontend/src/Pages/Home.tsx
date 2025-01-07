import Button from "../Ui/Button";


export default function Home(): JSX.Element {
    return (
        <div className="w-full h-full overflow-y-scroll">
            <div className="mx-auto p-4 container">
                <h1 className="mb-8 font-bold text-4xl text-center">Welcome to Our Online Courses Platform!</h1>
                <p className="mb-8 text-center">Join thousands of students learning from the best teachers online!</p>
                <div className="flex justify-center mb-8">
                    <Button>Get Started</Button>
                </div>
                {/* Popular Courses Section */}
                <div className="mb-8">
                    <h2 className="mb-4 font-semibold text-2xl text-sky-500">Most Popular Courses</h2>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-3"> {/* Single Course */}
                        <div className="bg-white shadow p-4 rounded-lg">
                            <img src="/path/to/course-image.jpg" alt="Course" className="rounded-t-lg w-full h-48 object-cover" />
                            <h3 className="mt-4 font-bold text-xl">Learn Web Development from Scratch</h3>
                            <p className="mt-2 text-gray-700">Start your journey in web development with the best teachers!</p>
                        </div>
                        {/* Additional Courses */}
                    </div>
                </div>
                {/* Student Testimonials Section */}
                <div className="mb-8">
                    <h2 className="mb-4 font-semibold text-2xl text-sky-500">Student Testimonials</h2> <div className="bg-gray-100 shadow p-4 rounded-lg">
                        <p className="text-gray-700">These courses changed my life! - Noa, Web Development Student</p>
                    </div>
                </div>
                {/* Top Teachers Section */}
                <div className="mb-8">
                    <h2 className="mb-4 font-semibold text-2xl text-sky-500">Our Top Teachers</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="bg-white shadow p-4 rounded-lg w-64">
                            <img src="/path/to/teacher-image.jpg" alt="Teacher" className="mx-auto rounded-full w-32 h-32" />
                            <h3 className="mt-4 font-bold text-center text-xl">Dana Cohen</h3> <p className="mt-2 text-center text-gray-700">UX/UI Expert with over 10 years of experience</p>
                        </div>
                        {/* Additional Teachers */}
                    </div>
                </div>
                {/* Customer Support Section */}
                <div className="text-center">
                    <h2 className="mb-4 font-semibold text-2xl text-sky-500">Customer Support</h2>
                    <p className="text-gray-700">We're here to help! Contact us with 24/7 support</p>
                </div>
            </div>
        </div>
    );
}
