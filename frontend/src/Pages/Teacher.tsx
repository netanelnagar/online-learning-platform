import { ICourse, ITeacher as IT } from "../types/types";
import { useEffect, useState } from "react";
import Card from "../Components/Ui/Card";
import { Tabs } from "../Components/Ui/Tabs";
import { SpecificUiCourse } from "./SpecificUiCourse";
import { useParams } from "react-router-dom";
import { useLoadUserMutation } from "../redux/api/authApi";
import Loader from "../Components/Ui/Loader";
import { useGetCoursesOfTeacherQuery } from "../redux/api/courseApi";
import ImageChecker from "./ImageChecker";






export default function Teacher() {
    const { id } = useParams();
    const [loadUser, { data, error: userError }] = useLoadUserMutation();
    const { data: dataCourses, error: coursesError } = useGetCoursesOfTeacherQuery(data?.data._id);
    const [profile, setProfile] = useState<IT | null>(() => {
        loadUser(`/teachers/${id}`);
        return null;
    });
    const [courses, setCourses] = useState<null | ICourse[]>(null);


    useEffect(() => {
        dataCourses?.data && setCourses(dataCourses.data)
    }, [dataCourses])

    useEffect(() => {
        data?.data && setProfile(data.data);
    }, [data])

    if (!profile) return <Loader className="w-20 h-20 m-auto" />;


    // TODO: upgrade the following code block 
    if (userError) return <div>Error :(</div>;


    return (
        <div className="overflow-y-auto">
            <div className="container p-8 mx-auto space-y-4 lg:px-12">
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                    <div className="relative">
                        <ImageChecker imageClass="object-cover w-32 h-32 rounded-full"
                            pClass="bg-blue-800 text-white flex items-center justify-center text-5xl font-extrabold rounded-full w-32 h-32"
                            imageUrl="" errValue={`${profile.username.charAt(0)}${profile.username.split(" ")[1]?.charAt(0)}`} />
                    </div>
                    <div className="flex flex-col items-start">
                        <h2 className="mb-2 text-2xl font-bold">{profile?.username}</h2>
                        <p className="mb-6 text-gray-600">{profile?.email}</p>
                    </div>
                </div>
                <Tabs tabs={[
                    {
                        label: "Profile",
                        content: <Card className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="mb-2 font-semibold">Bio</h3>
                                    <p className="text-gray-600">{profile?.bio}</p>
                                </div>
                                <div>
                                    <h3 className="mb-2 font-semibold">Qualifications</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.qualifications.map((skill) => (
                                            <div key={skill} className="px-2 py-1 text-xs text-white rounded-full bg-primary">
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {typeof profile.socialLinks === "object" &&
                                    <div>
                                        <h3 className="mb-2 font-semibold">Social Links</h3>
                                        <div className="flex gap-4">
                                            {Object.entries(profile?.socialLinks)?.map(([platform, url]) => (
                                                <a
                                                    key={platform}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary hover:underline"
                                                >
                                                    {platform}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                }
                            </div>
                        </Card>
                    },
                    {
                        label: "Courses",
                        content: <>{dataCourses ? <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {courses?.map((course) => (
                                <SpecificUiCourse key={course._id} course={course}
                                />
                            ))}
                        </div> : coursesError ? "Some Errors... please refresh the Page" : <div className="flex m-auto"><Loader className='w-28 h-28' /></div>}</>
                    }
                ]} />
            </div>
        </div>

    );
}
