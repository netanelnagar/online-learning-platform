import { IStudent as IS } from "../types/types";

interface IStudent {
    student: IS;
}
export default function Student({student}: IStudent) {
  return (
    <div className="mx-auto px-4 py-8 container">
    <div className="bg-white shadow-lg p-8 rounded-lg">
      <div className="flex md:flex-row flex-col items-center md:items-start gap-8">
        <img
          src={student.profilePicture}
          alt={student.username}
          className="rounded-full w-32 h-32 object-cover"
        />
        <div className="flex-1">
          <h2 className="mb-2 font-bold text-2xl">{student.username}</h2>
          <p className="mb-6 text-gray-600">{student.email}</p>
          
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-semibold text-lg">Enrolled Courses</h3>
              <div className="space-y-2">
                {student.enrolledCourses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="bg-blue-500 mr-3 rounded-full w-2 h-2" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 font-semibold text-lg">Certificates</h3>
              <div className="space-y-2">
                {student.certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="bg-green-500 mr-3 rounded-full w-2 h-2" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
