import { CirclePlus, DollarSign, Users, BookOpen, Plus } from "lucide-react";
import { ICourse, ITeacher as IT } from "../../types/types";
import { useEffect, useState } from "react";
import Button from "../../Components/Ui/Button";
import Card, { specificCard } from "../../Components/Ui/Card";
import { Tabs } from "../../Components/Ui/Tabs";
import Input from "../../Components/Ui/Input";
import { EditCourse } from "../EditCourse";
import { SpecificUiCourse } from "../SpecificUiCourse";
import Textarea from "../../Components/Ui/Textarea";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/app/store";
import { useLoadUserMutation } from "../../redux/api/authApi";



const coursesB: ICourse[] = [{
  _id: "6765500beb6e799a0d5dd998",
  title: "Introduction to JavaScript",
  description: "Learn the basics of JavaScript, including syntax, variables, loops, and functions.",
  category: ["Programming"],
  thumbnail: "https://images.pexels.com/photos/8423014/pexels-photo-8423014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  rating: {
    amount: 0,
    total: 0
  },
  price: 49.99,
  published: true,
  lessons: [{
    title: "Introduction to JavaScript",
    videoName: "introduction-to-javascript",
    videoUrl: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
    content: "In this lesson, you will learn the basics of JavaScript, including syntax, variables, loops, and functions.",
    duration: 30,
    resources: [
      {
        type: "pdf",
        url: "https://www.example.com/javascript-cheatsheet.pdf"
      },
      {
        type: "link",
        url: "https://www.example.com/javascript-exercises"
      }
    ]
  }],
  studentsEnrolled: [],
  createdBy: "example-teacher",
  createdAt: "2024-12-20T11:07:55.662Z",
  updatedAt: "2024-12-20T11:07:55.662Z"
}]

interface ITeacher {
  isRegularUserWantToSeeTeacherDetails?: boolean;
}


export default function Teacher({ isRegularUserWantToSeeTeacherDetails }: ITeacher) {
  const { id } = useParams();
  const teacher = useAppSelector(store => store.auth.user);
  const [loadUser,  { data, error, isLoading, isSuccess, }] = useLoadUserMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [profile, setProfile] = useState<IT | null>(() =>{
    if (!isRegularUserWantToSeeTeacherDetails) {
     return teacher as IT;
    } else {
      loadUser(`/teachers/${id}`);
      return null;
    }
  });
  const [courses, setCourses] = useState(coursesB);
  const [course, setCourse] = useState<null | ICourse>(null);

  const handleCourseDelete = (courseId: string) => {
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // toast({
    //   title: "Profile Updated",
    //   description: "Your profile has been successfully updated.",
    // });
  };



  const handleNewCourse = () => {
    setShowNewCourse(true);
  };

  const cardsData = [
    { title: "Total Students", amount: "3", color: "primary", icon: <Users className="w-6 h-6 text-primary" /> },
    { title: "Active Courses", amount: "24", color: "secondary", icon: <BookOpen className="w-6 h-6 text-secondary" /> },
    { title: "Total Revenue", amount: `${45}`, color: "secondary", icon: <DollarSign className="w-6 h-6 text-zinc-900" /> }
  ];

  useEffect(() => {
    setCourses
  }, [])

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
    console.log(data)
  }, [data])


  return (
    <div className="overflow-y-auto">
      <div className="container p-8 mx-auto space-y-4 lg:px-12">
        {/* <div className="flex items-start gap-6 mb-8"> */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative">
            <img
              src={"https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg"}
              alt={teacher?.username}
              className="object-cover w-32 h-32 rounded-full"
            />
            {!isRegularUserWantToSeeTeacherDetails &&
              <CirclePlus className="absolute bottom-0 right-0 w-8 h-8 text-blue-900 bg-white rounded-full" onClick={(e) => console.log("first")} />}
          </div>
          <div className="flex flex-col items-center">
            <h2 className="mb-2 text-2xl font-bold">{teacher?.username}</h2>
            <p className="mb-6 text-gray-600">{teacher?.email}</p>
          </div>
        </div>

        {!isRegularUserWantToSeeTeacherDetails &&
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
            {cardsData.map((data) => specificCard(data))}
          </div>}
        <Tabs tabs={[
          {
            label: "Profile",
            content: <>
              <Card className="p-6">
                {isEditing && !isRegularUserWantToSeeTeacherDetails ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">Username</label>
                      <Input
                        value={profile?.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={profile?.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Bio</label>
                      <Textarea
                        value={profile?.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Qualifications</label>
                      <Textarea
                        value={profile?.qualifications.join(', ')}
                        onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">Social Links</label>
                      <div className="space-y-2">
                        <Input
                          placeholder="Twitter URL"
                          value={profile?.socialLinks.twitter}
                          onChange={(e) => setProfile({
                            ...profile,
                            socialLinks: { ...profile.socialLinks, twitter: e.target.value }
                          })}
                        />
                        <Input
                          placeholder="LinkedIn URL"
                          value={profile?.socialLinks.linkedin}
                          onChange={(e) => setProfile({
                            ...profile,
                            socialLinks: { ...profile.socialLinks, linkedin: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                    <Button className="text-sm rounded-md" onClick={handleProfileUpdate}>Save Changes</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 font-semibold">Bio</h3>
                      <p className="text-gray-600">{profile?.bio}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Qualifications</h3>
                      <p className="text-gray-600">{profile?.qualifications}</p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Social Links</h3>
                      <div className="flex gap-4">
                        {/* {Object.entries(profile?.socialLinks)?.map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {platform}
                          </a>
                        ))} */}
                      </div>
                    </div>
                    {!isRegularUserWantToSeeTeacherDetails &&
                      <Button
                        variant="outline"
                        className="text-xs"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        Edit Profile
                      </Button>}
                  </div>
                )}
              </Card>
            </>
          }, {
            label: "Courses",
            content: <>
              {!isRegularUserWantToSeeTeacherDetails &&
                <div className="mb-4">
                  <Button className="flex items-center text-sm" onClick={handleNewCourse}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Course
                  </Button>
                </div>}

              {showNewCourse ? (
                <EditCourse course={(course || {
                  _id: "",
                  title: "",
                  description: "",
                  category: [],
                  thumbnail: "",
                  rating: { amount: 0, total: 0 },
                  price: 0,
                  published: false,
                  lessons: [],
                  studentsEnrolled: [],
                  createdBy: "example-teacher",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                })}
                  handleBack={(e) => {
                    e.stopPropagation();
                    setShowNewCourse(false);
                    setCourse(null);
                  }}
                  handleSave={() => {
                    // TODO: handle save (should call to redux rtk).
                    setShowNewCourse(false);
                    setCourse(null);
                  }} />
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {courses.map((course) => (
                    <SpecificUiCourse key={course._id} course={course} isTeacher={!isRegularUserWantToSeeTeacherDetails}
                      editCourse={(id) => { setCourse(() => courses.filter(c => c._id === id)[0]); setShowNewCourse(true) }} />
                  ))}
                </div>
              )}
            </>

          }]} />


      </div>
    </div>

  );
}
