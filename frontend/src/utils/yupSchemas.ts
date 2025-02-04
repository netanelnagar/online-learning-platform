import * as yup from "yup"

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