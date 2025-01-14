import { lazy, Suspense, useState } from "react";
import { Toast } from "primereact/toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { useToast } from "../Context/Toast";
import Header from "./Header";
import Home from "./Home";
import Loader from "../Ui/Loader";
import { student, course } from "./providers";
import { Contact } from "./Contact";

const SignIn = lazy(() => import("./SignIn"));
const SignUp = lazy(() => import("./SignUp"));
const PageNotFound = lazy(() => import("./PageNotFound"));
const Courses = lazy(() => import("./Courses"));
const Teachers = lazy(() => import("./Teachers"));
const Course = lazy(() => import("./Course"));
const Teacher = lazy(() => import("./Teacher"));
const Student = lazy(() => import("./Student"));

export function Layout(): JSX.Element {
  const toast = useToast();
  const [search, setSearch] = useState("");

  return (
    <div className="grid grid-rows-[auto,1fr] w-full h-dvh">
      <Toast ref={toast} />
      <Header search={search} setSearch={setSearch} />
      <Suspense fallback={<div className="flex m-auto"><Loader className='w-28 h-28'/></div>}>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<Course {...course}  />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/student" element={<Student student={student}/>} />
          <Route path="/teachers/:id" element={<Teacher />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}


