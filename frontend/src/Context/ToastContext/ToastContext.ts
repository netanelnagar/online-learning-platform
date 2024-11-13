import { MutableRefObject, createContext } from "react";
import { Toast } from "primereact/toast"
// import {  toast } from 'react-toastify';


// const toastContext = createContext<React.MutableRefObject<typeof toast | null> | null>(null);
const toastContext = createContext<MutableRefObject<Toast | null> | null>(null);

export default toastContext;