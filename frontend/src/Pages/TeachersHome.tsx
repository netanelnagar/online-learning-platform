import { useTeachersQuery } from '../redux/api/teachersApi';
import { TeacherCard } from './TeacherCard';
import Loader from '../Components/Ui/Loader';





export default function TeachersHome() {
    const{ data: teachers, isError, isLoading } = useTeachersQuery();
   
    if (isLoading) return <Loader className='h-20 w-20 m-auto' />;
    if (isError) return <div >Error :( </div>;

    return (
        <div className="grid grid-flow-col auto-cols-max gap-4 overflow-x-scroll h-[290px]">
            {teachers && teachers.data.map((teacher) => <TeacherCard key={teacher._id} teacher={teacher} className={`max-w-[350px] md:w-auto`} />)}
        </div>
    )
}



