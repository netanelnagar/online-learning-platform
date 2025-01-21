import  { useEffect, useState } from 'react'
import { useTeachersMutation } from '../redux/api/teachersApi';
import { TeacherCard } from './TeacherCard';

export default function TeachersHome() {
    const [getTeachers, { data: teachers, isError, isLoading }] = useTeachersMutation();
    const [fetchAgain, setFetchAgain] = useState(true);


    useEffect(() => {
        getTeachers();
    }, [fetchAgain]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div onClick={() => setFetchAgain(f => !f)}>Error :(</div>;
    return (
        <>  
        {teachers && teachers.data.map((teacher) => <TeacherCard key={teacher._id} teacher={teacher} className={`max-w-[350px] md:w-auto`} />)}</>
    )
}
