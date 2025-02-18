import Button from "../../Components/Ui/Button";
import Card from "../../Components/Ui/Card";
import { ITeacher } from "../../types/types";
import Input from "../../Components/Ui/Input";
import Textarea from "../../Components/Ui/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editTeacherSchema } from "../../utils/yupSchemas";
import { useUpdateUserMutation } from "../../redux/api/authApi";
import { useEffect } from "react";
import Loader from "../../Components/Ui/Loader";
import { useToast } from "../../Context/Toast";
import { ArrowLeftIcon } from "lucide-react";


interface IProfileTab {
    teacher: ITeacher;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
}

const ProfileTab = ({ teacher, isEditing, setIsEditing }: IProfileTab) => {

    return (
        <>
            {isEditing && <button
                onClick={() => setIsEditing(false)}
                className="flex gap-2 mb-2 w-full font-bold text-black"
            >
                <ArrowLeftIcon /> Go Back
            </button>}
            <Card className="p-6 relative">
                {isEditing ? (
                    <EditProfileForm
                        teacher={teacher}
                        setIsEditing={setIsEditing}
                    />
                ) : (
                    <ProfileView teacher={teacher} setIsEditing={setIsEditing} />
                )}
            </Card>
        </>

    )
};

interface IEditProfileForm {
    teacher: ITeacher;
    setIsEditing: (value: boolean) => void;
}

interface IFormInput {
    username: string;
    bio: string;
    qualifications: string;
    linkedIn?: string;
    twitter?: string;
    website?: string;
}


const EditProfileForm = ({ teacher, setIsEditing }: IEditProfileForm) => {
    const toast = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        defaultValues: {
            username: teacher?.username,
            bio: teacher?.bio,
            qualifications: teacher?.qualifications.join(','),
            linkedIn: teacher?.socialLinks?.linkedin,
            twitter: teacher?.socialLinks?.twitter,
            website: teacher?.socialLinks?.website,
        },
        resolver: yupResolver(editTeacherSchema),
    });
    const [update, { isError, isLoading, isSuccess }] = useUpdateUserMutation();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const onlyTruthyKeys = Object.fromEntries(Object.entries(data).filter(([_, value]) => Boolean(value)))
        update({ role: "teachers", data: { ...onlyTruthyKeys, qualifications: onlyTruthyKeys.qualifications.split(",") } });
    }

    useEffect(() => {
        isError && toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to update profile`,
            life: 3000
        });

        isSuccess && toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: `Profile updated successfully`,
            life: 3000
        });
        isSuccess && setIsEditing(false);
    }, [isError, isSuccess])


    return (
        <form className="space-y-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            {isLoading && <div className='absolute bottom-0 left-0 z-10 flex items-center justify-center w-full h-full bg-slate-200/70'><Loader className='w-20 h-20' /></div>}
            <Input
                label="username"
                placeholder="Enter your new username"
                register={register}
                showLabel={true}
                showErr={true}
                err={errors?.username}
            />
            <Textarea
                label="bio"
                placeholder="Enter your bio"
                register={register}
                showLabel={true}
                showErr={true}
                err={errors?.bio}
            />
            <Textarea
                label="qualifications"
                placeholder="Enter your qualifications. (add , between two or more)"
                register={register}
                showLabel={true}
                showErr={true}
                err={errors?.qualifications}
            />
            <div>
                <label className="block mb-1 text-sm font-medium">Social Links</label>
                <div className="space-y-2">
                    <Input
                        placeholder="Twitter URL"
                        label="twitter"
                        register={register}
                        showLabel={false}
                    />
                    <Input
                        placeholder="LinkedIn URL"
                        label="linkedIn"
                        register={register}
                        showLabel={false}
                    />
                </div>
            </div>
            <Input
                label="website"
                placeholder="Enter your website"
                register={register}
                showLabel={true}
            />
            <Button className="text-sm mx-auto" type="submit">
                Save Changes
            </Button>
        </form>
    )
};

interface IProfileView {
    teacher: ITeacher;
    setIsEditing: (value: boolean) => void;
}
const ProfileView = ({ teacher, setIsEditing }: IProfileView) => {
    return (
        <div className="space-y-4">
            <div>
                <h3 className="mb-2 font-semibold">Bio</h3>
                <p className="text-gray-600">{teacher?.bio}</p>
            </div>
            <div>
                <h3 className="mb-2 font-semibold">Qualifications</h3>
                <p className="text-gray-600">{teacher?.qualifications}</p>
            </div>
            <div>
                <h3 className="mb-2 font-semibold">Social Links</h3>
                <div className="flex gap-4">
                    {teacher?.socialLinks && Object.entries(teacher?.socialLinks)?.map(([platform, url]) => (
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
            <Button
                variant="outline"
                className="text-xs"
                onClick={() => setIsEditing(true)}
            >
                Edit Profile
            </Button>
        </div>
    )
};

export default ProfileTab;