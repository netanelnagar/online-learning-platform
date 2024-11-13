import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
import toastContext from './ToastContext';
// import {  toast } from 'react-toastify';


interface IProps {
    children: React.JSX.Element;
}
//<Toast | null>

export default function ToastComponent(props: IProps) {
    // const toast2 = useRef<typeof toast | null>(toast);
    const toast = useRef<Toast | null>(null);
    return (
        <toastContext.Provider value={toast}>
            {props.children}
        </toastContext.Provider>
    )
}
