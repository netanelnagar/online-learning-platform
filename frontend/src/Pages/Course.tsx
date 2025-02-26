import { PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Components/Ui/Button";
import { ICourse } from "../types/types";
import { useToast } from "../Context/Toast";
import { useGetCourseByIdQuery } from "../redux/api/courseApi";
import { loadStripe } from '@stripe/stripe-js';
import Loader from "../Components/Ui/Loader";
import ImageChecker from "./ImageChecker";


interface CourseProps {
  isTeacher?: boolean;
}

export default function Course({ isTeacher = false }: CourseProps) {

  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isError, isLoading } = useGetCourseByIdQuery(id!);

  const handleEnroll = async () => {
    try {
      // @ts-ignore
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);
      // @ts-ignore
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/courses/stripe/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course: id }),
        credentials: "include",
      });
      if (!response.ok) {
        toast.current?.show({});
        return;
      }
      const { data: { sessionId } } = await response.json();

      const session = await stripe?.redirectToCheckout({
        sessionId,
      });

      if (session?.error) {
        console.error(session.error.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) return <Loader className="m-auto" />;

  if (isError) return <div className="m-auto">Error :(</div>;

  const { title, description, category, price, studentsEnrolled, rating, lessons, thumbnail } = data.data as ICourse;

  return (
    <div className="overflow-y-auto md:py-8">
      <button onClick={handleBack} className="my-4 ml-3">← Back</button>
      <div className="container flex flex-col-reverse p-6 mx-auto md:flex-row md:gap-x-9">
        <div className="py-6 md:w-1/2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="mb-2 text-2xl font-bold line-clamp-2">{title}</h3>
              <div className="flex gap-2 mb-2 w-[250px] overflow-x-auto">
                {category && <div className="px-2 py-1 rounded-full bg-primary">{category}</div>}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★</span>
                <span>{rating.total.toFixed(1)} ({rating.amount} ratings)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">${price}</p>
              <p className="text-sm text-gray-500">{studentsEnrolled} students</p>
            </div>
          </div>

          <p className="mb-4 text-gray-600 line-clamp-3">{description}</p>

          <div className="pt-4 border-t">
            <h4 className="mb-2 font-semibold">Course Content</h4>
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-primary" />
                    <span>{lesson.title}</span>
                  </div>
                  <span className="text-sm text-gray-500">{lesson.duration}min</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {isTeacher ? (
              <Button className="w-full">Edit Course</Button>
            ) : (
              <Button
                className="w-full md:w-auto"
                onClick={handleEnroll}
              >
                Enroll Now
              </Button>
            )}
          </div>
        </div>
        <ImageChecker imageClass="rounded-lg md:min-w-1/2 max-w-[600px] object-cover mx-auto" pClass="text-3xl font-extrabold bg-primary text-white flex items-center justify-center h-[300px] md:h-auto w-full md:w-1/2" imageUrl={thumbnail + "99898"} errValue={title} />
      </div>
    </div>
  );
}