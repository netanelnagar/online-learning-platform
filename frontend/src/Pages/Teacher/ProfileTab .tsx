import { Dispatch, SetStateAction } from "react";
import Button from "../../Components/Ui/Button";
import Card from "../../Components/Ui/Card";
import { ITeacher } from "../../types/types";
import Input from "../../Components/Ui/Input";
import Textarea from "../../Components/Ui/Textarea";


interface IProfileTab {
    profile: ITeacher;
    isEditing: boolean;
    setProfile: Dispatch<SetStateAction<ITeacher | null>>;
    setIsEditing: (value: boolean) => void;
    handleProfileUpdate: () => void;
}

const ProfileTab = ({ profile, isEditing, setProfile, setIsEditing, handleProfileUpdate }: IProfileTab) => (
    <Card className="p-6">
        {isEditing ? (
            <EditProfileForm
                profile={profile}
                handleProfileUpdate={handleProfileUpdate}
                setIsEditing={setIsEditing}
                setProfile={setProfile}
            />
        ) : (
            <ProfileView profile={profile} setIsEditing={setIsEditing} />
        )}
    </Card>
);

interface IEditProfileForm {
    profile: ITeacher;
    setProfile: Dispatch<SetStateAction<ITeacher | null>>
    handleProfileUpdate: () => void;
    setIsEditing: (value: boolean) => void;
}

const EditProfileForm = ({ profile, setProfile, handleProfileUpdate }: IEditProfileForm) => (
    <div className="space-y-4 flex flex-col">
        <div>
            <label className="block mb-1 text-sm font-medium">Username</label>
            <Input
                value={profile?.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value } as ITeacher)}
            />
        </div>
        <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <Input
                type="email"
                value={profile?.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value } as ITeacher)}
            />
        </div>
        <div>
            <label className="block mb-1 text-sm font-medium">Bio</label>
            <Textarea
                value={profile?.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value } as ITeacher)}
            />
        </div>
        <div>
            <label className="block mb-1 text-sm font-medium">Qualifications</label>
            <Textarea
                value={profile?.qualifications.join(', ')}
                // TODO: need to convert e.target.value to array
                onChange={(e) => setProfile({ ...profile, qualifications: [e.target.value] } as ITeacher)}
            />
        </div>
        <div>
            <label className="block mb-1 text-sm font-medium">Social Links</label>
            <div className="space-y-2">
                <Input
                    placeholder="Twitter URL"
                    value={profile?.socialLinks?.twitter}
                    onChange={(e) => setProfile({
                        ...profile,
                        socialLinks: { ...profile?.socialLinks, twitter: e.target.value }
                    } as ITeacher)}
                />
                <Input
                    placeholder="LinkedIn URL"
                    value={profile?.socialLinks?.linkedin}
                    onChange={(e) => setProfile({
                        ...profile,
                        socialLinks: { ...profile?.socialLinks, linkedin: e.target.value }
                    } as ITeacher)}
                />
            </div>
        </div>
        <Button className="text-sm mx-auto" onClick={handleProfileUpdate}>
            Save Changes
        </Button>
    </div>
);

interface IProfileView {
    profile: ITeacher;
    setIsEditing: (value: boolean) => void;
}
const ProfileView = ({ profile, setIsEditing }: IProfileView) => (
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
                {profile?.socialLinks && Object.entries(profile?.socialLinks)?.map(([platform, url]) => (
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
);

export default ProfileTab;