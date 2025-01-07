export const course = {
    "_id": "6765500beb6e799a0d5dd998",
    "title": " introduction to javascript,",
    "description": " Learn the basics of JavaScript, including syntax, variables, loops, and functions.,",
    "category": [
        " Programming,"
    ],
    "createdBy": "67654ff8eb6e799a0d5dd995",
    "thumbnail": "https://images.pexels.com/photos/8423014/pexels-photo-8423014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "rating": {
        "amount": 0,
        "total": 0
    },
    "price": 49.99,
    "published": true,
    "lessons": [],
    "studentsEnrolled": [],
    "createdAt": "2024-12-20T11:07:55.662Z",
    "updatedAt": "2024-12-20T11:07:55.662Z",
    "__v": 0
}

export const teacher = {
    "_id": "67654ff8eb6e799a0d5dd995",
    "username": "netanel doe",
    "email": "netanel.doe@example.com",
    "bio": "Experienced educator in mathematics with a passion for teaching.",
    "qualifications": [
        "PhD in Mathematics",
        "Certified Data Scientist"
    ],
    "socialLinks": {
        "linkedin": "https://linkedin.com/in/johndoe",
        "github": "https://github.com/johndoe",
        "personalWebsite": "https://johndoe.com"
    },
    "role": "teacher",
    "active": true,
    "createdAt": "2024-12-20T11:07:36.373Z",
    "updatedAt": "2024-12-20T11:07:36.373Z",
    "__v": 0
}


export const lesson = {
    "title": "Introduction to JavaScript",
    "videoName": "introduction-to-javascript",
    "videoUrl": "https://www.youtube.com/watch?v=hdI2bqOjy3c",
    "content": "In this lesson, you will learn the basics of JavaScript, including syntax, variables, loops, and functions.",
    "duration": 30,
    "resources": [
        {
            "type": "pdf",
            "url": "https://www.example.com/javascript-cheatsheet.pdf"
        },
        {
            "type": "link",
            "url": "https://www.example.com/javascript-exercises"
        }
    ]
}

export const student = {
    "_id": "67716fc6c395c6262952bf79",
    "username": "alice david",
    "email": "alice.David@example.com",
    "profilePicture": "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg",
    "enrolledCourses": [],
    "certificates": [],
    "active": true,
    "createdAt": "2024-12-29T15:50:30.994Z",
    "updatedAt": "2024-12-29T15:50:30.994Z",
    "__v": 0
}

export const review = {
    courseId: "67716fc6c395c6262952bf79",
    studentId: "67716fc6c395c6262952bf79",
    rating: 5,
    comment: "This course was amazing! I learned so much."
}

export const teacherImg = "https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=600";


export const studentImg = "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg";


export const videoCourses = "https://videos.pexels.com/video-files/4115298/4115298-uhd_2732_1440_25fps.mp4"