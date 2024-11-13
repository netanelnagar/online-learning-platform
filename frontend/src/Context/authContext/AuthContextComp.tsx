import { useState } from 'react';
import { authContext } from './authContext';

interface IPropsAuthContextComp {
    children: JSX.Element;
}

export default function AuthContextComp(props: IPropsAuthContextComp) {
    const [user, setUser] = useState<null | object>(null);
    return (
        <authContext.Provider value={{ user, setUser }}>
            {props.children}
        </authContext.Provider>
    )
}
