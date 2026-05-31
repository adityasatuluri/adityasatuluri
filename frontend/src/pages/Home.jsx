import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { Link, useLocation } from "react-router-dom";

import { motion, AnimatePresence, easeInOut } from "motion/react";

import BlurText from "../components/Blurtext.jsx";

const WhiteBg = new URL("../assets/WhiteBg.webp", import.meta.url).href;
const WhiteBgM = new URL("../assets/WhiteBgM.webp", import.meta.url).href;
import morning from "../assets/cy-city-morning.webp";
import night from "../assets/cy-city.webp";
const item2077 = new URL("../assets/item2077.webp", import.meta.url).href;

import ShinyText from "../components/ShinyText.jsx";
// import item2077 from "../assets/item2077.png";
import GlitchGif from "../assets/verticalglitch.gif";
import { IoIosArrowDown } from "react-icons/io";
import "../App.css";
import Inspiration from "../assets/cy-bw.webp";
import Inspiration2 from "../assets/bw2.webp";
import Footer from "../components/Footer.jsx";
import projectsData from "../assets/projects.json";
import { MdArrowUpward } from "react-icons/md";
import ScrollToTop from "react-scroll-to-top";
import { RiCloseLargeFill } from "react-icons/ri";
import Artworks from "../components/Artworks.jsx";
import Contact from "../components/Contact.jsx";

