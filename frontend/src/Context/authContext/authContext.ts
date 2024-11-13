import { Dispatch, SetStateAction, createContext } from "react";
import { IUser } from "../../Models/Models";


//add type to user context
export const authContext = createContext<{user: null | IUser, setUser: Dispatch<SetStateAction<IUser | null>>}|null>(null)