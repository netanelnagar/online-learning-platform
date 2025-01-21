import { NavLink } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { stopBubbling } from "../utils/utils";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Button from "../Components/Ui/Button";

const links = ["Home", "Courses", "Teachers", "Contact"];

interface IHeader {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
export default function Header({ search, setSearch }: IHeader): JSX.Element {
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);


  const loginClasses = 'bg-white text-black text-center border-2 border-black px-4 py-2 rounded';
  const signupClasses = 'bg-black text-white text-center px-4 py-2 rounded';

  useEffect(() => {
    input.current?.focus();
  }, [])

  return (
    <div className="static flex justify-around w-full px-3 py-4 align-middle shadow-button">
      <Menu className="text-3xl text-black lg:hidden" onClick={() => setOpen(o => !o)} />
      <Link to={"/home"} className="text-2xl font-bold my-name text-primary">EduPath</Link>
      <div className="flex-grow hidden mx-4 lg:flex max-w-96">
        <input ref={input} type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-2 text-black rounded-full bg-slate-100 focus:ring focus:ring-primary focus:outline-none" />
      </div>
      <nav className="flex-wrap content-center justify-center hidden lg:flex">
        {links.map((link) => (
          <NavLink to={`/${link.toLowerCase()}`} key={link} className="mx-3 text-lg font-medium text-gray-600 link"  >
            {link}
          </NavLink>
        ))}
      </nav>
      <div className="flex space-x-2">
        <Link to={"/login"} className={`hidden lg:block ${loginClasses}`}>Log In</Link>
        <Link to={"/signup"} className={`hidden lg:block ${signupClasses}`}>Sign Up</Link>
      </div>
      {/* mobile navbar  */}
      <nav className={`fixed top-0 left-0 h-full w-full bg-slate-300/25  transform transition-transform 
            duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}  z-30`} onClick={() => setOpen(open => !open)}>
        <div className="flex flex-col w-2/3 h-full space-y-4 bg-white shadow-lg min-w-64" onClick={stopBubbling}>
          <div className="grid h-16 place-items-center" ><p className="text-lg font-medium">Menu</p></div>
          <div className="mx-4">
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-2 text-black rounded-full bg-slate-100 focus:ring focus:ring-sky-300 focus:outline-none" />
          </div>
          <div className="flex flex-col p-2 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <Link to={"/login"} onClick={() => setOpen(false)} className={`md:w-1/2 ${loginClasses}`}>Log In</Link>
            <Link to={"/signup"} onClick={() => setOpen(false)} className={`md:w-1/2 ${signupClasses}`}>Sign Up</Link>
          </div>
          {links.map((link) => (
            <NavLink to={`/${link.toLowerCase()}`} key={link} className="mx-3 text-lg font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 link" onClick={() => setOpen(false)}>
              {link}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