export default function Home({ setMenuItem }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState();
  const [cityBg, setCityBg] = useState(night);
  const cityRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = {
    "Programming Languages": ["HTML", "CSS", "JavaScript", "Python", "Java"],
    "Frameworks/Libraries": ["React", "Express", "Spring Boot", "Streamlit"],
    Databases: ["MongoDB", "Prisma DB", "MySQL"],
    "Cloud & DevOps": [
      "AWS",
      "Docker",
      "Kubernetes",
      "Ansible",
      "Git",
      "CI/CD Pipelines",
    ],
    Design: ["Adobe Suite", "Figma", "Blender", "Unreal Engine"],
  };

  const colors = {
    HTML: "#FF5733",
    CSS: "#2965F1",
    JavaScript: "#F7DF1E",
    Python: "#3776AB",
    Java: "#E34C26",
    React: "#61DAFB",
    Express: "#30C9AA",
    "Spring Boot": "#6DB33F",
    Streamlit: "#FF4B4B",
    MongoDB: "#47A248",
    "Prisma DB": "#0C344B",
    MySQL: "#00758F",
    AWS: "#FF9900",
    Docker: "#2496ED",
    Kubernetes: "#326CE5",
    Ansible: "#EE0000",
    Git: "#F05032",
    "CI/CD Pipelines": "#00C7B7",
  };

  const experience = [
    {
      date: "JUN 2023 - PRESENT",
      place: "FREELANCE",
      title: "GRAPHIC DESIGNER",
      description:
        "Created a range of designs including **posters**, **NFTs**, **3D art**, and **animations** using **Adobe Suite**, **Blender**, and **Unreal Engine**.",
      skills: "Adobe Suite, Blender, Unreal Engine",
    },
    {
      date: "FEB 2025 - MAY 2025",
      place: "DRDO, IN",
      title: "DEVELOPER INTERN",
      description: [
        "Contributed to the development of **OIL-AGenT**, a real-time testbed framework for automating **On-Board Computer (OBC)** software validation in **avionics**.",
        "Developed desktop software using **C++**, **Python**, and **PySide6** to design and implement an interactive UI for **scheduling**, **executing**, and **monitoring** simulation runs.",
        "Assisted in setting up **API endpoints** and database interactions using **Prisma ORM**, **MariaDB**, and **Express.js**.",
      ],

      skills: "Python, PySide6, Prisma DB, C, Express JS",
    },
  ];

  function HighlightedText({ text }) {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <span key={i} className="text-[#797979] font-semibold">
          {part.replace(/\*\*/g, "")}
        </span>
      ) : (
        part
      )
    );
  }

  const modules = import.meta.glob("/public/artworks/*.webp", {
    eager: true,
  });

  // Extract paths
  const artworks = Object.values(modules).map((mod) => mod.default);

  const categoryRefs = useRef([]);
  const skillsTitleRef = useRef(null);
  const [currentCategory, setCurrentCategory] = React.useState("");
  const [currentSkills, setCurrentSkills] = React.useState("");

  const projects = projectsData.projects;
  const NN = morning;

  useEffect(() => {
    const handleScroll = () => {
      if (!cityRef.current) return;

      const rect = cityRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // ✅ progress: 0 when top enters, 1 when bottom leaves
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (rect.height + windowHeight), 0),
        1
      );

      // thresholds for swapping backgrounds
      if (progress <= 0.55) setCityBg(night);
      else if (progress > 0.55) setCityBg(NN);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile Width Detection
  useEffect(() => {
    // ✅ check screen size
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md breakpoint
    checkMobile();
    const checkMobileWidth = () => {
      setMobileWidth(window.innerWidth);
      // console.log(window.innerWidth);
    }; // md breakpoint
    checkMobileWidth();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("resize", checkMobileWidth);
    return () => window.removeEventListener("resize", checkMobileWidth);
  }, []);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(
      "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0
    );
  }, []);

  const location = useLocation(); // Get URL info (including hash)
  const featuredWorksRef = useRef(null); // Ref for the Featured Work section
  const ArtworksRef = useRef(null); // Ref for the Artworks section
  const ArtworksMobileRef = useRef(null);
  const HomeRef = useRef(null);
  const SkillsRef = useRef(null);
  const WorkRef = useRef(null);
  const ContactRef = useRef(null);
  const OtherRef = useRef(null); //Dummy ref to de-highlight the menu item.

  // Scroll to section when hash is present
  // In Home.jsx, replace the scroll useEffect
  useEffect(() => {
    if (location.hash === "#featured-works" && featuredWorksRef.current) {
      featuredWorksRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start", // Changed to "start" to align top of section
        inline: "nearest",
      });
    } else if (location.hash === "#artworks" && ArtworksRef.current) {
      ArtworksRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "end",
      });
    } else if (
      location.hash === "#artworks-mobile" &&
      ArtworksMobileRef.current
    ) {
      ArtworksMobileRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "end",
      });
    } else if (location.hash === "#home" && HomeRef.current) {
      HomeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    } else if (location.hash === "#skills" && SkillsRef.current) {
      SkillsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else if (location.hash === "#career" && WorkRef.current) {
      WorkRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else if (location.hash === "#contact" && ContactRef.current) {
      ContactRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [location.hash]);

  useEffect(() => {
    const sections = [
      { ref: HomeRef, name: "Home" },
      { ref: featuredWorksRef, name: "Projects" },
      { ref: SkillsRef, name: "Skills" },
      { ref: WorkRef, name: "Work" },
      { ref: ArtworksRef, name: "Artworks" },
      { ref: ArtworksMobileRef, name: "ArtworksMobile" },
      { ref: ContactRef, name: "Contact" },
      { ref: OtherRef, name: "Other" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find(
              (s) => s.ref.current === entry.target
            );
            if (section && section.name != "Other") {
              setMenuItem(section.name);
            } else null;
          }
        });
      },
      { threshold: 0.8 } // adjust sensitivity (80% of section visible)
    );

    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });

    return () => observer.disconnect();
  }, [setMenuItem]);

  return (
    // <MomentumScroll>
    <div className="w-full bg-[#030303] relative">
      <ScrollToTop
        smooth
        component={<MdArrowUpward size={30} color="white" />}
        style={{
          backgroundColor: "red",
          borderRadius: "50%",
          padding: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          zIndex: 900,
        }}
      />
      {/* Hero Section */}
      <div
        id="home"
        ref={HomeRef}
        className="relative  flex flex-col items-center justify-center text-center grain min-h-[50vh] sm:min-h-[90vh] md:min-h-[60vh] lg:min-h-[90vh]"
      >
        <div className="absolute inset-0 z-0">
          {/* background at the very back */}
          <Suspense
            fallback={
              <div
                className="absolute inset-0 z-0 w-full h-full bg-red-600"
                style={{
                  backgroundSize: !isMobile ? "cover" : "cover",
                  backgroundPosition: isMobile ? "bottom" : "bottom left",
                  backgroundAttachment: isMobile ? "fixed" : "fixed",
                }}
              ></div>
            }
          >
            <div
              className="absolute inset-0 z-1 w-full h-full"
              style={{
                backgroundImage: !isMobile
                  ? `url(${WhiteBg})`
                  : `url(${WhiteBgM})`,
                backgroundSize: !isMobile ? "cover" : "cover",
                backgroundPosition: isMobile ? "bottom" : "bottom left",
                backgroundAttachment: isMobile ? "fixed" : "fixed",
              }}
            ></div>
          </Suspense>

          <div
            className="absolute inset-0 z-0 w-full h-full bg-red-600"
            style={{
              backgroundSize: !isMobile ? "cover" : "cover",
              backgroundPosition: isMobile ? "bottom" : "bottom left",
              backgroundAttachment: isMobile ? "fixed" : "fixed",
            }}
          ></div>

          {/* ModelViewer*/}
          {/* <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div>Loading...</div>
              </div>
            }
          >
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 0.6, filter: "blur(0px)" }}
              transition={{ duration: 3, ease: easeInOut }}
              className="w-full h-full relative z-12 mix-blend-darken"
            >
              <ModelViewer url={Johnny} width={"100vw"} height={"100vh"} />
            </motion.div>
          </Suspense> */}

          <Suspense fallback={<></>}>
            <div
              className="absolute inset-0 z-15 w-full h-full "
              style={{
                backgroundImage: `url(${item2077})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                backgroundAttachment: "",
              }}
            ></div>
          </Suspense>

          {/* Glitch overlay above everything */}
          <div
            className="absolute inset-0 z-10 w-full h-full mix-blend-screen"
            style={{
              backgroundImage: `url(${GlitchGif})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom left",
              backgroundAttachment: "fixed",
            }}
          ></div>
          <div
            className="absolute inset-0 z-10 w-full h-full mix-blend-color-dodge"
            style={{
              backgroundImage: `url(${GlitchGif})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          ></div>
        </div>
        {/* )} */}

        {/* Hero Text - always above */}
        <div className="gap-4 relative z-20 select-none" style={{ gap: "2px" }}>
          {/* drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] */}
          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: easeInOut }}
            className="mt-10 lg:m-0 text-[#f0f0f0]  abnes font-bold text-shadow-md  leading-tight 
          text-[7vh] sm:text-[7vh] md:text-[8vh] lg:text-[10vw]"
          >
            ADITYA
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: easeInOut }}
            className="m-0 text-[#f0f0f0] abnes font-bold text-shadow-md  leading-10 md:leading-20 lg:leading-28 
          text-[5vh] sm:text-[7vh] md:text-[6vh] lg:text-[10vw] "
          >
            SATULURI
          </motion.h1>
        </div>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: easeInOut }}
          className="select-none relative z-20 mt-5 sm:mt-10 md:mt-15 lg:mt-20 mb-10 p-5 text-white tracking-[.3em] lg:tracking-[.6em] font-normal uppercase leading-tight text-[1.5vh] sm:text-[1.8vh] md:text-[2vh] lg:text-[2vh]"
        >
          WEB & AI DEVELOPER _ DESIGNER
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="absolute bottom-10 z-20 flex flex-col items-center justify-center animate-bounce text-black"
        >
          <IoIosArrowDown className="text-2xl sm:text-lg lg:text-2xl" />
        </motion.div>
        

      </div>

      {/* Scrollable Content */}
      <div className="flex flex-col bg-black ">
        {/* About me */}
        <div
          className="w-full min-h-[70vh] lg:min-h-[90vh] flex items-center justify-center text-[#f0f0f0] text-2xl font-normal p-6 lg:p-10 align-middle relative overflow-hidden"
          style={{
            backgroundImage: !isMobile
              ? `url(${Inspiration})`
              : `url(${Inspiration2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70 z-0"></div>

          {/* Grid Overlay */}
          <div 
            className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(217, 9, 8, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(217, 9, 8, 0.2) 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }}
          ></div>

          {/* Full Section Grain Overlay */}
          <div className="absolute inset-0 z-50 pointer-events-none grain mix-blend-overlay"></div>

          {/* Terminal Box */}
          <div className="relative z-10 w-full sm:max-w-[80vw] lg:max-w-[45vw] bg-[#D90908] cyber-box p-[2px] shadow-[0_0_30px_rgba(217,9,8,0.2)]">
            <div 
              className="flex flex-col w-full h-full bg-black/90 backdrop-blur-md relative"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)" }}
            >
              {/* Header */}
              <div className="bg-[#D90908] text-black font-mono text-xs px-4 py-2 flex justify-between items-center shrink-0">
                <span className="font-bold">>_ SYS.OVERVIEW.DAT</span>
                <span className="font-bold animate-pulse">STATUS: ONLINE</span>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-4 relative">
                <div className="hidden sm:block absolute top-4 right-4 text-[#D90908]/40 font-mono text-xs text-right">
                  SEQ: 001<br/>
                  LOC: SECTOR_7<br/>
                  AUTH: ADMYT
                </div>
                
                <h2 className="abnes text-[#D90908] text-2xl sm:text-3xl tracking-widest uppercase mb-2">
                  CORE DIRECTIVE
                </h2>
                
                <div className="font-mono text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed border-l-4 border-[#D90908] pl-5 py-1">
                  <BlurText
                    text="I build digital experiences where design meets code and AI adds intelligence."
                    delay={50}
                    animateBy="words"
                    direction="top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Work Section */}
        <div
          id="featured-works"
          ref={featuredWorksRef}
          className="lg:h-30 mg:h-25 sm:h-20 h-20"
        ></div>
        <div className="flex flex-col w-full h-full lg:h-full lg:pr-10 lg:pl-10 p-0 m-0 items-center justify-center text-[#f0f0f0] bg-[#030303] text-2xl font-bold">
          <div className="flex flex-col lg:flex-col lg:justify-between justify-between align-middle items-center w-full gap-6">
            <div className="elements flex flex-col md:flex-row md:gap-5 lg:gap-5 lg:flex-row md:px-6 sm:px-6 px-6 lg:px-0 text-6xl lg:text-8xl w-full h-full justify-center align-middle items-center lg:items-center tracking-widest">
              <div>FEATURED</div> <div>WORK</div>
            </div>
            {/* <a
              href="https://github.com/adityasatuluri?tab=repositories"
              target="_blank"
              className="elements flex  text-white hover:border-red-600 transition-colors duration-300 text-2xl"
            >
              <ShinyText text="VIEW ALL" disabled={false} speed={3} />
            </a> */}

            <Link
              to="/projects"
              className="elements flex  text-white hover:border-red-600 transition-colors duration-300 text-2xl"
            >
              <ShinyText text="VIEW ALL" disabled={false} speed={3} />
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div>Loading...</div>
              </div>
            }
          >
            <div className="flex flex-col w-full pt-10 px-0 md:px-5 lg:px-0 gap-10 justify-center items-center">
              {projects.slice(0, 6).map((p, i) => (
                <div
                  key={p.id}
                  className="elements w-full bg-[#D90908] relative cyber-box p-[2px] transition-all duration-300 group z-10 min-h-[40vh]"
                >
                  <div 
                    className="flex flex-col lg:flex-row w-full h-full bg-black relative"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)" }}
                  >
                    {/* Left: Image */}
                  <div
                    className="absolute lg:relative inset-0 w-full lg:w-[45%] h-full lg:h-auto bg-cover bg-center transition-all duration-500 lg:grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${p.image})` }}
                  >
                    <div className="absolute inset-0 bg-[#D90908]/20 mix-blend-color opacity-0 lg:opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-black/70 lg:hidden" />
                  </div>

                  {/* Right: Data Panel */}
                  <div className="w-full lg:w-[55%] p-6 sm:p-10 flex flex-col justify-between bg-transparent lg:bg-black relative border-none lg:border-l lg:border-t-0 border-[#D90908]/20 z-10">
                    <div className="flex flex-col gap-4">
                      {/* Terminal Header */}
                      <div className="flex justify-between items-center text-xs sm:text-sm font-mono text-[#D90908]/60 pb-2 border-b border-[#D90908]/20">
                        <span>>_ SYS.DAT_{i + 1} // {p.category.toUpperCase()}</span>
                        <span className="bg-[#D90908]/20 px-2 text-[#D90908]">{p.year}</span>
                      </div>
                      
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white group-hover:text-[#D90908] transition-colors duration-300">
                        {p.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm sm:text-base md:text-lg font-light lg:w-4/5 mt-2">
                        {p.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 mt-4">
                        {p.skills.map((skill, index) => (
                          <Link
                            key={index}
                            to={`/projects?skill=${encodeURIComponent(skill)}`}
                            className="text-xs sm:text-sm bg-transparent text-[#D90908] border border-[#D90908] px-3 py-1 hover:bg-[#D90908] hover:text-black transition-colors font-mono"
                          >
                            {skill}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mt-10">
                      {p.live_link && (
                        <a
                          href={p.live_link[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-[#D90908]/50 hover:bg-[#D90908] hover:text-black px-6 py-3 font-bold text-gray-400  hover:border-[#D90908] transition-all flex items-center justify-center"
                        >
                          {p.live_link[1] ? p.live_link[1] : "INIT_PREVIEW"}
                        </a>
                      )}
                      {p.repo_link && (
                        <a
                          href={p.repo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-[#D90908]/50 hover:bg-[#D90908] hover:text-black px-6 py-3 font-bold text-gray-400  hover:border-[#D90908] transition-all flex items-center justify-center"
                        >
                          SRC_CODE
                        </a>
                      )}
                    </div>
                  </div>
                  </div>
                </div>
              ))}

              {/* Mobile Modal */}
              <AnimatePresence>
                {isTouchDevice && selectedProject && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg"
                    onClick={() => setSelectedProject(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#f0f0f0] text-black rounded-2xl p-6 flex flex-col gap-6 max-w-3xl w-[90%] shadow-2xl relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-col space-y-4">
                        {/* Header with close button */}
                        <div className="flex items-center justify-between ">
                          <h2 className="text-2xl font-bold ">
                            {selectedProject.title}
                          </h2>
                          {/* Close button */}
                          <button
                            className=" text-black hover:text-red-600 text-xl cursor-pointer"
                            onClick={() => setSelectedProject(null)}
                          >
                            <RiCloseLargeFill />
                          </button>
                        </div>

                        <p className="text-xl font-normal">
                          {selectedProject.description}
                        </p>
                      </div>

                      <div className="flex flex-row gap-4 space-y-0 flex-wrap">
                        {selectedProject.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="text-[20px] text-gray-800 italic font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col space-y-4">
                        {selectedProject.repo_link && (
                          <a
                            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition flex items-center justify-center"
                            href={selectedProject.repo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Github
                          </a>
                        )}
                        {selectedProject.live_link && (
                          <a
                            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition flex items-center justify-center"
                            href={selectedProject.live_link[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {selectedProject.live_link[1]
                              ? selectedProject.live_link[1]
                              : "Preview"}
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Suspense>
        </div>

        {/* Filler Image Night City*/}
        {!isMobile ? (
          <>
            <div className="lg:h-30 mg:h-25 sm:h-20 h-20"></div>
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div>Loading...</div>
                </div>
              }
            >
              <div
                ref={cityRef}
                className="w-full  lg:h-[100vh] md:h-[50vh] flex items-center justify-center text-[#f0f0f0] text-2xl font-normal pb-6 grain transition-all duration-1000"
                style={{
                  backgroundImage: `url(${cityBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundAttachment: "fixed",
                }}
              ></div>
            </Suspense>
          </>
        ) : (
          <>
            {/* <div className="lg:h-30 mg:h-25 sm:h-20 h-20"></div>
            <div id="artworks-mobile" ref={ArtworksMobileRef}>
              <Artworks Mobile={isMobile} />
            </div> */}
          </>
        )}

        {/* Skills Section */}
        <div
          className="lg:h-30 mg:h-25 sm:h-20 h-20"
          id="skills"
          ref={SkillsRef}
        ></div>
        <div className="w-full min-h-[80vh] flex flex-col md:flex-row justify-between px-4 sm:px-6 md:px-10 gap-6 md:gap-10 text-lg sm:text-xl jura-font bg-black text-[#f0f0f0] cursor-crosshair">
          <div className="flex flex-col space-y-4 md:w-1/3 lg:items-start md:items-start items-center">
            <div
              ref={skillsTitleRef}
              className="text-[14vw] sm:text-5xl md:text-5xl lg:text-7xl font-bold text-white sticky top-20 tracking-widest"
            >
              SKILLS
            </div>
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col space-y-12 md:pl-10">
            {Object.entries(categories).map(([category, skills], index) => (
              <div
                key={category}
                data-category={category}
                className="w-full border border-[#D90908]/30 bg-black relative p-1"
                onMouseEnter={() => setCurrentCategory(category)}
                onMouseLeave={() => setCurrentCategory("")}
              >
                {/* Panel Header */}
                <div className="bg-[#D90908]/10 border-b border-[#D90908]/30 text-[#D90908] font-mono text-sm sm:text-base px-4 py-2 flex items-center">
                  <span className="font-bold">>_ SYS.MOD // {category.toUpperCase()}</span>
                </div>

                {/* Panel Body */}
                <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 font-normal relative">
                  
                  {skills.map((skill) => (
                    <Link
                      key={skill}
                      to={`/projects?skill=${encodeURIComponent(skill)}`}
                      className="elements cyber-button cyber-border-red cyber-hover-fill h-12 sm:h-14 w-full text-[#D90908] font-bold flex items-center justify-center gap-2 hover:bg-[#D90908] hover:text-black transition-all duration-300 ease-in-out text-sm md:text-base z-10 bg-black"
                    >
                      {skill}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXPERIENCE Section */}
        <div
          className="lg:h-30 mg:h-25 sm:h-20 h-20"
          id="career"
          ref={WorkRef}
        ></div>
        <div className="w-full flex flex-col md:flex-row justify-between px-4 sm:px-6 md:px-10 gap-6 md:gap-10 text-lg sm:text-xl jura-font cursor-crosshair bg-black text-[#f0f0f0] mb-20">
          <div className="flex flex-col md:w-1/3 lg:w-1/3 w-full lg:items-start md:items-start items-center">
            <div className="text-[14vw] sm:text-5xl md:text-5xl lg:text-7xl font-bold text-white sticky top-20 tracking-widest">
              CAREER
            </div>
          </div>
          
          <div className="w-full md:w-2/3 md:pl-10 relative">
            {/* Timeline Line */}
            <div className="absolute left-[15px] sm:left-[19px] md:left-[23px] top-4 bottom-0 w-1 bg-[#D90908]/50"></div>
            
            <div className="flex flex-col space-y-12">
              {experience.map((exp, index) => (
                <div
                  className="flex relative w-full items-start group"
                  key={index}
                  onMouseEnter={() => setCurrentSkills(exp.skills)}
                  onMouseLeave={() => setCurrentSkills("")}
                >
                  {/* Timeline Diamond Node */}
                  <div className="absolute left-[8px] sm:left-[12px] md:left-[16px] top-6 w-4 h-4 bg-black border-2 border-[#D90908] rotate-45 group-hover:bg-[#D90908] group-hover:shadow-[0_0_15px_#D90908] transition-all duration-300 z-10" />

                  {/* Content Box */}
                  <div className="elements ml-12 sm:ml-16 w-full border border-[#D90908]/30 bg-black p-1 relative">
                    <div className="bg-[#D90908]/10 border-b border-[#D90908]/30 px-4 py-2 flex flex-col sm:flex-row justify-between sm:items-center text-sm sm:text-base font-mono">
                      <span className="text-[#D90908] font-bold">>_ {exp.date}</span>
                      <span className="text-gray-400">LOC: {exp.place}</span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-[#D90908] transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <div className="text-gray-400 text-sm sm:text-base font-light tracking-wide w-full leading-relaxed">
                        {Array.isArray(exp.description) ? (
                          <ul className="list-none space-y-3">
                            {exp.description.map((line, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[#D90908]">]</span> 
                                <span><HighlightedText text={line} /></span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span><HighlightedText text={exp.description} /></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Artworks Section */}
        <div className="lg:h-30 mg:h-25 sm:h-20 h-20"></div>
        <div id="artworks" ref={ArtworksRef}>
          <Artworks />
        </div>

        {/* Contact Section */}
        <div className="lg:h-30 mg:h-25 sm:h-20 h-20" ref={ContactRef}></div>
        <Contact />
        {/* <div className="w-full h-full  flex items-center justify-center text-[#f0f0f0] text-lg sm:text-xl font-bold px-4 sm:px-6 md:px-10">
          <div className="flex flex-col justify-center space-y-6 w-full lg:max-w-[80vw]">
            <div className="elements flex flex-col items-center w-full text-[14vw] sm:text-5xl md:text-5xl lg:text-8xl leading-tight">
              <h1>LET'S WORK TOGETHER</h1>
            </div>
            <div className="elements w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name"
                className="bg-white w-full text-black h-12 sm:h-14 md:h-15 px-4 placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />
              <input
                type="text"
                placeholder="Email"
                className="bg-white w-full text-black h-12 sm:h-14 md:h-15 px-4 placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />
              <textarea
                rows="6"
                placeholder="Message"
                className="bg-white w-full text-black px-4 py-2 outline-none resize-none placeholder:font-normal placeholder:tracking-widest placeholder:font-sans"
              />
              <button className="bg-[#090909] text-white hover:bg-red-600 hover:font-bold hover:border-black w-full h-12 sm:h-14 md:h-15 border border-neutral-400 jura-font text-base sm:text-lg cursor-pointer">
                SEND
              </button>
            </div>
          </div>
        </div> */}

        {/* FOOTER */}
        <div className="lg:h-30 mg:h-25 sm:h-20 h-20"></div>
        <Footer />
      </div>
    </div>
    // </MomentumScroll>
  );
}
