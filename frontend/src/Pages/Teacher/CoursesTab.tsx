import { Plus } from "lucide-react";
import Button from "../../Components/Ui/Button";
import { ICourse, ITeacher } from "../../types/types";
import { EditCourse } from "./EditCourse";
import { SpecificUiCourse } from "../SpecificUiCourse";
import Loader from "../../Components/Ui/Loader";
import { useCreateCourseMutation, useEditCourseMutation, useGetCoursesOfTeacherQuery } from "../../redux/api/courseApi";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useToast } from "../../Context/Toast";
import { AddCourse } from "./AddCourse";




interface ICoursesTab {
    teacher: ITeacher;
    setExtraData: Dispatch<SetStateAction<{ studentAmount: string; courseAmount: string; revenueAmount: string; }>>;
}

const CoursesTab = ({ teacher, setExtraData }: ICoursesTab) => {
    const toast = useToast();
    const [showNewCourse, setShowNewCourse] = useState(false);
    const [showEditCourse, setShowEditCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<null | ICourse>(null);


    const [createCourse, { isSuccess: createdCourse, isLoading: createLoading, isError: createError }] = useCreateCourseMutation();
    const [editCourse, { isSuccess: editCourseSuccessfully, isLoading: editLoading, isError: editError }] = useEditCourseMutation();
    const { data: coursesData, isError, isLoading, refetch } = useGetCoursesOfTeacherQuery(teacher._id!);

    const handleSaveNewCourse = (course: ICourse) => {
        createCourse({ ...course, teacherId: teacher._id, name: teacher.username });
    };

    const handleSaveChangesCourse = (course: ICourse) => {
        editCourse(course)
    };

    const handleDeleteCourse = (course: ICourse) => {
        // TODO: delete course from server
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Course deleted successfully', life: 3000 });
    };

    const putCourseInEditCourseState = (id: string) => {
        setShowEditCourse(true);
        setSelectedCourse(coursesData?.data.find(c => c._id === id)!);
    };

    useEffect(() => {
        createdCourse && setShowNewCourse(false);
        createdCourse && toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Course created successfully', life: 3000 });

        editCourseSuccessfully && setShowEditCourse(false);
        editCourseSuccessfully && toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Course updated successfully', life: 3000 });

        editError && toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to update course`,
            life: 3000
        });
        createError && toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to create course`,
            life: 3000
        });
    }, [createdCourse, editCourseSuccessfully, editError, createError]);


    useEffect(() => {
        let students = 0;

        coursesData?.data?.forEach((course) => {
            students += course.studentsEnrolled.length;
        });

        setExtraData((prevState) => ({ ...prevState, studentAmount: `${students}`, courseAmount: `${coursesData?.data.length}` }));
    }, [coursesData, editCourseSuccessfully]);

    if (isLoading) return <Loader className="w-28 h-28 m-auto" />;
    if (isError) return <div onClick={refetch} aria-disabled={isLoading}>Some error occurred... click to refetch</div>;


    // useEffect(() => {
    //     // TODO: for delete course 
    //     // @ts-ignore
    //     createdCourse && toast.current?.show({ severity: 'error', summary: 'Error', detail: `${error.data ? error.data.data : "Can't deleted lesson"}`, life: 3000 })
    // }, [])

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
                showNewCourse ? <AddCourse
                    handleBack={() => {
                        showNewCourse && setShowNewCourse(false);
                        showEditCourse && setShowEditCourse(false);
                    }}
                    handleSave={handleSaveNewCourse}
                    isLoading={createLoading}
                /> : <EditCourse
                    course={selectedCourse!}
                    handleBack={() => {
                        showNewCourse && setShowNewCourse(false);
                        showEditCourse && setShowEditCourse(false);
                    }}
                    handleSave={handleSaveChangesCourse}
                    isLoading={editLoading}
                />
            ) : (
                <CoursesList
                    coursesData={coursesData?.data}
                    putCourseInEditCourseState={putCourseInEditCourseState}
                />
            )}
        </>
    )
};

interface ICoursesList {
    coursesData?: ICourse[];
    putCourseInEditCourseState: (id: string) => void;
}


const CoursesList = ({
    coursesData,
    putCourseInEditCourseState
}: ICoursesList) => {


    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {coursesData?.map((course) => (
                <SpecificUiCourse
                    key={course._id}
                    course={course}
                    isTeacher={true}
                    editCourse={(id) => putCourseInEditCourseState(id)}
                />
            ))}
        </div>
    );
};

export default CoursesTab;