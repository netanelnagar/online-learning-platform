import * as yup from "yup"



export const studentSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
    role: yup.string().oneOf(['student']).required(),
});

export const teacherSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
    role: yup.string().oneOf(['teacher']).required(),
    bio: yup.string().required(),
    // bio: yup.string().required('Bio is required'),
    // qualifications: yup.array().of(yup.string()).min(1, 'At least one qualification is required'),
    // socialLinks: yup.object({
    //     linkedin: yup.string().url('Invalid LinkedIn URL').required('LinkedIn URL is required'),
    //     github: yup.string().url('Invalid GitHub URL').required('GitHub URL is required'),
    //     personalWebsite: yup.string().url('Invalid Personal Website URL').required('Personal Website URL is required'),
    // }),
});




export const signupSchema = yup
    .object({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required().min(5),
        passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
        role: yup.string().oneOf(['student', 'teacher']).required(),
    })
    .required()



export const signinSchema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required().min(5),
        role: yup.string().oneOf(['student', 'teacher']).required(),
    })
    .required()


export const editTeacherSchema = yup
    .object({
        username: yup.string().required(),
        bio: yup.string().required().min(50).max(300),
        qualifications: yup.string().required().min(10).max(300),
        linkedIn: yup.string().max(100),
        twitter: yup.string().max(100),
        website: yup.string().max(100),

    })
    .required()


const videoSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    video: yup
        .mixed().required()
        .test("fileRequired", "Video is required", (value) => {
            // @ts-ignore
            return value?.type;
        })
        .test("fileType", "Only videos are allowed", (value) => {
            // @ts-ignore
            return value && value.type.startsWith("video/");
        }),
});


export const createCourseSchema = yup.object().shape({
    title: yup.string().required("Title is required").min(10),
    description: yup.string().required("Description is required").min(25),
    category: yup.object().required("Category is required"),
    price: yup.number().required("Price is required").min(0),
    thumbnail: yup
        .mixed().required()
        .test("fileRequired", "Thumbnail is required", (value) => {
            // @ts-ignore
            return value?.type;
        })
        .test("fileType", "Only images are allowed", (value) => {
            // @ts-ignore
            return value && value.type.startsWith("image/");
        }),
    lessons: yup.array().of(videoSchema),
});



export const editCourseSchema = yup.object().shape({
    title: yup.string().required("Title is required").min(10),
    description: yup.string().required("Description is required").min(25),
    category: yup.object().required("Category is required"),
    price: yup.number().required("Price is required").min(0),
    thumbnail: yup
        .mixed()
        .test("fileType", "Only images are allowed", (value) => {
            // @ts-ignore
            return !value ? true : value && value.type.startsWith("image/");
        }),
});

export const editLessonsCourseSchema = yup.object().shape({
    lessons: yup.array().of(videoSchema),
});

