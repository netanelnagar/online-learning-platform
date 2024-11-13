import { useContext, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import "./Layout.css";
import { Toast } from "primereact/toast";
import welcomeImg from "../../images/welcome.gif";
import toastContext from "../../Context/ToastContext/ToastContext";
import { authContext } from "../../Context/authContext/authContext";

export function Layout(): JSX.Element {
  const toast = useContext(toastContext);
  const userContext = useContext(authContext);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(sessionStorage.getItem("user") as string);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setInterval(() => {
      const user = JSON.parse(sessionStorage.getItem("user") as string);

      if (user) {
        const now = Date.now();
        const second = (now - user.lastConnection) / 1000;
        second >= 60000 * 180 && sessionStorage.removeItem("user");
        console.log(
          "now: " + now,
          "last: " + user.lastConnection,
          "sum: " + second
        );
      }
    }, 60000);

    if (user) {
      delete user.lastConnection;
      userContext?.setUser(user);
    }
  }, []);

  return (
    <div className="full center">
      <Toast ref={toast} />
      {loading ? (
        <div className="startDiv center"><img src={welcomeImg} alt="" height={"400px"} width={"400px"} /></div>
      ) : (
        <>
          <header>
            <Header />
          </header>
          <main>
            <Main />
          </main>
        </>
      )}
    </div>
  );
}
