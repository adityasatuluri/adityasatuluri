import React from "react";
import "../App.css";
import { MdArrowOutward } from "react-icons/md";
import { FaInstagram, FaLinkedinIn, FaBehance, FaGithub } from "react-icons/fa";
import { TbBrandGmail } from "react-icons/tb";

import LogoBg from "../assets/logo_bg.svg";
import RedBg from "../assets/red-bg.webp";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // ✅ check screen size
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="w-full h-[50vh] flex flex-col items-center justify-center custom-border text-[#f0f0f0] jura-font font-bold bg-cover bg-center bg-no-repeat relative z-0"
      style={{
        backgroundImage: `url(${RedBg})`,
      }}
    >
      <div className="relative flex flex-col items-center justify-center text-center gap-3 grain w-full h-[90vh]">
        {/* Image in background */}
        <img
          src={LogoBg}
          alt="Filler"
          className="absolute inset-0 w-[40vh] h-[40vh] m-auto opacity-20 z-0"
        />

        {/* Text in front */}
        <div className="flex items-center justify-center text-6xl sm:text-5xl md:text-7xl lg:text-9xl tracking-wide relative z-10 lg:mb-0 mb-8">
          ADITYA SATULURI
        </div>

        {!isMobile ? (
          <div className="w-full pl-43 pr-46 pt-4 flex flex-row lg:flex-row justify-center items-center z-90">
            <div className="flex flex-row lg:gap-15 md:gap-6 sm:gap-4  mb-4 lg:mb-0">
              <a
                className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
                href="https://www.linkedin.com/in/aditya-satuluri-a250a31a0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:border-b">LINKEDIN</span>
                <MdArrowOutward className="h-5 w-5" />
              </a>
              <a
                className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
                href="https://www.behance.net/adityasatuluri"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:border-b">BEHANCE</span>
                <MdArrowOutward className="h-5 w-5" />
              </a>

              <a
                className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
                href="https://www.instagram.com/aditya.satuluri/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:border-b">INSTAGRAM</span>
                <MdArrowOutward className="h-5 w-5" />
              </a>
              <a
                className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
                href="https://www.github.com/adityasatuluri"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:border-b">GITHUB</span>
                <MdArrowOutward className="h-5 w-5" />
              </a>
              <a
                className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
                href="mailto:s.aditya.in@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="hover:border-b">EMAIL</span>
                <MdArrowOutward className="h-5 w-5" />
              </a>
            </div>
            {/* {!isMobile ? (
              <a
                className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="hover:border-b">BACK TO TOP</span>
              </a>
            ) : (
              <></>
            )} */}
          </div>
        ) : (
          <div className="flex flex-row gap-8 justify-center items-center w-full z-90">
            <a
              className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
              href="https://www.linkedin.com/in/aditya-satuluri-a250a31a0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="h-8 w-8 object-contain" />
            </a>{" "}
            <a
              className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
              href="https://www.behance.net/adityasatuluri"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaBehance className="h-8 w-8 object-contain" />
            </a>{" "}
            <a
              className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
              href="https://www.instagram.com/aditya.satuluri/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="h-8 w-8 object-contain" />
            </a>
            <a
              className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
              href="https://www.github.com/adityasatuluri"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="h-8 w-8 object-contain" />
            </a>
            <a
              className="flex flex-row text-white hover:text-red-600 transition-colors duration-300 cursor-pointer"
              href="mailto:s.aditya.in@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TbBrandGmail className="h-8 w-8 object-contain" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
