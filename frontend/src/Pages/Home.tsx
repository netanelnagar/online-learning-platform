

export function Home(): JSX.Element {
    return (
        <div className="w-full h-full overflow-y-scroll">
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold text-center mb-8 ">Welcome to Our Online Courses Platform!</h1>
                <p className="text-center mb-8">Join thousands of students learning from the best teachers online!</p>
                <div className="flex justify-center mb-8">
                    <button className="bg-sky-500 text-white px-6 py-3 rounded-full text-lg">Get Started</button>
                </div>
                 {/* Popular Courses Section */} 
                 <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-sky-500">Most Popular Courses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Single Course */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <img src="/path/to/course-image.jpg" alt="Course" className="w-full h-48 object-cover rounded-t-lg" />
                            <h3 className="text-xl font-bold mt-4">Learn Web Development from Scratch</h3>
                            <p className="text-gray-700 mt-2">Start your journey in web development with the best teachers!</p>
                        </div>
                        {/* Additional Courses */}
                    </div>
                </div>
                {/* Student Testimonials Section */} 
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-sky-500">Student Testimonials</h2> <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <p className="text-gray-700">These courses changed my life! - Noa, Web Development Student</p>
                    </div>
                </div>
                {/* Top Teachers Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-sky-500">Our Top Teachers</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="bg-white p-4 rounded-lg shadow w-64">
                            <img src="/path/to/teacher-image.jpg" alt="Teacher" className="w-32 h-32 rounded-full mx-auto" />
                            <h3 className="text-xl font-bold mt-4 text-center">Dana Cohen</h3> <p className="text-gray-700 text-center mt-2">UX/UI Expert with over 10 years of experience</p>
                        </div> 
                        {/* Additional Teachers */}
                    </div>
                </div>
                 {/* Customer Support Section */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-sky-500">Customer Support</h2>
                    <p className="text-gray-700">We're here to help! Contact us with 24/7 support</p>
                </div>
            </div>
        </div>
    );
}
