import { IStudent as IS } from "../../types/types";
import { BookOpen, CirclePlus, Clock, LogOut, Trophy } from "lucide-react";
import { SpecificCard } from "../../Components/Ui/Card";
import { Tabs } from "../../Components/Ui/Tabs";
import { useAppSelector } from "../../redux/app/store";
import { useGetEnrolledCoursesQuery } from "../../redux/api/courseApi";
import Loader from "../../Components/Ui/Loader";
import { ChangeEvent, MouseEventHandler, useEffect } from "react";
import { useToast } from "../../Context/Toast";
import { useLogoutUserMutation, useUpdatePhotoUserMutation } from "../../redux/api/authApi";
import ImageChecker from "../ImageChecker";
import CoursesTab from "./CoursesTab";
import CertificatesTab from "./CertificatesTab";



const cardsData = [
  { title: "Enrolled Courses", amount: "", color: "primary", icon: <BookOpen className="w-6 h-6 text-primary" /> },
  { title: "Learning Hours", amount: "", color: "secondary", icon: <Clock className="w-6 h-6 text-secondary" /> },
  { title: "Certificates", amount: "", color: "neutral-800", icon: <Trophy className="w-6 h-6 text-neutral-800" /> }
];

export default function Student() {

  const toast = useToast();
  const student = useAppSelector(store => store.auth.user) as IS;
  const [logout, { isError: logoutErr }] = useLogoutUserMutation();
  const { data: courses, isLoading, isError } = useGetEnrolledCoursesQuery(student?._id ||"");
  const [updatePhotoUser, { isError: updatePhotoErr, isSuccess: updatePhotoSuccess }] = useUpdatePhotoUserMutation();

  const handleUpdateImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(file);
    updatePhotoUser({ role: "students", photo: file });
  }



  const handleLogOut: MouseEventHandler = (e) => {
    e.stopPropagation();
    logout();
  }

  useEffect(() => {
    isError && toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Your logout request failed, please try again.', life: 5000 });
  }, [logoutErr]);

  useEffect(() => {
    updatePhotoSuccess && toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Your profile picture has been updated.', life: 5000 });
    updatePhotoErr && toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Your profile picture update request failed, please try again.', life: 5000 });
  }, [updatePhotoSuccess, updatePhotoErr]);


  if (!student) return <Loader className="w-20 h-20 m-auto" />;
  return (
    <div className="overflow-y-auto">
      <div className="container p-8 mx-auto lg:px-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative">
            <ImageChecker imageClass="object-cover w-32 h-32 rounded-full "
              pClass="text-5xl font-extrabold bg-blue-800 text-white flex items-center justify-center"
              imageUrl={student.profilePicture} errValue={`${student.username.charAt(0)}${student.username.split(" ")[1]?.charAt(0)}`} />
            <label htmlFor="fileInput" className="absolute bottom-0 right-0">
              <CirclePlus className="w-8 h-8 text-blue-900 bg-white rounded-full" />
            </label>
            <input id="fileInput" type="file" className="hidden" accept="image/*" onChange={handleUpdateImage} />
          </div>
          <div className="">
            <h2 className="mb-2 text-2xl font-bold">{student?.username}</h2>
            <p className="mb-6 text-gray-600">{student?.email}</p>
            <p className="flex gap-4 mb-6" onClick={handleLogOut}><LogOut />log out</p>

          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 my-8 md:grid-cols-3">
          {cardsData.map((data) => {
            switch (data.title.split(' ')[0]) {
              case "Enrolled":
                data.amount = courses?.data.length.toString() || "0";
                break;

              case "Learning":
                data.amount = "0";
                break;

              case "Certificates":
                data.amount = student.certificates.length.toString() || "0"
                break;
            }
            return <SpecificCard key={data.title} {...data} />
          })}
        </div>
        <Tabs className="" tabs={[
          {
            label: "Courses", content: <>
              {isLoading ? <div className="flex w-full h-full"> <Loader className="w-20 h-20 m-auto" /> </div> :
                isError ? <div className="mx-auto text-center text-gray-500">Have some error please refresh the page.</div> :
                  <CoursesTab courses={courses?.data!} />
              }
            </>
          },
          {
            label: "Certificates", content: <CertificatesTab username={student.username} certificates={student.certificates} />
          }
        ]} />
      </div>
    </div>

  )
}


