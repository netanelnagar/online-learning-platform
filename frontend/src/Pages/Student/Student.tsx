import { IStudent as IS } from "../../types/types";
import { BookOpen, CirclePlus, Clock, LogOut, Trophy } from "lucide-react";
import { ProgressBar } from "primereact/progressbar";
import Card, { specificCard } from "../../Components/Ui/Card";
import { Tabs } from "../../Components/Ui/Tabs";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { useGetEnrolledCoursesQuery } from "../../redux/api/courseApi";
import Loader from "../../Components/Ui/Loader";
import { userLoggedOut } from "../../redux/authSlice";
import { MouseEventHandler } from "react";




export default function Student() {
  const student = useAppSelector(store => store.auth.user) as IS;
  const logout = useAppDispatch();
  const { data: courses, isLoading, isError } = useGetEnrolledCoursesQuery(student._id);


  const cardsData = [
    { title: "Enrolled Courses", amount: courses?.data.length.toString()|| "0", color: "primary", icon: <BookOpen className="w-6 h-6 text-primary" /> },
    { title: "Learning Hours", amount: "0", color: "secondary", icon: <Clock className="w-6 h-6 text-secondary" /> },
    { title: "Certificates", amount: student.certificates.length.toString() || "0", color: "neutral-800", icon: <Trophy className="w-6 h-6 text-neutral-800" /> }
  ];



  const handleUpdateImage = () => {
    //TODO:  Update the user's profile picture
  }



  const handleLogOut: MouseEventHandler = (e) => {
    e.stopPropagation();
    logout(userLoggedOut());
  }



  if (!student) return <Loader className="w-20 h-20 m-auto" />;
  return (
    <div className="overflow-y-auto">
      <div className="container p-8 mx-auto lg:px-12">
        {/* <div className="p-8 bg-white rounded-lg shadow-lg"> */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative">
            <img
              src={"https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg"}
              alt={student?.username}
              className="object-cover w-32 h-32 rounded-full"
            />
            <CirclePlus className="absolute bottom-0 right-0 w-8 h-8 text-blue-900 bg-white rounded-full" onClick={handleUpdateImage} />
          </div>
          <div className="">
            <h2 className="mb-2 text-2xl font-bold">{student?.username}</h2>
            <p className="mb-6 text-gray-600">{student?.email}</p>
            <p className="mb-6 flex gap-4" onClick={handleLogOut}><LogOut />log out</p>

          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 my-8 md:grid-cols-3">
          {cardsData.map((data) => specificCard(data))}
        </div>
        <Tabs className="" tabs={[
          {
            label: "Courses", content: <div className="grid grid-cols-1 gap-6">
              {courses && !isLoading ? courses.data.map((course) => {

                const progress = course.courseProgress ? (course.lessons.length / course.courseProgress.lessonsProgress.length) * 100 : 0;

                return (<Card key={course.title} className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-semibold">{course.title}</h3>
                      <p className="mb-2 text-gray-500">Instructor: {course.teacherName}</p>
                    </div>

                    <div className="w-full md:w-48">
                      <p className="mb-2 text-sm text-gray-500">Progress</p>
                      <ProgressBar showValue={false} value={progress} className="h-5 bg-sky-200" color="rgb(14 165 233)" />
                      <p className="mt-1 text-sm text-right">{progress}%</p>
                    </div>
                  </div>
                </Card>
                )
              })
                : isError ? <div className="text-center text-gray-500">Have some error please refresh the page.</div>
                  : <Loader className="w-20 h-20 m-auto" />
              }
            </div>
          },
          // {
          //className="w-1/3 max-w-80"
          //   label: "Edit Account", content: <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 lg:flex-row">
          //     <Input
          //       register={register}
          //       showLabel={false}
          //       label='username'
          //       className="w-full lg:w-1/3 lg:max-w-80 bg-gray-50 text-gray-900 placeholder-gray-400 "
          //       placeholder="Enter your new username"
          //     />
          //     <Button className="text-xs" type="submit" disabled={LoadingUpdate}>Save Changes</Button>
          //   </form>
          // },
          {
            label: "Certificates", content: <>
              {student.certificates.length ? <div className="grid grid-cols-1 gap-6"></div> :
                <p className="text-center text-gray-500">No certificates found.</p>
              }
            </>
          }]} />

      </div>
      {/* </div> */}
    </div>

  )
}


