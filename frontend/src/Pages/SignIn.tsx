import { FormEvent, useEffect, useRef, useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Components/Ui/Loader';
import Footer from './Footer';
import { useLoginUserMutation } from '../redux/api/authApi';
import { Messages } from 'primereact/messages';
import { useToast } from '../Context/Toast';

function SignIn() {

    const toast = useToast();
    const msgs = useRef<Messages | null>(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student'
    });
    const [loginUser, { data, error, isLoading, isSuccess, }] = useLoginUserMutation();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        loginUser(formData);
    };

    useEffect(() => {
        if (error) {
            msgs.current?.show({ severity: 'error', summary: 'Error', detail: `some error please refresh and try again`, sticky: true, closable: false })
        } else {
            msgs.current?.clear();
        }
        if (isSuccess) {
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Logged in successfully', sticky: true, closable: false });
            setTimeout(() => {
                navigate("/")
            }, 1000);
        }
    }, [data,
        error,
        isLoading,
        isSuccess,])


    return (
        <div className="flex flex-col min-h-full overflow-y-auto">
            <div className='px-2 py-4 flex-grow place-content-center'>
                <div className="md:space-x-8 space-y-8 md:space-y-0 md:grid md:grid-cols-2 bg-white/70 shadow-xl m-auto p-8 border border-black/20 rounded-2xl md:w-[700px] max-w-md md:max-w-screen-md">
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
                                onClick={() => setFormData({ ...formData, role: 'student' })}
                                className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium
                        ${formData.role === 'student'
                                        ? 'bg-primary hover:bg-primary/90 text-white '
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                <User className="w-4 h-4 mr-2" />
                                Student
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'teacher' })}
                                className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium 
                        ${formData.role === 'teacher'
                                        ? 'bg-primary hover:bg-primary/90 text-white 30'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                <User className="w-4 h-4 mr-2" />
                                Teacher
                            </button>
                        </div>
                    </div>

                    <form className="mt-10 space-y-6 md:col-span-1 md:mt-2" onSubmit={handleSubmit}>
                        <div className="relative">
                            <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 pl-10 text-gray-900 placeholder-gray-400 transition-all duration-300 ease-in-out border border-gray-200 bg-gray-50 focus:border-transparent rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <label className="block mb-1 ml-1 text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 top-1/2 left-3" />
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 pl-10 text-gray-900 placeholder-gray-400 transition-all duration-300 ease-in-out border border-gray-200 bg-gray-50 focus:border-transparent rounded-xl focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
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
