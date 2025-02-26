import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Messages } from 'primereact/messages';
import { SubmitHandler, useForm } from 'react-hook-form';
import Loader from '../Components/Ui/Loader';
import Footer from './Footer';
import { useLoginUserMutation } from '../redux/api/authApi';
import { useToast } from '../Context/Toast';
import Input from '../Components/Ui/Input';
import { signinSchema } from '../utils/yupSchemas';
import { yupResolver } from '@hookform/resolvers/yup';


interface IFormInput {
    email: string;
    password: string;
    role: 'student' | 'teacher';
}

function SignIn() {

    const toast = useToast();
    const msgs = useRef<Messages | null>(null);
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<IFormInput>({
        defaultValues: { role: "student" },
          resolver: yupResolver(signinSchema),
    });
    const [loginUser, { data, error, isLoading, isSuccess, }] = useLoginUserMutation();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        loginUser(data);
    };


    useEffect(() => {
        if (error) {
            msgs.current?.show({ severity: 'error', summary: 'Error', detail: `some error please refresh and try again`, life: 5000 });
        } else {
            msgs.current?.clear();
        }
        if (isSuccess) {
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Logged in successfully', life: 5000 });;
            setTimeout(() => {
                navigate("/")
            }, 1000);
        }
    }, [data,
        error,
        isLoading,
        isSuccess,])

    const selectedRole = watch("role");

    return (
        <div className="flex flex-col min-h-full overflow-y-auto">
            <div className='flex-grow px-2 py-4 place-content-center'>
                <div className="md:space-x-8 space-y-8 md:space-y-0 md:grid md:grid-cols-2 bg-white/70 m-auto p-8 md:border md:border-black/20 md:rounded-2xl md:w-[700px] max-w-md md:max-w-screen-md">
                    {isLoading && <div className='absolute bottom-0 left-0 z-10 flex items-center justify-center w-full h-full bg-slate-200/70'><Loader className='w-28 h-28' /></div>}
                    <div className="text-center md:flex md:flex-col md:justify-center md:col-span-1">
                        <h2 className="text-4xl font-bold">
                            Welcome Back
                        </h2>
                        <p className="mt-3">
                            Enter your credentials to access your account
                        </p>
                        <div className="flex justify-center my-4 space-x-4">
                            <button
                                type="button"
                                onClick={() => setValue("role", "student")}
                                className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium
                        ${selectedRole === 'student'
                                        ? 'bg-primary hover:bg-primary/90 text-white '
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                <User className="w-4 h-4 mr-2" />
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setValue("role", "teacher")}
                                className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium 
                        ${selectedRole === 'teacher'
                                        ? 'bg-primary hover:bg-primary/90 text-white 30'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                <User className="w-4 h-4 mr-2" />
                                Teacher
                            </button>
                        </div>
                    </div>

                    <form className="mt-10 space-y-6 md:col-span-1 md:mt-2" onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative">
                            <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
                                <Input
                                    register={register}
                                    showLabel={false}
                                    label='email'
                                    className="pl-10 text-gray-900 placeholder-gray-400 bg-gray-50 "
                                    placeholder="Enter your email"

                                />
                            </div>
                            {errors.email && <p className='m-1 text-red-600'>{errors.email.message}</p>}
                        </div>
                        <div className="relative">
                            <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
                                <Input
                                    register={register}
                                    showLabel={false}
                                    label='password'
                                    className="pl-10 text-gray-900 placeholder-gray-400 bg-gray-50 "
                                    placeholder="Enter your password"
                                />
                            </div>
                            {errors.password && <p className='m-1 text-red-600'>{errors.password.message}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="w-4 h-4 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="font-medium transition-colors text-primary hover:text-primary/85">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-sm font-semibold text-white border border-transparent bg-primary hover:bg-primary/85 rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                        >
                            Sign in
                        </button>
                        <Messages ref={msgs} />
                        <div className="text-sm text-center">
                            <span className="text-gray-500">Don't have an account?</span>
                            {' '}
                            <Link to={"/signup"} className="font-medium transition-colors text-primary hover:text-primary/85">
                                Create one now
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignIn;
