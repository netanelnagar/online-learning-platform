import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home/Home";
import MemoryGamePage from "../Pages/MemoryGamePage";
import { About } from "../About/About";
import AuthPage from "../Pages/AuthPage";
import UserPage from "../Pages/UserPage";
import { Admin } from "../Admin/Admin";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/gamesApp"}/>} />
            <Route path="/gamesApp" element={<Home />} />
            <Route path="/auth/*" element={<AuthPage />} />
            <Route path="/user/*" element={<UserPage />} />
            <Route path="/memoryGame/*" element={<MemoryGamePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    );
}
