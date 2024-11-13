import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css";
import { useContext, useState } from 'react';
import toastContext from '../../../Context/ToastContext/ToastContext';
import axios, { AxiosError } from 'axios';
import { appConfig } from '../../../config/appConfig';
import { IUser } from '../../../Models/Models';
import { authContext } from '../../../Context/authContext/authContext';

export function Register(): JSX.Element {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const navigate = useNavigate();

    const userContext = useContext(authContext);

    const toast = useContext(toastContext);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image as File);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        try {

            const response = await axios.post(appConfig.register, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-rapidapi-host": "file-upload8.p.rapidapi.com",
                    "x-rapidapi-key": "your-rapidapi-key-here",
                },
            });
            console.log(response)
            const user: IUser = { ...response.data.user, token: response.data.token };
            // toast?.current?.success(`successful register ${user.username}`);
            toast?.current?.show({ severity: "success", summary: 'Success', detail: `successful register ${user.username}` });
            userContext?.setUser(user);
            sessionStorage.setItem('user', JSON.stringify({ ...user, lastConnection: Date.now() }));
            navigate('/gamesApp')

        } catch (error: AxiosError | any) {
            console.log(error);
            // error.response.data && toast?.current?.error(`${error.response.data}`)
            error.response.data && toast?.current?.show({ severity: 'error', summary: 'Error', detail: `${error.response.data}` })
        }
    };

    const onImageUpload = (event: FileUploadSelectEvent) => {
        if (event.files && event.files[0]) {
            setImage(event.files[0]);
            // toast?.current?.success( `Uploaded image ${event.files[0].name}`)
            toast?.current?.show({ severity: "success", summary: 'Success', detail: `Uploaded image ${event.files[0].name}` })
        }
    };

    return (
        <div className="w-100 flex justify-content-center pb-5">
            <Card title="Register" className="shadow md:w-30rem mt-4">
                <form onSubmit={handleRegister} className="mb-3">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-inputtext-lg"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <InputText
                            id="email"
                            value={email}
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-inputtext-lg"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <Password
                            id="password"
                            value={password}
                            minLength={6}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleMask
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Profile Image</label>
                        <FileUpload
                            mode="basic"
                            name="image"
                            accept="image/*"
                            maxFileSize={10000000}
                            onSelect={onImageUpload}
                            className="form-control"
                        />
                    </div>
                    <Button type="submit" label="Register" className="mt-3 w-full"  size="large"/>
                </form>
                <div className=" text-center">
                    <p>Already have an account? <Link to="/auth" className='text-blue-500'>Login here</Link></p>
                </div>
            </Card>
        </div>
    );
}
