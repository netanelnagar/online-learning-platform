import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ILesson, ILessonsProgress, IStudent } from '../../types/types';
import Button from '../../Components/Ui/Button';
import { RiCloseLargeFill } from 'react-icons/ri';
import { CiPlay1, CiPause1 } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { useUpdateWatchedLessonMutation } from '../../redux/api/courseApi';
import { selectAuth } from '../../redux/authSlice';
import { useAppSelector } from '../../redux/app/store';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useAddReviewMutation } from '../../redux/api/reviewApi';


interface Course {
    _id: string;
    title: string;
    teacherName: string;
    lessons: ILesson[];
    courseProgress?: {
        lessonsProgress: ILessonsProgress[];
    };
}

interface LessonsAndVideoProps {
    course: Course;
    setSelectedCourse: Dispatch<SetStateAction<Course | null>>;
}

const LessonsAndVideo: FC<LessonsAndVideoProps> = ({ course, setSelectedCourse }) => {
    const { user } = useAppSelector(selectAuth);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [updateWatchedLesson] = useUpdateWatchedLessonMutation();
    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');
    const [addReview] = useAddReviewMutation();

    const handleVideoSelect = (url: string) => {
        setSelectedVideo(url);
    };

    const onEnded = () => {
        const lesson = course.lessons.find((lesson) => lesson.videoUrl === selectedVideo);
        updateWatchedLesson({ course: course._id, lessonId: lesson?._id! });
    };

    const handleSubmitReview = async () => {
        try {
            await addReview({
                course: course._id,
                rating,
                review: reviewText
            }).unwrap();

            // Reset form after successful submission
            setRating(0);
            setReviewText('');
        } catch (error) {
            console.error('Failed to submit review:', error);
        }
    };

    return (
        <div className="p-6 bg-gray-50">
            <div key={course.title} className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold text-gray-800">Course Videos</h4>
                    <Button
                        className='p-2 transition-colors rounded-full hover:bg-primary/80'
                        onClick={() => setSelectedCourse(null)}
                    >
                        <RiCloseLargeFill className="w-5 h-5 text-white" />
                    </Button>
                </div>

                <div className="space-y-3">
                    {course.lessons.map((lesson) => (
                        <div
                            key={lesson._id}
                            className="flex items-center justify-between p-4 transition-all bg-white border-l-4 border-transparent rounded-lg shadow-sm hover:border-l-primary hover:shadow-md"
                        >
                            <div className="flex items-center w-2/3 gap-3 md:flex-1">
                                <div className="flex items-center justify-center w-10 h-10 text-white rounded-full bg-primary/10">
                                    {(user as IStudent)?.enrolledCourses.find((c) => c.course === course._id)?.completedLessons?.includes(lesson._id)
                                        ? <IoMdCheckmarkCircleOutline className='w-6 h-6 text-primary' />
                                        : <span className="text-sm font-medium text-primary">{course.lessons.indexOf(lesson) + 1}</span>
                                    }
                                </div>
                                <h5 className="font-medium text-gray-700 md:text-base">
                                    {lesson.title}
                                </h5>
                            </div>

                            <button
                                className='flex items-center gap-2 px-4 py-2 transition-colors rounded-full hover:bg-gray-100'
                                onClick={() => {
                                    selectedVideo === lesson.videoUrl
                                        ? setIsPlaying(!isPlaying)
                                        : handleVideoSelect(lesson.videoUrl)
                                }}
                            >
                                {!selectedVideo || !isPlaying || selectedVideo != lesson.videoUrl ? (
                                    <CiPlay1 className="w-5 h-5 text-primary" />
                                ) : (
                                    <CiPause1 className="w-5 h-5 text-primary" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {selectedVideo && (
                    <div className="p-4 mt-6 bg-white rounded-lg shadow-md">
                        <MediaPlayer
                            title={course.title}
                            src={selectedVideo}
                            onEnded={onEnded}
                            onPause={() => setIsPlaying(false)}
                            onPlay={() => setIsPlaying(true)}
                        >
                            <MediaProvider />
                            <DefaultVideoLayout
                                thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
                                icons={defaultLayoutIcons}
                            />
                        </MediaPlayer>
                    </div>
                )}

                <div className="p-4 pt-6 mt-6 bg-white border border-gray-200 rounded-lg">
                    <h5 className="mb-4 text-lg font-semibold text-gray-800">Leave a Review</h5>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className="transition-transform hover:scale-110"
                            >
                                {star <= (rating || 0) ? (
                                    <AiFillStar className="w-6 h-6 text-yellow-400" />
                                ) : (
                                    <AiOutlineStar className="w-6 h-6 text-gray-400" />
                                )}
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary min-h-[100px] resize-none"
                    />

                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleSubmitReview}
                            className="px-6 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary/90 disabled:bg-gray-300"
                            disabled={!rating || !reviewText.trim()}
                        >
                            Submit Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonsAndVideo; 