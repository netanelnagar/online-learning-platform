export interface ICourse {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
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
    _id: string;
    title: string;
    videoName: string;
    videoUrl: string;
    duration: number;
}

export interface IReview {
    student: {
        _id: string;
        name: string;
        imageName: string;
    };
    course: {
        _id: string;
        title: string;
    };
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface ITeacher {
    _id: string;
    username: string;
    email: string;
    profilePicture: string;
    bio: string;
    qualifications: string[];
    socialLinks: {
        github?: string;
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
    enrolledCourses: {
        course: string;
        progress?: number;
        completedLessons?: string[];
        enrollmentDate?: Date;
    }[];
    certificates: {
        course: string;
        completionDate: string;
    }[];
    role: string;
}

export interface IAdmin {
    _id: string;
    username: string;
    email: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface ILessonsProgress {
    _id: string;
    lessonId: string;
    viewed: boolean;
}

export interface ICourseProgressSchema {
    _id: string;
    userId: string;
    course: string;
    completed: boolean;
    lessonsProgress: ILessonsProgress[];
}

export interface IEnrolledCorses {
    _id: string;
    title: string;
    teacherName: string;
    lessons: ILesson[];
}

