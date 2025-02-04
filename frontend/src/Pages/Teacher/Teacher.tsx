import { CirclePlus, DollarSign, Users, BookOpen, LogOut } from "lucide-react";
import { ITeacher as IT } from "../../types/types";
import { MouseEventHandler, useState } from "react";
import { specificCard } from "../../Components/Ui/Card";
import { Tabs } from "../../Components/Ui/Tabs";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import Loader from "../../Components/Ui/Loader";
import ProfileTab from "./ProfileTab ";
import CoursesTab from "./CoursesTab";
import { useToast } from "../../Context/Toast";
import { userLoggedOut } from "../../redux/authSlice";

// TODO: Replace with real data
const cardsData = [
  { title: "Total Students", amount: "3", color: "primary", icon: <Users className="w-6 h-6 text-primary" /> },
  { title: "Active Courses", amount: "24", color: "secondary", icon: <BookOpen className="w-6 h-6 text-secondary" /> },
  { title: "Total Revenue", amount: `${45}`, color: "secondary", icon: <DollarSign className="w-6 h-6 text-zinc-900" /> }
];


export default function Teacher() {

  const toast = useToast();
  const teacher = useAppSelector(store => store.auth.user) as IT;
  const logout = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<IT | null>(teacher as IT);


  const handleProfileUpdate = () => {
    // TODO: handle save (should call to redux rtk).
    setIsEditing(false);
    // toast({
    //   title: "Profile Updated",
    //   description: "Your profile has been successfully updated.",
    // });
  };

  const handleUpdateImage = () => {
    //TODO:  Update the user's profile picture
  }

  const handleLogOut: MouseEventHandler = (e) => {
    e.stopPropagation();
    logout(userLoggedOut());
  }


  if (!profile) return <Loader className="w-20 h-20 m-auto" />;

  return (
    <div className="overflow-y-auto">
      <div className="container p-8 mx-auto space-y-4 lg:px-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative">
            <img
              src={"https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg"}
              alt={profile?.username}
              className="object-cover w-32 h-32 rounded-full"
            />
            <CirclePlus className="absolute bottom-0 right-0 w-8 h-8 text-blue-900 bg-white rounded-full" onClick={handleUpdateImage} />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="mb-2 text-2xl font-bold">{profile?.username}</h2>
            <p className="mb-6 text-gray-600">{profile?.email}</p>
            <p className="mb-6 flex gap-4" onClick={handleLogOut}><LogOut />log out</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          {cardsData.map((data) => specificCard(data))}
        </div>
        <Tabs tabs={[
          {
            label: "Profile",
            content: <ProfileTab profile={profile} setProfile={setProfile} isEditing={isEditing} setIsEditing={setIsEditing} handleProfileUpdate={handleProfileUpdate} />
          }, {
            label: "Courses",
            content: <CoursesTab teacher={profile} />
          }]} />
      </div>
    </div>

  );
}


