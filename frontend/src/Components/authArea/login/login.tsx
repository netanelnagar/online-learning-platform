import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import "./login.css";
import toastContext from '../../../Context/ToastContext/ToastContext';
import axios, { AxiosError } from 'axios';
import { IUser } from '../../../Models/Models';
import { appConfig } from '../../../config/appConfig';
import { authContext } from '../../../Context/authContext/authContext';
// import { Flip, Slide, Zoom } from 'react-toastify';

export function Login(): JSX.Element {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const toast = useContext(toastContext);
    // toast?.current?.show({ severity: 'success', summary: 'Success', detail: `Login attempt with: ${username}` })

    const userContext = useContext(authContext);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            // toast?.current?.error("Please enter both username and password.")
            toast?.current?.show({ severity: 'error', summary: 'Error', detail: 'Please enter both username and password.' })
            return;
        }

        try {

            const response = await axios.post(appConfig.login, { username: username, password: password });
            const user: IUser = { ...response.data.user, token: response.data.token };
            userContext?.setUser(user);
            sessionStorage.setItem('user', JSON.stringify({ ...user, lastConnection: Date.now() }));
            // user.token && toast?.current?.success(`Login attempt with: ${username}`)
            user.token && toast?.current?.show({ severity: 'success', summary: 'Success', detail: `Login attempt with: ${username}` })
            navigate("/GamesApp");
        } catch (error: AxiosError | any) {
            console.log(error);
            // error.response.data && toast?.current?.error(`${error.response.data}`)

            error.response.data && toast?.current?.show({ severity: 'error', summary: 'Error', detail: `${error.response.data}` })
        }
    };


    return (
        <div className="w-100 flex justify-content-center">
            <Card title="Login" className="shadow md:w-30rem mt-4">
                <form onSubmit={handleLogin}>
                    <div className="mb-6">
                        <FloatLabel>
                            <label htmlFor="username" className="form-label">Username</label>
                            <InputText
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className=" p-inputtext-lg w-full"
                            />
                        </FloatLabel>
                    </div>
                    <div className="mb-6">
                        <FloatLabel>
                            <label htmlFor="password" className="form-label">Password</label>
                            <InputText
                                id="password"
                                value={password}
                                minLength={6}
                                onChange={(e) => setPassword(e.target.value)}
                                type='password'
                                className=" p-inputtext-lg w-full"
                            />
                        </FloatLabel>
                    </div>
                    <Button type="submit" label="Login" className="bt w-full" />
                </form>
                <div className="mt-6 text-center" >
                    <p>Don't have an account? <Link to="/auth/register" className='text-blue-500'>Register here</Link></p>
                </div>
            </Card>
        </div>

    );
}

