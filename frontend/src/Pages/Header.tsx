import { NavLink } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { stopBubbling } from "../utils/utils";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const links = ["Home", "Courses", "Teachers", "Contact"];

interface IHeader {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
export default function Header({ search, setSearch }: IHeader): JSX.Element {
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);


  const loginClasses = 'bg-white text-black text-center border-2 border-black px-4 py-2 rounded';
  const sginupClasses = 'bg-black text-white text-center px-4 py-2 rounded';

  useEffect(() => {
    input.current?.focus();
  }, [])

  return (
    <div className="static flex justify-around px-3 py-4 w-full align-middle">
      <Menu className="lg:hidden text-3xl text-black" onClick={() => setOpen(o => !o)} />
      <h1 className="my-name font-bold text-2xl text-sky-500">EduPath</h1>
      <div className="lg:flex flex-grow hidden mx-4 max-w-96">
        <input ref={input} type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="bg-slate-100 px-4 py-2 rounded-full focus:ring focus:ring-sky-300 w-full text-black focus:outline-none" />
      </div>
      <nav className="lg:flex flex-wrap justify-center content-center hidden">
        {links.map((link) => (
          <NavLink to={`/${link.toLowerCase()}`} key={link} className="mx-3 font-medium text-gray-600 text-lg link"  >
            {link}
          </NavLink>
        ))}
      </nav>
      <div className="flex space-x-2">
        <Link to={"/login"} className={`hidden lg:block ${loginClasses}`}>Log In</Link>
        <Link to={"/signup"} className={`hidden lg:block ${sginupClasses}`}>Sign Up</Link>
      </div>
      {/* mobile navbar  */}
      <nav className={`fixed top-0 left-0 h-full w-full bg-slate-300/25  transform transition-transform 
            duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}  z-30`} onClick={() => setOpen(open => !open)}>
        <div className="flex flex-col space-y-4 bg-white shadow-lg w-2/3 min-w-64 h-full" onClick={stopBubbling}>
          <div className="place-items-center grid h-16" ><p className="font-medium text-lg">Menu</p></div>
          <div className="mx-4">
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="bg-slate-100 px-4 py-2 rounded-full focus:ring focus:ring-sky-300 w-full text-black focus:outline-none" />
          </div>
          <div className="flex md:flex-row flex-col md:space-x-2 space-y-2 md:space-y-0 p-2">
            <Link to={"/login"} className={`md:w-1/2 ${loginClasses}`}>Log In</Link>
            <Link to={"/signup"} className={`md:w-1/2 ${sginupClasses}`}>Sign Up</Link>
          </div>
          {links.map((link) => (
            <NavLink to={`/${link.toLowerCase()}`} key={link} className="hover:bg-gray-100 mx-3 font-medium text-gray-600 text-lg transition-colors duration-200 link" onClick={() => setOpen(o => !o)}>
              {link}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
