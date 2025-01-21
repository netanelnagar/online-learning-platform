
export default function Footer() {
  return (
    <footer className="py-4 text-black shadow-card">
      <div className="container flex items-center justify-between px-4 mx-auto">
        <p className="text-sm">Developed by Netanel Nagar</p>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-sm text-gray-300 hover:text-white">My LinkIn</a></li>
            <li><a href="#" className="text-sm text-gray-300 hover:text-white">My GitHub</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

