import { MouseEvent, useContext, useEffect, useState } from "react";
import { authContext } from "../Context/authContext/authContext";
import { useNavigate } from "react-router-dom";
import { IUsers } from "../Models/Models";
import axios from "axios";
import { appConfig } from "../config/appConfig";
import toastContext from "../Context/ToastContext/ToastContext";
import { Button } from "primereact/button";

import { DataView } from "primereact/dataview";
import { classNames } from "primereact/utils";
import { SelectButton } from "primereact/selectbutton";

export function Admin(): JSX.Element {
    const userContext = useContext(authContext);
    const toast = useContext(toastContext);
    const navigate = useNavigate();

    const [users, setUsers] = useState<IUsers[]>([]);

    const deleteUser = async (e: MouseEvent, _id: string) => {
        e.preventDefault();
        try {
            const res = await axios.delete(appConfig.delete + _id);
            // res.status == 200 && toast?.current?.success("User deleted successfully");
            toast?.current?.show({ severity: 'success', summary: 'Success', detail: `User deleted successfully` })

        } catch (error) {
            console.log(error)
        }
    }

    const toggleBlock = async (e: MouseEvent, _id: string) => {
        e.preventDefault();
        const config = { headers: { "Authorization": "Bearer " + userContext?.user?.token } }
        try {

            await axios.patch(appConfig.toggleBlock + _id, config);
            loadUsers();
        } catch (error) {

            toast?.current?.show({ severity: 'error', summary: 'Error', detail: `block state not updated` })
        }

    }


    const itemTemplate = (user: IUsers, index: number) => {
        return (
            <div className="col-12 p-4" key={user._id}>
                <div className={classNames('flex ', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="lg:w-2 w-4  shadow-2 border-round" src={`${appConfig.baseUrl}/images/${user.imageName}`} alt={user.imageName} />
                    <div className="flex flex-column lg:flex-row lg:align-items-center lg:justify-content-between w-10">
                        <div className="pl-4 w-6">
                            <h6>{user.username}</h6>
                            <Button className="mb-3 rounded-circle" severity="danger" rounded tooltipOptions={{ position: "bottom" }} tooltip="delete user" name={user._id} icon="pi pi-trash" onClick={(e) => deleteUser(e, user._id)}></Button>
                        </div>
                        <div className=" flex lg:justify-content-center lg:w-6 pl-4">
                            <SelectButton className="flex" value={user.blocked ? "Block" : "Unblock"} options={['Block', 'Unblock']} onClick={(e) => toggleBlock(e, user._id)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items: IUsers[]) => {
        if (!items || items.length === 0) return null;

        const list = items.map((user, index) => {
            return itemTemplate(user, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };

    const loadUsers = () => {
        const config = { headers: { "Authorization": "Bearer " + userContext?.user?.token } }
        axios.get(appConfig.users, config)
            .then(res => { setUsers(res.data) })
            .catch(err => { toast?.current?.show({ severity: 'error', summary: 'Error', detail: 'Unable loaded users' }) });
    }

    useEffect(() => {
        // if (!userContext?.user || userContext?.user?.role != "admin") {
        //     navigate("/user")
        // }
        loadUsers();
    }, []);

    return (
        <div className="full pt-5 flex-x">
            <h6 className="w-12 center">hey {userContext?.user?.username.toLocaleUpperCase()}</h6>
            <div className="Admin bg-light border rounded flex-x ">
                <DataView value={users} listTemplate={listTemplate} paginator rows={5} className="full" />
            </div>
        </div>
    );
}
