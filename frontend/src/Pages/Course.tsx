// import { Card } from "./ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Components/Ui/Button";
import { ICourse } from "../types/types";
import { useToast } from "../Context/Toast";
import { useGetCourseByIdQuery } from "../redux/api/courseApi";
import Loader from "../Components/Ui/Loader";


interface CourseProps extends ICourse {
  isTeacher?: boolean;
}

export default function Course({ isTeacher = false }: CourseProps) {

  const toast = useToast();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isError, isLoading } = useGetCourseByIdQuery(id!);

  const handleEnroll = () => {
    // TODO: Implement actual enrollment logic with Stripe integration
    setIsEnrolled(true);
    // toast({
    //   title: "Successfully enrolled!",
    //   description: `You have been enrolled in ${title}`,
    // });
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) return <Loader className="m-auto" />;

  if (isError) return <div className="m-auto">Error :(</div>;

  const { title, description, category, price, studentsEnrolled, rating, lessons, thumbnail } = data.data;


  return (
    <div className="md:py-8 overflow-y-auto">
      <button onClick={handleBack} className="my-4 ml-3">← Back</button>
      <div className="flex md:flex-row flex-col-reverse md:gap-x-9 mx-auto p-6 container">
        <div className="py-6 md:w-1/2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="mb-2 line-clamp-2 font-bold text-2xl">{title}</h3>
              <div className="flex gap-2 mb-2 w-[250px] overflow-x-auto">
                {category.map((cat) => (
                  <><div key={cat} className="bg-primary px-2 py-1 rounded-full">{cat}</div>
                    <div key={cat} className="bg-primary px-2 py-1 rounded-full">{cat}</div>
                    <div key={cat} className="bg-primary px-2 py-1 rounded-full">{cat}</div></>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★</span>
                <span>{rating.total.toFixed(1)} ({rating.amount} ratings)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-2xl">${price}</p>
              <p className="text-gray-500 text-sm">{studentsEnrolled} students</p>
            </div>
          </div>

          <p className="mb-4 line-clamp-3 text-gray-600">{description}</p>

          <div className="pt-4 border-t">
            <h4 className="mb-2 font-semibold">Course Content</h4>
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <div key={index} className="flex justify-between items-center hover:bg-gray-50 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-primary" />
                    <span>{lesson.title}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{lesson.duration}min</span>
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
                disabled={isEnrolled}
              >
                {isEnrolled ? "Enrolled" : "Enroll Now"}
              </Button>
            )}
          </div>
        </div>
        <img src={thumbnail || "https://plus.unsplash.com/premium_photo-1682787494977-d013bb5a8773?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={title} className="rounded-lg md:w-1/2 -[600px] object-cover" />
      </div>
    </div>
  );
}