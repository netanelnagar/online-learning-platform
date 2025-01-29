import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-4 text-black shadow-card">
      <div className="container flex items-center justify-evenly px-4 mx-auto">
        <p className="text-sm"> &copy; {new Date().getFullYear()} Developed by Netanel Nagar</p>
        <nav>
          <ul className="flex space-x-4">
            <li><a
              href="https://www.linkedin.com/in/netanel-n"
              target="_blank"
              className="text-sm text-black hover:text-black/50"
            ><Linkedin size={20} /></a></li>
            <li><a
              href="https://github.com/netanelnagar"
              target="_blank"
              className="text-sm text-black hover:text-black/50"
            ><Github size={20} /></a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

