export interface ICourse {
    _id: string;
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
}

export interface IStudent {
    username: string;
    email: string;
    profilePicture: string;
    enrolledCourses: string[];
    certificates: string[];
}