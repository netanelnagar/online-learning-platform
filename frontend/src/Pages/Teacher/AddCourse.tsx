import { MouseEventHandler, useEffect } from "react";
import { Plus } from "lucide-react";
import Card from "../../Components/Ui/Card";
import Input, { inputClasses } from "../../Components/Ui/Input";
import Button from "../../Components/Ui/Button";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCourseSchema } from "../../utils/yupSchemas";
import Loader from "../../Components/Ui/Loader";
import { useToast } from "../../Context/Toast";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";



const classesP = "w-full my-1 text-red-600"

interface IFormInput {
    title: string;
    description: string;
    category: {name:string; code:string;};
    price: number;
    thumbnail: File;
    lessons: { title: string; video: File | string }[];
}
interface IAddCourse {
    handleBack: MouseEventHandler;
    handleSave: (data: any) => void;
    isLoading: boolean;
}

export function AddCourse({ handleBack, handleSave, isLoading }: IAddCourse) {
    const toast = useToast();
    const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            lessons: [{ title: "", video: "" }],
        },
        // @ts-ignore
        resolver: yupResolver(createCourseSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "lessons", // Register the array
    });

    const category = watch("category");

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        for (const les of data.lessons) {
            if (!les.title || !les.video) {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields for each lesson', life: 3000 })
                return;
            }
        }
        handleSave({...data, category: data.category.name});
    };


    

    const cities = [
        { name: 'Computer', code: 'NY' },
        { name: 'Full Stack', code: 'RM' },
        { name: 'Backend', code: 'LDN' },
        { name: 'FrontEnd', code: 'IST' },
    ];

    console.log(errors)
    return (
        <>
            <button onClick={handleBack} className="my-4 ml-3">← Back</button>
            <Card className="p-6 relative">

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

                    <Dropdown placeholder="Select Category" inputId="dd-city" value={category} onChange={(e) =>  setValue("category", e.value) } options={cities} optionLabel="name" className="w-full border !mt-7" />
                    {/* <Input
                        label="category"
                        register={register}
                        showLabel={true}
                        showErr={true}
                        err={errors.category}

                    /> */}

                    <Input
                        label="price"
                        register={register}
                        showLabel={true}
                        showErr={true}
                        err={errors.price}

                    />
                    <div>
                        <label htmlFor="fileInput" className="inline-block mb-1 py-2 px-4 text-sm text-white rounded-md font-medium bg-primary">Add Thumbnail</label>
                        <input
                            className="hidden"
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setValue('thumbnail', e.target.files?.[0]!)}
                        />
                        <p className={classesP}>{errors.thumbnail?.message}</p>
                    </div>

                    <div>
                        <h3 className="mb-2 font-semibold">Lessons</h3>
                        <Card className="p-4">
                            <div className="space-y-2">
                                {fields.map((field, index) => (
                                    <div key={field.id}>
                                        <div className="flex justify-between">
                                            <input {...register(`lessons.${index}.title`)} placeholder="Enter the Title" className={`${inputClasses} !w-2/4 md:!w-3/4`} />
                                            <label htmlFor={`videoInput${index}`} className="inline-block mb-1 py-3 px-4 text-sm text-white rounded-md font-medium bg-primary">Add Lesson</label>
                                            <input
                                                className="hidden"
                                                id={`videoInput${index}`}
                                                type="file"
                                                accept="video/*"
                                                onChange={e => setValue(`lessons.${index}.video`, e.target.files?.[0]!, { shouldValidate: true })}

                                            />
                                            <button type="button" onClick={() => remove(index)}>❌</button>
                                        </div>
                                        <p className={classesP}>{errors.lessons?.[index]?.title?.message} {errors.lessons?.[index]?.title?.message && errors.lessons?.[index]?.video?.message && "and"} {errors.lessons?.[index]?.video?.message}</p>
                                    </div>
                                ))}

                                <Button onClick={() => append({ title: "", video: "" })} className="flex mx-auto text-sm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Lesson
                                </Button>
                            </div>
                        </Card>
                    </div>
                    <Button type="submit" className="w-full text-sm" disabled={isLoading}>Save</Button>
                </form>
            </Card>
        </>
    );
}