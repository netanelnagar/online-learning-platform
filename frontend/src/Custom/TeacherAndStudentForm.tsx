import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { studentSchema, teacherSchema } from '../utils/yupSchemas';



interface IForm {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
interface IFormStudent extends IForm {
    role: 'student';
}


interface IFormTeacher extends IForm {
    role: 'teacher';
    bio: string;
    // qualifications?: string[],
    // socialLinks: {
    //     linkedin: string;
    //     github: string;
    //     personalWebsite: string;
    // },
}

export const useStudentForm = () => {
    return useForm<IFormStudent>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            role: 'student',
        },
        resolver: yupResolver(studentSchema),
    });
};

// Hook for Teacher Form
export const useTeacherForm = () => {
    return useForm<IFormTeacher>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            role: 'teacher',
            bio: '',
            // qualifications: [],
            // socialLinks: {
            //     linkedin: '',
            //     github: '',
            //     personalWebsite: '',
            // },
        },
        resolver: yupResolver(teacherSchema),
    });
};