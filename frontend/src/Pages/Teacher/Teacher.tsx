import { CirclePlus, DollarSign, Users, BookOpen, LogOut } from "lucide-react";
import { ITeacher as IT } from "../../types/types";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { Tabs } from "../../Components/Ui/Tabs";
import { useAppSelector } from "../../redux/app/store";
import Loader from "../../Components/Ui/Loader";
import ProfileTab from "./ProfileTab ";
import CoursesTab from "./CoursesTab";
import { useToast } from "../../Context/Toast";
import ImageChecker from "../ImageChecker";
import { SpecificCard } from "../../Components/Ui/Card";
import { useLogoutUserMutation, useUpdatePhotoUserMutation } from "../../redux/api/authApi";

const cardsData = [
  { title: "Total Students", amount: "", color: "primary", icon: <Users className="w-6 h-6 text-primary" /> },
  { title: "Active Courses", amount: "", color: "secondary", icon: <BookOpen className="w-6 h-6 text-secondary" /> },
  { title: "Total Revenue", amount: "", color: "secondary", icon: <DollarSign className="w-6 h-6 text-zinc-900" /> }
];


export default function Teacher() {

  const toast = useToast();
  const teacher = useAppSelector(store => store.auth.user) as IT;
  const [logout, { isError }] = useLogoutUserMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [extraData, setExtraData] = useState({ studentAmount: "0", courseAmount: "0", revenueAmount: "0" });
  const [updatePhotoUser, { isError: updatePhotoErr, isSuccess: updatePhotoSuccess }] = useUpdatePhotoUserMutation();


  const handleUpdateImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log(file);
    updatePhotoUser({ role: "teachers", photo: file });
  }

  const handleLogOut: MouseEventHandler = (e) => {
    e.stopPropagation();
    logout();
  }

  useEffect(() => {
    isError && toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Your logout request failed, please try again.', life: 5000 });
  }, [isError]);

  useEffect(() => {
    updatePhotoSuccess && toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Your profile picture has been updated.', life: 5000 });
    updatePhotoErr && toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Your profile picture update request failed, please try again.', life: 5000 });
  }, [updatePhotoSuccess, updatePhotoErr]);


  if (!teacher) return <Loader className="w-20 h-20 m-auto" />;

  return (
    <div className="overflow-y-auto">
      <div className="container p-8 mx-auto space-y-4 lg:px-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative">
            <ImageChecker imageClass="object-cover w-32 h-32 rounded-full "
              pClass="text-5xl font-extrabold bg-blue-800 text-white flex items-center justify-center"
              imageUrl={teacher.profilePicture} errValue={`${teacher.username.charAt(0)}${teacher.username.split(" ")[1]?.charAt(0)}`} />
            <label htmlFor="fileInput" className="absolute bottom-0 right-0">
              <CirclePlus className="w-8 h-8 text-blue-900 bg-white rounded-full" />
            </label>
            <input id="fileInput" type="file" className="hidden" accept="image/*" onChange={handleUpdateImage} />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="mb-2 text-2xl font-bold">{teacher?.username}</h2>
            <p className="mb-6 text-gray-600">{teacher?.email}</p>
            <p className="flex gap-4 mb-6" onClick={handleLogOut}><LogOut />log out</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          {cardsData.map((data) => {
            switch (data.title.split(' ')[1]) {
              case "Students":
                data.amount = extraData.studentAmount;
                break;

              case "Courses":
                data.amount = extraData.courseAmount;
                break;

              case "Revenue":
                data.amount = extraData.revenueAmount;
                break;
            }
            return <SpecificCard key={data.title} {...data} />
          })}
        </div>

        <Tabs tabs={[
          {
            label: "Profile",
            content: <ProfileTab teacher={teacher} isEditing={isEditing} setIsEditing={setIsEditing} />
          },
          {
            label: "Courses",
            content: <CoursesTab teacher={teacher} setExtraData={setExtraData} />
          }
        ]} />
      </div>
    </div>

  );
}


