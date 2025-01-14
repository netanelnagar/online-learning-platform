import { FormEvent, useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../Context/Toast';
import axios from 'axios';
import Loader from '../Ui/Loader';

function SignIn(): JSX.Element {
    const toast = useToast();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student'
    });
    const [loader, setLoader] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        try {
            setLoader(true);
            if (formData.role === 'student') {
                const res = await axios.post('http://localhost:3002/api/students/login', formData)
                console.log(res.data);
            } else {
                const res = await axios.post('http://localhost:3002/api/teachers/login', formData)
                console.log(res.data);
            }
        } catch (error) {
            console.error(error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Some error' });
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="flex justify-center py-4 w-full h-full overflow-y-scroll">

            <div className="md:space-x-8 space-y-8 md:space-y-0 md:grid md:grid-cols-2 bg-white/70 shadow-xl m-auto mx-4 p-8 border border-black/20 rounded-2xl md:w-[700px] max-w-md md:max-w-screen-md">
                {/* Header */}
                {loader && <div className='bottom-0 left-0 z-10 absolute flex justify-center items-center bg-slate-200/70 w-full h-full'><Loader className='w-28 h-28' /></div>}
                <div className="md:flex md:flex-col md:justify-center md:col-span-1 text-center">
                    <h2 className="font-bold text-4xl">
                        Welcome Back
                    </h2>
                    <p className="mt-3">
                        Enter your credentials to access your account
                    </p>
                    <div className="flex justify-center space-x-4 my-4">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'student' })}
                            className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium
                        ${formData.role === 'student'
                                    ? 'bg-primary hover:bg-primary/90 text-white '
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            <User className="mr-2 w-4 h-4" />
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
                            <User className="mr-2 w-4 h-4" />
                            Teacher
                        </button>
                    </div>
                </div>

                <form className="space-y-6 md:col-span-1 mt-10 md:mt-2" onSubmit={handleSubmit}>

                    {/* Email Field */}
                    <div className="relative">
                        <label className="block mb-1 ml-1 font-medium text-gray-700 text-sm">
                            Email address
                        </label>
                        <div className="relative">
                            <Mail className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                            <input
                                type="email"
                                required
                                className="border-gray-200 bg-gray-50 px-4 py-3 pl-10 border focus:border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 w-full text-gray-900 transition-all duration-300 ease-in-out placeholder-gray-400"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <label className="block mb-1 ml-1 font-medium text-gray-700 text-sm">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 transform -translate-y-1/2" />
                            <input
                                type="password"
                                required
                                className="border-gray-200 bg-gray-50 px-4 py-3 pl-10 border focus:border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 w-full text-gray-900 transition-all duration-300 ease-in-out placeholder-gray-400"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="border-gray-300 rounded w-4 h-4"
                            />
                            <label htmlFor="remember-me" className="block ml-2 text-gray-700 text-sm">
                                Remember me
                            </label>
                        </div>
                        {/* need to add componnent for it */}
                        <a href="#" className="font-medium text-primary hover:text-primary/85 transition-colors">
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-primary hover:bg-primary/85 px-4 py-3 border border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full font-semibold text-sm text-white focus:outline-none"
                    >
                        Sign in
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm">
                        <span className="text-gray-500">Don't have an account?</span>
                        {' '}
                        <Link to={"/signup"} className="font-medium text-primary hover:text-primary/85 transition-colors">
                            Create one now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
