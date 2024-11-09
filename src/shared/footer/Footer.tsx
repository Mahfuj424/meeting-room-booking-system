import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaEnvelope, FaFacebook, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100  dark:bg-darkCard text-secondary dark:text-gray-300 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Logo & Description */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-1">
            <img
              src="https://i.ibb.co/3S7g2XP/room-Logo-2.png"
              alt="Logo"
              className="mb-4 w-16 h-16"
            />
            <h1 className="text-2xl font-semibold text-secondary dark:text-white mb-3">
              RoomEase
            </h1>
          </div>

          <div className="my-5 text-seconday">
            <p>
              Our hotels offer glamour and comfort that expands the imagination
              and cradles the spirit.
            </p>
          </div>
          <div className="mt-4">
            <button className="border border-gray-300 dark:border-gray-600 py-2 px-4 rounded text-sm">
              USD <i className="ml-2">▼</i>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-4 ">Quick Links</h2>
          <div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Reservation
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Offers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Room List
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* contact us */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-4 ">Contact-Us</h2>
          <div>
            <p className="mb-2">
              <FaMapMarkerAlt className="inline" /> 123 Street, Old Trafford, <br />
              New South London, UK
            </p>
            <p className="mb-2">
              <FaEnvelope className="inline" /> info@site.com
            </p>
            <p className="mb-2">
              <FaPhone className="inline" /> +017 88 372 355
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Newsletter</h2>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="w-full p-2 rounded-l border border-gray-300 dark:border-gray-600 dark:bg-darkCard dark:text-gray-300"
            />
            <button className="text-primary -ms-12 px-4 rounded-r">
              <FiSend className="text-xl" />
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="text-white rounded-full hover:text-opacity-80 p-2 bg-primary"
            >
              <FaFacebook className="text-3xl" />
            </a>
            <a
              href="#"
              className="text-white rounded-full hover:text-opacity-80 p-2 bg-primary"
            >
              <BsLinkedin className="text-3xl" />
            </a>
            <a
              href="#"
              className="text-white rounded-full hover:text-opacity-80 p-2 bg-primary"
            >
              <FaSquareXTwitter className="text-3xl" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-xs text-gray-500 dark:text-gray-400">
        &copy; 2024 Hotale Theme Demo - GoodLayers.{" "}
        <a href="#" className="hover:underline text-primary">
          Terms & Conditions.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
