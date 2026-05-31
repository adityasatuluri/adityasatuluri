import React from "react";
import "../App.css";
import { FaInstagram, FaLinkedinIn, FaBehance, FaGithub } from "react-icons/fa";
import { TbBrandGmail } from "react-icons/tb";
import GlitchGif from "../assets/verticalglitch.gif";

export default function Footer() {
  return (
    <div className="w-full bg-[#D90908] border-t-2 border-[#D90908] text-white font-bold py-10 px-6 sm:px-12 md:px-20 relative z-10 flex flex-col gap-10 overflow-hidden">
      
      {/* Glitch overlays */}
      <div
        className="absolute inset-0 z-0 w-full h-full mix-blend-screen opacity-50"
        style={{
          backgroundImage: `url(${GlitchGif})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom left",
        }}
      ></div>
      <div
        className="absolute inset-0 z-0 w-full h-full mix-blend-color-dodge opacity-50"
        style={{
          backgroundImage: `url(${GlitchGif})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        
        {/* Brand / Logo Area */}
        <div className="flex flex-col gap-2">
          <div className="text-3xl tracking-[0.2em] border-2 border-white px-6 py-2 inline-block z-10 text-white font-bold bg-black/20 backdrop-blur-sm">
            ADITYA SATULURI
          </div>
          <div className="text-sm tracking-widest opacity-90 mt-2 text-white">
            WEB & AI DEVELOPER _ DESIGNER
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-row flex-wrap gap-4 sm:gap-6 z-10">
          <a
            className="border-2 border-white p-4 text-white hover:bg-white hover:text-[#D90908] transition-colors duration-300 cursor-pointer flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm"
            href="https://www.linkedin.com/in/aditya-satuluri-a250a31a0/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="h-6 w-6" />
          </a>
          <a
            className="border-2 border-white p-4 text-white hover:bg-white hover:text-[#D90908] transition-colors duration-300 cursor-pointer flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm"
            href="https://www.behance.net/adityasatuluri"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
          >
            <FaBehance className="h-6 w-6" />
          </a>
          <a
            className="border-2 border-white p-4 text-white hover:bg-white hover:text-[#D90908] transition-colors duration-300 cursor-pointer flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm"
            href="https://www.instagram.com/aditya.satuluri/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="h-6 w-6" />
          </a>
          <a
            className="border-2 border-white p-4 text-white hover:bg-white hover:text-[#D90908] transition-colors duration-300 cursor-pointer flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm"
            href="https://www.github.com/adityasatuluri"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="h-6 w-6" />
          </a>
          <a
            className="border-2 border-white p-4 text-white hover:bg-white hover:text-[#D90908] transition-colors duration-300 cursor-pointer flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm"
            href="mailto:s.aditya.in@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <TbBrandGmail className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-white/50 relative z-10" />

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs tracking-widest gap-4 relative z-10 text-white">
        <div>&copy; {new Date().getFullYear()} ADITYA SATULURI. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-4">
          <span>SYS.STATUS: <span className="animate-pulse font-bold">ONLINE</span></span>
          <span>VER: <span className="font-bold">2.0.77</span></span>
        </div>
      </div>
    </div>
  );
}
