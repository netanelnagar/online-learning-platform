import { Toast } from 'primereact/toast';
import { useContext, useRef } from 'react';
import { MutableRefObject, createContext } from "react";

const toastContext = createContext<MutableRefObject<Toast | null> | null>(null);


interface IProps {
    children: React.JSX.Element;
}

export function ToastComponent(props: IProps) {
    const toast = useRef<Toast | null>(null);
    return (
        <toastContext.Provider value= { toast } >
        { props.children }
        </toastContext.Provider>
    )
}

export function useToast() {
    const toast = useContext(toastContext);
    if (!toast) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return toast;
}