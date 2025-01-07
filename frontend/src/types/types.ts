export interface ICourse {
    _id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    createdBy: string;
    studentsEnrolled: number[];
    rating: {
        amount: number;
        total: number;
    };
    price: number;
}

export interface ITeacher {
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
}

export interface IStudent {
    username: string;
    email: string;
    profilePicture: string;
    enrolledCourses: string[];
    certificates: string[];
}