import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Components/Layout/Layout.tsx';
import ToastComponent from './Context/ToastContext/ToastComponent';
import "bootstrap-icons/font/bootstrap-icons.min.css";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { PrimeReactProvider } from 'primereact/api';
import AuthContextComp from './Context/authContext/AuthContextComp.tsx';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <PrimeReactProvider>
      <ToastComponent>
        <AuthContextComp>
          <Layout />
        </AuthContextComp>
      </ToastComponent>
    </PrimeReactProvider>
  </BrowserRouter>
  // </StrictMode>
  ,
)

