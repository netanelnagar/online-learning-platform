import ReactDOM from 'react-dom/client';
import { ToastComponent } from './Context/Toast.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './Pages/Layout.tsx';
import { PrimeReactProvider } from 'primereact/api';
import { StrictMode } from 'react';
import './index.css';
// import "bootstrap-icons/font/bootstrap-icons.min.css";
// import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Provider } from 'react-redux';
import { store } from './redux/app/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <ToastComponent>
          <Provider store={store}>
            <Layout />
          </Provider>
        </ToastComponent>
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>
  ,
)

