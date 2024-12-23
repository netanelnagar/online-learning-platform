import { NavLink } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { stopBubbling } from "../utils/utils";

const links = ["Home", "Courses", "Teachers", "Contact"];

interface IHeader {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
export function Header({ search, setSearch }: IHeader): JSX.Element {
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    input.current?.focus();
  }, [])


  return (
    <div className="w-full px-3 py-4 flex align-middle justify-around static">
      <button className="px-2 rounded lg:hidden" onClick={() => setOpen(o => !o)}><i className="bi bi-list text-3xl text-black"></i></button>
      <h1 className="text-2xl font-bold my-name text-sky-500">Smart</h1>
      <div className="hidden lg:flex flex-grow max-w-96 mx-4">
        <input ref={input}  type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-2 rounded-full bg-slate-100 text-black focus:outline-none focus:ring focus:ring-sky-300" />
      </div>
      <nav className="hidden lg:flex flex-wrap justify-center content-center ">
        {links.map((link) => (
          <NavLink to={`/${link.toLowerCase()}`} key={link} className="link mx-3 text-lg font-medium text-gray-600"  >
            {link}
          </NavLink>
        ))}
      </nav>
      <div className="flex space-x-2">
        <button className="hidden lg:block bg-white text-black border-2 border-black px-4 py-2 rounded">Login</button>
        <button className="hidden lg:block bg-black text-white px-4 py-2 rounded">Signup</button>
      </div>
      {/* mobile navbar  */}
      <nav className={`fixed top-0 left-0 h-full w-full bg-slate-300/25  transform transition-transform 
            duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}  z-30`} onClick={e => setOpen(open => !open)}>
        <div className="h-full min-w-64 w-2/3 bg-white shadow-lg flex flex-col space-y-4" onClick={stopBubbling}>
          <div className="h-16 grid place-items-center" ><p className="text-lg font-medium">Menu</p></div>
          <div className="mx-4">
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-2 rounded-full bg-slate-100 text-black focus:outline-none focus:ring focus:ring-sky-300" />
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0  p-2">
            <button className="bg-white text-black border-2 border-black px-4 py-2 rounded md:w-1/2">Login</button>
            <button className="bg-black text-white px-4 py-2 rounded md:w-1/2">Signup</button>
          </div>
          {links.map((link) => (
            <NavLink to={`/${link.toLowerCase()}`} key={link} className="link mx-3 text-lg font-medium text-gray-600 hover:bg-gray-100  transition-colors 
              duration-200" onClick={() => setOpen(o => !o)}>
              {link}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
