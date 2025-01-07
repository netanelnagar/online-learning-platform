import { ExternalLink } from "lucide-react";
import { ITeacher as interTeacher} from "../types/types";


interface ITeacher {
  // teacher: interTeacher;
}
export default function Teacher({}: ITeacher) {
  const [teacher, setTeacher] = useState<>(null)
  return (
      <div className="mx-auto px-4 py-8 container">
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <div className="flex md:flex-row flex-col items-center md:items-start gap-8">
            <img
              src={teacher.profilePicture}
              alt={teacher.username}
              className="rounded-full w-32 h-32 object-cover"
            />
            <div className="flex-1">
              <h2 className="mb-2 font-bold text-2xl">{teacher.username}</h2>
              <p className="mb-4 text-gray-600">{teacher.email}</p>
              <p className="mb-6 text-gray-800">{teacher.bio}</p>
              <div className="mb-6">
                <h3 className="mb-2 font-semibold text-lg">Qualifications</h3>
                <div className="flex flex-wrap gap-2">
                  {teacher.qualifications.map((qual, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {qual}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                {Object.entries(teacher.socialLinks).map(([platform, link]) => (
                  <a
                    key={platform}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="mr-1 w-5 h-5" />
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
