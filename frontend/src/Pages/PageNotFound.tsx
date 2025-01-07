import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-full page-not-found" >
      <div className="text-center">
        <h1 className="mb-4 font-bold text-6xl text-gray-800">404</h1>
        <h2 className="mb-6 text-2xl text-white">Page not found</h2>
        <p className="mb-8 text-lg text-white">Sorry, we couldn't find the page you're looking for.</p>
        <button
          onClick={() => navigate(-1)}
          className="flex justify-center gap-2 w-full font-bold text-white"
        >
          <ArrowLeftIcon /> Go Back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound