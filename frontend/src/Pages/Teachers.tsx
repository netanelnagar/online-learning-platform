// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

import Footer from "./Footer";
import { teachers as ts } from "./providers";
import { TeacherCard } from "./TeacherCard";
interface Teacher {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  rating: number;
  totalStudents: number;
  coursesCount: number;
  bio: string;
}
const teachers = Array.from({ length: 3 }, (_, i) => ([{
  id: "1",
  name: "Dr. Sarah Johnson",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  expertise: ["Web Development", "React", "JavaScript"],
  rating: 4.8,
  totalStudents: 1234,
  coursesCount: 5,
  bio: "Expert web developer with 10+ years of teaching experience in modern web technologies."
},
{
  id: "2",
  name: "Prof. Michael Chen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  expertise: ["Data Science", "Python", "Machine Learning"],
  rating: 4.9,
  totalStudents: 2156,
  coursesCount: 8,
  bio: "Leading expert in data science and machine learning with a passion for teaching."
},
{
  id: "3",
  name: "Emma Williams",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  expertise: ["UI/UX Design", "Figma", "Web Design"],
  rating: 4.7,
  totalStudents: 987,
  coursesCount: 4,
  bio: "Professional UI/UX designer helping students master modern design tools."
}]));

const t = teachers.flat();
export default function Teachers() {
  return (
    <div className="flex flex-col min-h-full overflow-y-auto">
      <div className="container px-3 py-6 mx-auto flex-grow">
        <h2 className="mb-4 text-3xl font-bold text-primary">Top Teachers</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ts.map((teacher) => <TeacherCard teacher={teacher} />)}
        </div>
      </div>
      {<Footer/>}
    </div>

  );
}



