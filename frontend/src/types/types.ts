export interface ICourse {
    _id?: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string[];
    createdBy: string;
    studentsEnrolled: string[];
    published: boolean;
    lessons: ILesson[];
    rating: {
        amount: number;
        total: number;
    };
    price: number;
    createdAt?: string;
    updatedAt?: string;
    isTeacher?: boolean;
}

export interface ILesson {
    title: string;
    videoName: string;
    videoUrl: string;
    content: string;
    duration: number;
    resources: Resource[];
}

export interface Resource {
    type: string;
    url: string;
}

export interface ITeacher {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
    bio: string;
    qualifications: string[];
    socialLinks: {
        twitter?: string;
        linkedin?: string;
        website?: string;
    };
    rating: number;
    coursesCount: number;
    totalStudents: number;
    role: string;
}

export interface IStudent {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
    enrolledCourses: string[];
    certificates: string[];
    role: string;
}

export interface IAdmin {
    _id: string; // Unique identifier for the course
    username: string;
    email: string;
    role?: string; // Optional because it has a default value
    createdAt?: Date; // Optional because it's automatically managed by timestamps
    updatedAt?: Date; // Optional because it's automatically managed by timestamps
}



export interface ILessonsProgress {
    _id: string;
    lessonId: string;
    viewed: boolean;
}

export interface ICourseProgressSchema {
    _id: string;
    userId: string;
    courseId: string;
    completed: boolean;
    lessonsProgress: ILessonsProgress[];
}

export interface IEnrolledCorses {
    title: string;
    teacherName: string;
    lessons: ILesson[];
    courseProgress?: ICourseProgressSchema;
}