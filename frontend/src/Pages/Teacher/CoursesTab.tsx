import { Plus } from "lucide-react";
import Button from "../../Components/Ui/Button";
import { ICourse, ITeacher } from "../../types/types";
import { EditCourse } from "../EditCourse";
import { SpecificUiCourse } from "../SpecificUiCourse";
import Loader from "../../Components/Ui/Loader";
import { useCreateCourseMutation, useEditCourseMutation, useGetCoursesOfTeacherQuery } from "../../redux/api/courseApi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useToast } from "../../Context/Toast";


const initialCourse: ICourse = {
    title: "",
    description: "",
    category: [],
    thumbnail: "",
    rating: { amount: 0, total: 0 },
    price: 0,
    published: true,
    lessons: [],
    studentsEnrolled: [],
    createdBy: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}

interface ICoursesTab {
    teacher: ITeacher;
}

const CoursesTab = ({ teacher }: ICoursesTab) => {
    const toast = useToast();
    const [showNewCourse, setShowNewCourse] = useState(false);
    const [showEditCourse, setShowEditCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<null | ICourse>(null);


    const [createCourse, { isSuccess: createdCourse, isLoading: createLoading }] = useCreateCourseMutation();
    const [editCourse, { isSuccess: editCourseSuccessfully, isLoading: editLoading }] = useEditCourseMutation();
    const { data: coursesData, error, isLoading } = useGetCoursesOfTeacherQuery(teacher._id!);

    const handleSaveNewCourse = (course: ICourse) => {
        createCourse({ ...course, createdBy: teacher._id! });
    };

    const handleSaveChangesCourse = (course: ICourse) => {
        editCourse(course)
    };

    useEffect(() => {
        createdCourse && setShowNewCourse(false);
        createdCourse && toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Course created successfully', life: 3000 });
    }, [createdCourse]);

    useEffect(() => {
        editCourseSuccessfully && setShowEditCourse(false);
        editCourseSuccessfully && toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Course updated successfully', life: 3000 });
    }, [editCourseSuccessfully]);

    return (
        <>
            {!showNewCourse && (
                <div className="mb-4">
                    <Button className="flex items-center text-sm" onClick={() => setShowNewCourse(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Course
                    </Button>
                </div>
            )}

            {(showNewCourse || showEditCourse) ? (
                <EditCourse
                    course={selectedCourse || initialCourse}
                    handleBack={() => {
                        setShowNewCourse(false);
                        setShowEditCourse(false);
                        setSelectedCourse(null);
                    }}
                    handleSave={showNewCourse ? handleSaveNewCourse : handleSaveChangesCourse}
                    loading={createLoading || editLoading}
                />
            ) : (
                <CoursesList
                    isLoading={isLoading}
                    error={error}
                    coursesData={coursesData?.data}
                    setSelectedCourse={setSelectedCourse}
                    setShowEditCourse={setShowEditCourse}
                />
            )}
        </>
    )
};

interface ICoursesList {
    isLoading: boolean;
    error: any;
    coursesData?: ICourse[];
    setSelectedCourse: Dispatch<SetStateAction<ICourse | null>>;
    setShowEditCourse: Dispatch<SetStateAction<boolean>>;
}


const CoursesList = ({
    isLoading,
    error,
    coursesData,
    setSelectedCourse,
    setShowEditCourse
}: ICoursesList) => {
    if (isLoading) return <Loader className="w-28 h-28 m-auto" />;
    if (error) return <div>Some error occurred... Please refresh the page</div>;

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {coursesData?.map((course) => (
                <SpecificUiCourse
                    key={course._id}
                    course={course}
                    isTeacher={true}
                    editCourse={(id) => {
                        const selected = coursesData.find(c => c._id === id);
                        if (selected) {
                            setSelectedCourse(() => selected);
                            setShowEditCourse(() => true);
                        }
                    }}
                />
            ))}
        </div>
    );
};

export default CoursesTab;