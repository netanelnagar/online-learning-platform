import { IStudent as IS } from "../types/types";
import { BookOpen, CirclePlus, Clock, Pencil, Trophy } from "lucide-react";
import { ProgressBar } from "primereact/progressbar";
import { TabPanel, TabView } from "primereact/tabview";
import Card, { specificCard } from "../Components/Ui/Card";
import Button from "../Components/Ui/Button";
import { ChangeEventHandler, useState } from "react";
import { Tooltip } from "primereact/tooltip";
import { Tabs } from "../Components/Ui/Tabs";

const inputLabels: ("Username" | "Email" | "Password" | "Confirm Password")[] = ["Username", "Email", "Password", "Confirm Password"];


interface IStudent {
  student: IS;
}
type Account = { username: string; email: string; password: string; confirmPassword: string; };
export default function Student({ student }: IStudent) {

  const [account, setAccount] = useState<Account>({ username: "", email: "", password: "", confirmPassword: "" });

  const enrolledCourses = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      progress: 75,
      nextLesson: "Advanced CSS Layouts",
      instructor: "John Doe"
    },
    {
      id: 2,
      title: "UX Design Fundamentals",
      progress: 45,
      nextLesson: "User Research Methods",
      instructor: "Jane Smith"
    }
  ];

  const cardsData = [
    { title: "Enrolled Courses", amount: enrolledCourses.length.toString(), color: "primary", icon: <BookOpen className="w-6 h-6 text-primary" /> },
    { title: "Learning Hours", amount: "24", color: "secondary", icon: <Clock className="w-6 h-6 text-secondary" /> },
    { title: "Certificates", amount: student.certificates.length.toString(), color: "neutral-800", icon: <Trophy className="w-6 h-6 text-neutral-800" /> }
  ];


  return (
    <div className="overflow-y-auto">
      <div className="container p-8 mx-auto lg:px-12">
        {/* <div className="p-8 bg-white rounded-lg shadow-lg"> */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="relative">
            <img
              src={"https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg"}
              alt={student?.username}
              className="object-cover w-32 h-32 rounded-full"
            />
            <CirclePlus className="absolute bottom-0 right-0 w-8 h-8 text-blue-900 bg-white rounded-full" onClick={(e) => console.log("first")} />
          </div>
          <div className="">
            <h2 className="mb-2 text-2xl font-bold">{student?.username}</h2>
            <p className="mb-6 text-gray-600">{student?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 my-8 md:grid-cols-3">
          {cardsData.map((data) => specificCard(data))}
        </div>
        <Tabs className="" tabs={[
          {
            label: "Courses", content: <div className="grid grid-cols-1 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex-1">
                      <h3 className="mb-2 text-xl font-semibold">{course.title}</h3>
                      <p className="mb-2 text-gray-500">Instructor: {course.instructor}</p>
                      <p className="text-sm text-gray-500">Next: {course.nextLesson}</p>
                    </div>
                    <div className="w-full md:w-48">
                      <p className="mb-2 text-sm text-gray-500">Progress</p>
                      <ProgressBar showValue={false} value={course.progress} className="h-5 bg-sky-200" color="rgb(14 165 233)" />
                      <p className="mt-1 text-sm text-right">{course.progress}%</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          },
          {
            label: "Edit Account", content: <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
              <Tooltip target=".edit" content={"Click To Save"} position="top" />
              {inputLabels.map((data) => input(data, account[correctKey(data) as keyof Account], (e) => setAccount({ ...account, [correctKey(data)]: e.target.value })))}
            </div>
          },
          {
            label: "Certificates", content: <>
              {student.certificates.length ? <div className="grid grid-cols-1 gap-6"></div> :
                <p className="text-center text-gray-500">No certificates found.</p>
              }
            </>
          }]} />

      </div>
      {/* </div> */}
    </div>

  )
}



function input(label: string, value?: string, onChange?: ChangeEventHandler<HTMLInputElement>) {
  return (
    <div className="relative flex flex-col gap-4 lg:col-start-1 lg:col-end-3" key={label}>
      <label className="font-medium">{label}</label>
      <input type={label === "Email" ? "email" : "text"} className="w-full px-4 py-2 text-black rounded-lg bg-slate-100 focus:ring focus:ring-sky-300 focus:outline-none" value={value} onChange={onChange} />
      <div className="right-[0px] bottom-[0px] absolute flex bg-blue-400 rounded-r-lg w-[40px] h-[40px] text-black edit">
        <Pencil className="w-6 h-6 m-auto" />
      </div>
    </div>
  )

}


function correctKey(data: string) {
  return data === "Confirm Password" ? "confirmPassword" : data.toLowerCase();

}