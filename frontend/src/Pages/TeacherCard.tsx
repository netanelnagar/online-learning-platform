import { ITeacher } from "../types/types";
import { GraduationCap, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
interface ITeacherCard {
    teacher: ITeacher;
    className?: string;
}
export const TeacherCard = ({ teacher, className }: ITeacherCard) => {
    return (
        <Link to={`/teachers/${teacher._id}`} className={`bg-white shadow-sm p-6 rounded-lg border transition-shadow hover:shadow-lg ${className}`}>
            <div className="flex flex-row items-center gap-4">
                <img className="w-16 h-16 rounded-full" src={teacher.profilePicture} alt={teacher.username} />
                {/* <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback> */}
                <div>
                    <h3 className="text-lg font-semibold">{teacher.username}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{teacher.rating}</span>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {teacher.qualifications.map((skill) => (
                            <div key={skill} className="px-2 py-1 text-xs text-white rounded-full bg-primary">
                                {skill}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 ">{teacher.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            <span>{teacher.coursesCount} courses</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{teacher.totalStudents} students</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
};