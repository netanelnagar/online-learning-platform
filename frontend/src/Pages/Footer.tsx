import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 py-8 text-white">
      <div className="flex md:flex-row flex-col justify-between items-center mx-auto container">
        <div className="mb-6 md:mb-0">
          <h2 className="mb-2 font-bold text-xl">Contact Us</h2>
          <p>Email: <a href="mailto:your-email@example.com" className="hover:text-gray-300 underline">your-email@example.com</a></p>
          <p>Phone: <a href="tel:+1234567890" className="hover:text-gray-300 underline">+123 456 7890</a></p>
        </div>
        <div className="mb-6 md:mb-0">
          <h2 className="mb-2 font-bold text-xl">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" className="transform transition-transform hover:scale-125"><i className="text-3xl fa-facebook-square fab"></i></a>
            <a href="https://www.twitter.com" className="transform transition-transform hover:scale-125"><i className="text-3xl fa-twitter-square fab"></i></a>
            <a href="https://www.linkedin.com" className="transform transition-transform hover:scale-125"><i className="text-3xl fa-linkedin fab"></i></a>
          </div>
        </div>
        <div className="mb-6 md:mb-0">
          <h2 className="mb-2 font-bold text-xl">Quick Links</h2>
          <ul>
            <li><a href="/" className="hover:text-gray-300 hover:underline">Home</a></li>
            <li><a href="/courses" className="hover:text-gray-300 hover:underline">Courses</a></li>
            <li><a href="/about" className="hover:text-gray-300 hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-300 hover:underline">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2025 Courses Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
