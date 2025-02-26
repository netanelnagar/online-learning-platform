import { MouseEventHandler, useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import Card from "../../Components/Ui/Card";
import Input, { inputClasses } from "../../Components/Ui/Input";
import Button from "../../Components/Ui/Button";
import { ICourse } from "../../types/types";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editCourseSchema, editLessonsCourseSchema } from "../../utils/yupSchemas";
import Loader from "../../Components/Ui/Loader";
import { useAddLessonMutation, useRemoveLessonMutation } from "../../redux/api/courseApi";
import { useToast } from "../../Context/Toast";
import { Dropdown } from "primereact/dropdown";



const classesP = "w-full my-1 text-red-600";

const categories = [
    { name: 'Computer', code: 'NY' },
    { name: 'Full Stack', code: 'RM' },
    { name: 'Backend', code: 'LDN' },
    { name: 'FrontEnd', code: 'IST' },
];

interface IFormInput {
    title: string;
    description: string;
    category: { name: string; code: string; };
    price: number;
    thumbnail: File;
}

interface ILessonForm {
    lessons: { title: string; video: File | string; }[];
}
interface IEditCourse {
    course: ICourse;
    handleBack: MouseEventHandler;
    handleSave: (data: any) => void;
    isLoading: boolean;
}

export function EditCourse({ course, handleBack, handleSave, isLoading }: IEditCourse) {
    const toast = useToast();
    const [currentRemoveLess, setCurrentRemoveLess] = useState("")
    const [removeLesson, { isLoading: isLoadingRemoveLess, isError, error, isSuccess }] = useRemoveLessonMutation();
    const [addLessons, { isLoading: isLoadingAddLess, isError: isErrorAdd, error: errorAdd }] = useAddLessonMutation();
    const { register: lessonRegister, handleSubmit: lessonsSubmit, setValue: lessonsSetValue, control: lessonsControl, reset: resetLesson, formState: { errors: lessonErrors } } = useForm<ILessonForm>({
        defaultValues: {
            lessons: [{ title: "", video: "" }]
        },
        // @ts-ignore
        resolver: yupResolver(editLessonsCourseSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control: lessonsControl,
        name: "lessons", // Register the array
    });

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            title: course?.title || "",
            description: course?.description || "",
            category: categories.find(cat => cat.name === course?.category)!,
            price: course?.price || 0,
        },
        // @ts-ignore
        resolver: yupResolver(editCourseSchema),
    });




    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        handleSave({ ...data, _id: course?._id, category: data.category.name })
    };


    const onSubmitLesson: SubmitHandler<ILessonForm> = (data) => {
        for (const les of data.lessons) {
            if (!les.title || !les.video) {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields for each lesson', life: 3000 })
                return;
            }
        }
        addLessons({ _id: course?._id, lessons: data.lessons })
    };

    const deletedLesson = (id: string) => {
        setCurrentRemoveLess(id)
        removeLesson({ course: course?._id, lessonId: id })
    }

    useEffect(() => {
        // @ts-ignore
        isError && toast.current?.show({ severity: 'error', summary: 'Error', detail: `${error.data ? error.data.data : "Can't deleted lesson"}`, life: 3000 });
        // @ts-ignore
        isErrorAdd && toast.current?.show({ severity: 'error', summary: 'Error', detail: `${errorAdd.data ? errorAdd.data.data : "Can't upload lesson"}`, life: 3000 })
        if (isSuccess) {
            toast.current?.show({ severity: 'success', summary: "Success", detail: "Lesson uploaded successfully", life: 3000 });
            resetLesson();
        }
    }, [isError, isErrorAdd, isSuccess])

    const category = watch("category");



    return (
        <div className="grid grid-cols-4 md:space-x-6">
            <button onClick={handleBack} className="col-span-4 my-4 ml-3 text-start">← Back</button>
            <Card className="relative col-span-4 p-6 xl:col-span-2">

                <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
                    {isLoading && <div className='absolute bottom-0 left-0 z-10 flex items-center justify-center w-full h-full bg-slate-200/20'><Loader className='w-28 h-28' /></div>}
                    <Input
                        label="title"
                        register={register}
                        showLabel={true}
                        showErr={true}
                        err={errors.title}
                    />

                    <Input
                        label="description"
                        register={register}
                        showLabel={true}
                        showErr={true}
                        err={errors.description}

                    />

                    <Dropdown placeholder="Select Category" inputId="dd-city" value={category} onChange={(e) => setValue("category", e.value)} options={categories} optionLabel="name" className="w-full border !mt-7" />

                    <Input
                        label="price"
                        register={register}
                        showLabel={true}
                        showErr={true}
                        err={errors.price}

                    />
                    <div>
                        <label htmlFor="fileInput" className="inline-block px-4 py-2 mb-1 text-sm font-medium text-white rounded-md bg-primary">Add Thumbnail</label>
                        <input
                            className="hidden"
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setValue('thumbnail', e.target.files?.[0]!)}
                        />
                        <p className={classesP}>{errors.thumbnail?.message}</p>
                    </div>


                    <Button type="submit" className="w-full text-sm" >Save</Button>
                </form>
            </Card>
            <Card className="col-span-4 mt-4 xl:col-span-2 xl:mt-0">
                <form onSubmit={lessonsSubmit(onSubmitLesson)}>
                    <h3 className="mb-2 font-semibold">Lessons</h3>
                    <div className="space-y-4">
                        {course.lessons.map((lesson, index) => (
                            <Card key={index} className="p-4">
                                <div className={`flex items-start justify-${currentRemoveLess === lesson._id && isLoadingRemoveLess ? 'center' : 'between'}`}>
                                    {currentRemoveLess === lesson._id && isLoadingRemoveLess ?
                                        <Loader className="w-6 h-6" />
                                        :
                                        <>
                                            <div>
                                                <h4 className="font-medium">{lesson.title}</h4>
                                                <p className="text-sm text-gray-500">{lesson.duration} minutes</p>
                                            </div>
                                            <Button
                                                onClick={() => deletedLesson(lesson._id)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </>

                                    }
                                </div>
                            </Card>
                        ))}

                        <Card className="relative p-4">
                            {isLoadingAddLess && <div className='absolute bottom-0 left-0 z-10 flex items-center justify-center w-full h-full bg-slate-200/70'><Loader className='w-28 h-28' /></div>}
                            <div className="space-y-2">
                                {fields.map((field, index) => (
                                    <div key={field.id}>
                                        <div className="flex justify-between ">
                                            <input {...lessonRegister(`lessons.${index}.title`)} placeholder="Enter the Title" className={`${inputClasses} !w-2/4 md:!max-w-3/4`} />
                                            <label htmlFor={`videoInput${index}`} className="inline-block px-4 py-3 mb-1 text-sm font-medium text-white rounded-md bg-primary">Add Lesson</label>
                                            <input
                                                className="hidden"
                                                id={`videoInput${index}`}
                                                type="file"
                                                accept="video/*"
                                                onChange={e => lessonsSetValue(`lessons.${index}.video`, e.target.files?.[0]!, { shouldValidate: true })}

                                            />
                                            <button type="button" onClick={() => remove(index)}>❌</button>
                                        </div>
                                        <p className={classesP}>{lessonErrors.lessons?.[index]?.title?.message} {lessonErrors.lessons?.[index]?.title?.message && lessonErrors.lessons?.[index]?.video?.message && "and"} {lessonErrors.lessons?.[index]?.video?.message}</p>
                                    </div>
                                ))}

                                <Button onClick={() => append({ title: "", video: "" })} className="flex mx-auto text-sm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Lesson
                                </Button>
                            </div>
                        </Card>
                        <Button type="submit" className="w-full text-sm" >Save</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}