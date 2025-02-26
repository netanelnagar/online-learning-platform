import { FC } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { LuLoader } from 'react-icons/lu';
import Button from '../Components/Ui/Button';
import { useEnrollCourseQuery } from '../redux/api/courseApi';

const Success: FC = () => {
    const [searchParams] = useSearchParams();
    const course = searchParams.get('course');
    const navigate = useNavigate();

    if (!course) {
        return <Navigate to="/" />;
    }

    const { isLoading, isSuccess, isError, error } = useEnrollCourseQuery(course);

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="w-full max-w-md p-8 text-center bg-white">
                {isLoading ? (
                    <div className="flex flex-col items-center">
                        <LuLoader className='animate-spin text-primary h-28 w-28' />
                        <p className="mt-4 text-gray-600">Enrolling you in the course...</p>
                    </div>
                    // @ts-ignore
                ) : isSuccess || error?.data?.data === import.meta.env.VITE_ALREADY_ENROLLED ? (
                    <div className="flex flex-col items-center gap-4">
                        <FaCheckCircle className="mb-4 text-6xl text-primary" />
                        <h1 className="text-2xl font-bold text-gray-800">Enrollment Successful!</h1>
                        <p className="mt-2 text-gray-600">
                            You have successfully enrolled in the course. Start learning now!
                        </p>
                        <Button
                            onClick={() => navigate(`/courses/${course}`)}
                        >
                            Go to Course
                        </Button>
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center gap-4">
                        <FaTimesCircle className="mb-4 text-6xl text-red-500" />
                        <h1 className="text-2xl font-bold text-gray-800">Enrollment Failed</h1>
                        <p className="mt-2 text-gray-600">
                            Something went wrong. Please send us a message.
                        </p>
                        <input
                            placeholder="Message"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button
                            // TODO: Send message
                            onClick={() => navigate('/')}
                        >
                            Send Message
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Success;