import { ICourse, ITeacher } from "../types/types"

export const lesson = {
    title: "Introduction to JavaScript",
    videoName: "introduction-to-javascript",
    videoUrl: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
    content: "In this lesson, you will learn the basics of JavaScript, including syntax, variables, loops, and functions.",
    duration: 30, // In minutes (or adjust for other units)
    resources: [
        {
            type: "pdf",
            url: "https://www.example.com/javascript-cheatsheet.pdf"
        },
        {
            type: "link",
            url: "https://www.example.com/javascript-exercises"
        }
    ]
};

export const course: ICourse = {
    _id: "6765500beb6e799a0d5dd998",
    title: "Introduction to JavaScript,",
    description: "Learn the basics of JavaScript, including syntax, variables, loops, and functions.",
    category: ["Programming,"], // Assuming this is intended to be a single category
    createdBy: "67654ff8eb6e799a0d5dd995",
    thumbnail: "https://images.pexels.com/photos/8423014/pexels-photo-8423014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: {
        amount: 0,
        total: 0
    },
    price: 49.99,
    published: true,
    lessons: [lesson, lesson], // Assuming "lesson" is defined elsewhere (replace with actual lesson data)
    studentsEnrolled: [],
    createdAt: "2024-12-20T11:07:55.662Z", // Parsed into a Date object
    updatedAt: "2024-12-20T11:07:55.662Z", // Parsed into a Date object
};

export const teacher = {
    _id: "67654ff8eb6e799a0d5dd995",
    username: "netanel doe",
    email: "netanel.doe@example.com",
    bio: "Experienced educator in mathematics with a passion for teaching.", // Trimmed repetitions
    qualifications: ["UI/UX Design", "Figma", "Web Design"],
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    socialLinks: {
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        personalWebsite: "https://johndoe.com"
    },
    rating: 4.7,
    totalStudents: 987,
    coursesCount: 4,
    role: "teacher",
    active: true,
    createdAt: "2024-12-20T11:07:36.373Z", // Parsed into a Date object
    updatedAt: "2024-12-20T11:07:36.373Z", // Parsed into a Date object
    __v: 0
};




export const student = {
    _id: "67716fc6c395c6262952bf79",
    username: "alice david",
    email: "alice.David@example.com",
    profilePicture: "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg",
    enrolledCourses: [], // Empty array for enrolled courses
    certificates: [], // Empty array for certificates
    active: true,
    createdAt: "2024-12-29T15:50:30.994Z", // Parsed into a Date object
    updatedAt: "2024-12-29T15:50:30.994Z", // Parsed into a Date object
    role: "student",
    __v: 0
};


export const review = {
    courseId: "67716fc6c395c6262952bf79",
    studentId: "67716fc6c395c6262952bf79",
    rating: 5,
    comment: "This course was amazing! I learned so much."
}

export const teacherImg = "https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=600";


export const studentImg = "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg";


export const videoCourses = "https://videos.pexels.com/video-files/4115298/4115298-uhd_2732_1440_25fps.mp4"


export const teachers: ITeacher[] = Array.from({ length: 6 }, () => teacher);
export const courses: ICourse[] = Array.from({ length: 6 }, () => course);