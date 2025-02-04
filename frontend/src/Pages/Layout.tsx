// import { ErrorBoundary } from "react-error-boundary";
import { lazy, Suspense, useState } from "react";
import { Toast } from "primereact/toast";
import { Navigate, Route, Routes, useRouteError } from "react-router-dom";
import { useToast } from "../Context/Toast";
import Header from "./Header";
import Home from "./Home";
import Loader from "../Components/Ui/Loader";
import { Contact } from "./Contact";
import { AuthenticatedUser, ProtectedRoute } from "../Components/ProtectedRoutes";
// import { ErrorBoundary } from "./ErrorBoundary";
// import {ErrorFallback} from "./ErrorBoundary";
// import { ErrorBoundary } from "react-error-boundary";
// import Footer from "./Footer";

const SignIn = lazy(() => import("./SignIn"));
const SignUp = lazy(() => import("./SignUp"));
const PageNotFound = lazy(() => import("./PageNotFound"));
const Courses = lazy(() => import("./Courses"));
const Teachers = lazy(() => import("./Teachers"));
const Course = lazy(() => import("./Course"));
const Teacher = lazy(() => import("./Teacher/Teacher"));
const Student = lazy(() => import("./Student/Student"));
const ShowTeacher = lazy(() => import("./Teacher"));

export function Layout(): JSX.Element {
  const toast = useToast();
  const [search, setSearch] = useState("");

  return (
    <div className="grid grid-rows-[auto,1fr] w-full h-dvh">
      <Toast ref={toast} />
      <Header search={search} setSearch={setSearch} />
      <Suspense fallback={<div className="flex m-auto"><Loader className='w-28 h-28' /></div>}>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<AuthenticatedUser><SignIn /></AuthenticatedUser>} />
          <Route path="/signup" element={<AuthenticatedUser><SignUp /></AuthenticatedUser>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<Course  />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teachers/:id" element={<ShowTeacher />} />
          <Route path="/teacher" ErrorBoundary={ErrorBoundary} element={<ProtectedRoute> <Teacher /></ProtectedRoute>} />
          <Route path="/user/student" element={<ProtectedRoute> <Student /></ProtectedRoute>} />
          <Route path="/user/teacher" element={<ProtectedRoute> <Teacher /></ProtectedRoute>} />
          <Route path="/error" element={<div><h1>אופס! אירעה שגיאה.</h1><p>נא לנסות שוב מאוחר יותר.</p></div>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      {/* </ErrorBoundary> */}
    </div>
  );
}


function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}