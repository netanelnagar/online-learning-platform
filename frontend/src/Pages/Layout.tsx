import {  useState } from "react";
import { Header } from "./Header";
// import { Main } from "./Main";
import { Toast } from "primereact/toast";

import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { useToast } from "../Context/Toast";

export function Layout(): JSX.Element {
  const toast = useToast();
const [search, setSearch] = useState("");
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   setInterval(() => {
  //     const user = JSON.parse(sessionStorage.getItem("user") as string);

  //     if (user) {
  //       const now = Date.now();
  //       const second = (now - user.lastConnection) / 1000;
  //       second >= 60000 * 180 && sessionStorage.removeItem("user");
  //       console.log(
  //         "now: " + now,
  //         "last: " + user.lastConnection,
  //         "sum: " + second
  //       );
  //     }
  //   }, 60000);

  //   if (user) {
  //     delete user.lastConnection;
  //     userContext?.setUser(user);
  //   }
  // }, []);

  return (
    <div className="w-full h-dvh grid grid-rows-[auto,1fr]">
      <Toast ref={toast} />
      <Header search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/user/*" element={<UserPage />} />
        <Route path="/memoryGame/*" element={<MemoryGamePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} /> */}
      </Routes>
    </div>
  );
}
