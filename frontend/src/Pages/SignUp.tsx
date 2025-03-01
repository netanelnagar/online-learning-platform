import { useEffect, useRef, useState } from 'react';
import { Mail, Lock, User, Biohazard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../Context/Toast';
import Loader from '../Components/Ui/Loader';
import Footer from './Footer';
import { useRegisterUserMutation } from '../redux/api/authApi';
import { Messages } from 'primereact/messages';
import { SubmitHandler } from 'react-hook-form';
import Input from '../Components/Ui/Input';
import { useStudentForm, useTeacherForm } from '../Custom/TeacherAndStudentForm';

function SignUp(): JSX.Element {
    const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');
    const studentForm = useStudentForm();
    const teacherForm = useTeacherForm();
    const { register, handleSubmit, formState: { errors } } = selectedRole === 'student' ? studentForm : teacherForm;

    const toast = useToast();
    const msgs = useRef<Messages | null>(null);
    const [sendToServer, { data, isLoading, error, isSuccess }] = useRegisterUserMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<any> = async (data) => {
        sendToServer(data);
    };

    useEffect(() => {
        if (error) {
            // @ts-ignore
            msgs.current?.show({ severity: 'error', summary: 'Error', detail: `${error.data.data}`, sticky: true, closable: false });
        } else {
            msgs.current?.clear();
        }
        if (isSuccess) {
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Logged in successfully', life: 3000 });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
    }, [data, isSuccess]);

    return (
        <div className="flex flex-col min-h-full overflow-y-auto">
            <div className="flex-grow px-2 py-4 place-content-center">
                <div className="relative md:space-x-8 space-y-8 md:space-y-0 md:grid md:grid-cols-2 bg-white/70  m-auto p-8 md:border md:border-black/20 md:rounded-2xl md:w-[700px] max-w-md md:max-w-screen-md">
                    {isLoading && (
                        <div className="absolute bottom-0 left-0 z-10 flex items-center justify-center w-full h-full bg-slate-200/70">
                            <Loader className="w-28 h-28" />
                        </div>
                    )}
                    <div className="text-center md:flex md:flex-col md:justify-center md:col-span-1">
                        <h2 className="text-4xl font-bold">Create an Account</h2>
                        <p className="mt-3">Sign up to get started</p>
                        <div className="flex justify-center my-4 space-x-4">
                            <button
                                type="button"
                                onClick={() => setSelectedRole('student')}
                                className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium ${selectedRole === 'student'
                                        ? 'bg-primary hover:bg-primary/90 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <User className="w-4 h-4 mr-2" />
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedRole('teacher')}
                                className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium ${selectedRole === 'teacher'
                                        ? 'bg-primary hover:bg-primary/90 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <User className="w-4 h-4 mr-2" />
                                Teacher
                            </button>
                        </div>
                    </div>

                    <form className="mt-10 space-y-6 md:col-span-1 md:mt-2" onSubmit={handleSubmit(onSubmit)}>
                        {/* Common Fields */}
                        <div className="relative">
                            <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">Username</label>
                            <div className="relative">
                                <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
                                <Input
                                    register={register}
                                    label="username"
                                    showLabel={false}
                                    className="pl-10 text-gray-900 placeholder-gray-400 bg-gray-50"
                                    placeholder="Enter your username"
                                />
                            </div>
                            {errors.username && <p className="m-1 text-red-600">{errors.username.message}</p>}
                        </div>

                        <div className="relative">
                            <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">Email address</label>
                            <div className="relative">
                                <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
                                <Input
                                    register={register}
                                    showLabel={false}
                                    label="email"
                                    className="pl-10 text-gray-900 placeholder-gray-400 bg-gray-50"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && <p className="m-1 text-red-600">{errors.email.message}</p>}
                        </div>

                        <div className="relative">
                            <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
                                <Input
                                    register={register}
                                    showLabel={false}
                                    label="password"
                                    className="pl-10 text-gray-900 placeholder-gray-400 bg-gray-50"
                                    placeholder="Enter your password"
                                />
                            </div>
                            {errors.password && <p className="m-1 text-red-600">{errors.password.message}</p>}
                        </div>

                        <div className="relative">
                            <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
                                <Input
                                    register={register}
                                    showLabel={false}
                                    label="passwordConfirm"
                                    className="pl-10 text-gray-900 placeholder-gray-400 bg-gray-50"
                                    placeholder="Confirm your password"
                                />
                            </div>
                            {errors.passwordConfirm && <p className="m-1 text-red-600">{errors.passwordConfirm.message}</p>}
                        </div>

                        {selectedRole === 'teacher' && (
                            <>
                                <div className="relative">
                                    <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">Bio</label>
                                    <div className="relative">
                                        <Biohazard className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
                                        <Input
                                            register={register}
                                            showLabel={false}
                                            label="bio"
                                            className="pl-10 text-gray-900 placeholder-gray-400 bg-gray-50"
                                            placeholder="Enter your bio"
                                        />
                                    </div>
                                    
                                    {errors.bio && <p className="m-1 text-red-600">{errors.bio.message}</p>}
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-sm font-semibold text-white border border-transparent bg-primary hover:bg-primary/90 rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                        >
                            Sign up
                        </button>
                        <Messages ref={msgs} />
                        <div className="text-sm text-center">
                            <span className="text-gray-500">Already have an account?</span>{' '}
                            <Link to="/login" className="font-medium transition-colors text-primary hover:text-primary">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SignUp;