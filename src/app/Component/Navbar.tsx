"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebook ,FaInstagram ,FaLinkedinIn} from "react-icons/fa";

export default function Navbar() {
  const [currentdatetime, setcurrentdatetime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setcurrentdatetime(now.toLocaleString("en-US", options));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="text-gray-400 body-font shadow-lg bg-gray-100">
      <div className="container mx-auto flex  flex-row  justify-around items-center p-4 gap-5">
        <div className="flex-1 text-black">
          <span>{currentdatetime}</span>
        </div>

        <nav className="flex gap-6 items-center justify-center text-black font-semibold">
          <Link
            href="/"
            className="hover:text-blue-500 transition-colors duration-300 transform hover:scale-105"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-blue-500 transition-colors duration-300 transform hover:scale-105"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="hover:text-blue-500 transition-colors duration-300 transform hover:scale-105"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="hover:text-blue-500 transition-colors duration-300 transform hover:scale-105"
          >
            Contact
          </Link>
        </nav>
        <div className="flex text-black flex-row space-x-3 text-lg justify-center items-center p-4">
            <a href="/">
            <FaFacebook /> </a>
            <a href="/"> <FaInstagram />
            </a>
            <a href="/"> <FaLinkedinIn />
            </a>
        </div>
      </div>
    </header>
  );
}
