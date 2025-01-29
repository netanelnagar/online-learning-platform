// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

import Loader from "../Components/Ui/Loader";
import { useTeachersQuery } from "../redux/api/teachersApi";
import Footer from "./Footer";
import { teachers as ts } from "./providers";
import { TeacherCard } from "./TeacherCard";

export default function Teachers() {
  const{ data: teachers, isError, isLoading } = useTeachersQuery();
   
  if (isLoading) return <Loader className='h-20 w-20 m-auto' />;
  if (isError) return <div >Error :( </div>;
  return (
    <div className="flex flex-col min-h-full overflow-y-auto">
      <div className="container px-3 py-6 mx-auto flex-grow">
        <h2 className="mb-4 text-3xl font-bold text-primary">Top Teachers</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teachers && teachers.data.map((teacher) => <TeacherCard teacher={teacher} />)}
        </div>
      </div>
      {<Footer/>}
    </div>

  );
}



