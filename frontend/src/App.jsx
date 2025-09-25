import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Play, Pause, SkipForward, SkipBackIcon } from "lucide-react";

import "./App.css";
import Home from "./pages/Home.jsx";
import Artworks from "./pages/Artworks.jsx";
import Soft from "./pages/Soft.jsx";
import Credits from "./components/Credits.jsx";

// assets
import cursorSvg from "./assets/cursor.svg";
import resume from "./assets/documents/Aditya_Resume.pdf";
import Glitch1 from "./assets/glitchgif.gif";
import Glitch2 from "./assets/minimalglitch.gif";
import WhiteBg from "./assets/WhiteBg.webp";
import LoadingBg from "./assets/loading_bg.webp";
import logo from "./assets/logo.png";
import { CgMenuGridO } from "react-icons/cg";

// songs
import V from "./assets/sound/v2.mp3";
import { MdRestartAlt } from "react-icons/md";

// function Credits({ visible, onClose }) {
//   if (!visible) return null;
//   return (
//     <div className="fixed inset-0 z-[5000] flex items-center justify-center w-screen h-screen">
//       <div className="w-full max-w-4xl h-[80vh] max-h-[600px] sm:max-h-[700px] lg:max-h-[800px] rounded-2xl bg-black/80 backdrop-blur-lg p-4 sm:p-6 md:p-8 shadow-2xl overflow-y-auto">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//           <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
//             Credits
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-white text-xl sm:text-2xl md:text-3xl font-light hover:text-red-600 transition-colors duration-300 ease-in-out mt-2 sm:mt-0"
//           >
//             ✕
//           </button>
//         </div>
//         <div className="text-white text-base sm:text-lg md:text-xl space-y-4">
//           <div>
//             <h3 className="font-semibold">Images:</h3>
//             <ul className="list-disc list-inside">
//               <li>Image 1 - Source: [Artist Name/Link]</li>
//               <li>Image 2 - Source: [Artist Name/Link]</li>
//               {/* Add more image credits as needed */}
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-semibold">Music:</h3>
//             <ul className="list-disc list-inside">
//               <li className="pl-5">
//                 V - Artist: Marcin Przybyłowicz (
//                 <a
//                   href="https://open.spotify.com/track/2u1FWVxAb16qbgwPgygAdj?si=e6849a9411bc4214"
//                   target="_blank"
//                   className="underline hover:text-red-600"
//                 >
//                   link
//                 </a>
//                 )
//               </li>
//               {/* Add more music credits as needed */}
//             </ul>
//           </div>
//           <div>
//             <h3 className="font-semibold">Other Assets:</h3>
//             <ul className="list-disc list-inside">
//               <li>Asset 1 - Source: [Source Name/Link]</li>
//               {/* Add more asset credits as needed */}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerIcon, setPlayerIcon] = useState("Pause");
  const [credits, setCredits] = useState(false);
  const [menuItem, setMenuItem] = useState(() => {
    // Load menuItem from localStorage on initial render
    return localStorage.getItem("selectedMenuItem") || "Home";
  });
  const [volume, setVolume] = useState(0.3);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // playlist with names
  const playlist = [{ src: V, name: "V" }];

  // audio ref
  const audioRef = useRef(new Audio(playlist[0].src));

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  // auto-update src when track changes
  useEffect(() => {
    audioRef.current.src = playlist[currentTrack].src;
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  }, [currentTrack]);

  // track progress
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      if (audio.currentTime >= audio.duration - 0.1) {
        setPlayerIcon("Restart");
        setIsPlaying(false);
      }
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateProgress);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // handle play/pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.log("Autoplay blocked:", err));
    }
    setIsPlaying(!isPlaying);
  };

  // next track
  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  // previous track
  const previousTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  // seek
  const handleSeek = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  // format time
  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Update menuItem in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedMenuItem", menuItem);
  }, [menuItem]);

  // Sync menuItem with current route on navigation
  useEffect(() => {
    const pathToMenuItem = {
      "/": "Home",
      "/artworks": "Artworks",
      "/projects": "Projects",
    };
    const currentMenuItem = pathToMenuItem[location.pathname] || "Home";
    setMenuItem(currentMenuItem);
  }, [location.pathname]);

  useEffect(() => {
    document.title = "Aditya Satuluri";
    document.body.style.cursor = `url(${cursorSvg}) 10 10, auto`;
  }, []);

  useEffect(() => {}, [credits]);
  const handleClose = () => setCredits(false);

  // App.jsx
  useEffect(() => {
    if (location.pathname === "/") {
      switch (location.hash) {
        case "#home":
          setMenuItem("Home");
          break;
        case "#featured-works":
          setMenuItem("Projects");
          break;
        case "#skills":
          setMenuItem("Skills");
          break;
        case "#career":
          setMenuItem("Work");
          break;
        case "#artworks":
          setMenuItem("Artworks");
          break;
        case "#artworks-mobile":
          setMenuItem("ArtworksMobile");
          break;
        case "#contact":
          setMenuItem("Contact");
          break;
        default:
          setMenuItem("Home");
      }
    } else if (location.pathname === "/projects") {
      setMenuItem("Projects");
    } else if (location.pathname === "/artworks") {
      setMenuItem("Artworks");
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      {isLoading ? (
        <motion.div
          className="text-white w-full min-h-screen flex flex-col justify-center align-middle items-center space-y-10 grain cursor-crosshair"
          initial={{ background: "#090909" }}
          animate={{
            backgroundImage: `url(${LoadingBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          transition={{ duration: 1 }}
        >
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: easeInOut }}
            onClick={() => {
              setIsLoading(false);
              setIsPlaying(true);
              audioRef.current
                .play()
                .catch((err) => console.log("Autoplay blocked:", err));
            }}
            className="relative glitch-button z-30 w-[25vh] md:w-[20vh] lg:w-[20vh] py-3 lg:px-6 font-bold uppercase tracking-wider rounded overflow-hidden group transition-all duration-600 cursor-target sm:text-sm"
            data-text="ENTER"
          >
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 opacity-100 bg-cover bg-bottom z-20"
                style={{ backgroundImage: `url(${WhiteBg})` }}
              />
              <div className="absolute inset-0 bg-red-600 group-hover:bg-white transition-all duration-600 z-10" />
            </div>
            <span
              className="relative z-70 abnes text-black group-hover:text-white transform transition-all duration-600"
              data-text="ENTER"
            >
              ENTER
            </span>
            <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-white group-hover:w-full transition-all duration-1000 z-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 w-[100vw] h-[100vh] bg-red-600 mix-blend-overlay"
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-11 w-[100vw] h-[100vh] mix-blend-lighten"
            style={{
              backgroundImage: `url(${Glitch2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <motion.div
            initial={{ opacity: 100 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-11 w-[100vw] h-[100vh] mix-blend-lighten"
            style={{
              backgroundImage: `url(${Glitch1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
        </motion.div>
      ) : (
        <div>
          <div className="w-full min-h-screen flex flex-col z-1000 bg-[#080808] font-sans relative cursor-crosshair">
            {!isMobile ? (
              <header
                id="navbar"
                className="w-full uppercase flex items-center justify-center gap-6 p-4 text-white sticky top-0 z-50 bg-black/75 backdrop-blur-lg hover:bg-black/90 transition-colors duration-300 custom-border inset-shadow-sm"
              >
                {/*MENU*/}
                <div className="flex items-center gap-6 text-sm md:text-base tracking-widest">
                  <Link
                    to="/#home"
                    onClick={() => setMenuItem("Home")}
                    className={`hover:text-red-500 cursor-target ${
                      menuItem === "Home"
                        ? "line-through decoration-red-500 hover:decoration-white"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    Home
                  </Link>
                  {/* <a
                    href="https://github.com/adityasatuluri/?tab=repositories"
                    target="_blank"
                    onClick={() => setMenuItem("Projects")}
                    className={`hover:text-red-500 cursor-target ${
                      menuItem === "Projects"
                        ? "text-shadow-lg text-shadow-red-600"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    Projects
                  </a> */}
                  {/* <Link
                    to="/projects"
                    onClick={() => {
                      setMenuItem("Projects");
                    }}
                    className={`hover:text-red-500 ${
                      menuItem === "Projects"
                        ? "line-through decoration-red-500 hover:decoration-white"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    Projects
                  </Link> */}
                  <Link
                    to="/#featured-works" // Navigates to / and scrolls to #featured-works
                    onClick={() => setMenuItem("Projects")}
                    className={`hover:text-red-500 ${
                      menuItem === "Projects"
                        ? "line-through decoration-red-500 hover:decoration-white"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    Projects
                  </Link>
                  <Link
                    to="/#skills" // Navigates to / and scrolls to #featured-works
                    onClick={() => setMenuItem("Skills")}
                    className={`hover:text-red-500 ${
                      menuItem === "Skills"
                        ? "line-through decoration-red-500 hover:decoration-white"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    Skills
                  </Link>
                  <Link
                    to="/#career" // Navigates to / and scrolls to #featured-works
                    onClick={() => setMenuItem("Work")}
                    className={`hover:text-red-500 ${
                      menuItem === "Work"
                        ? "line-through decoration-red-500 hover:decoration-white"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    Career
                  </Link>
                  <Link
                    to="/#artworks"
                    onClick={() => setMenuItem("Artworks")}
                    className={`hover:text-red-500 cursor-target ${
                      menuItem === "Artworks"
                        ? "line-through decoration-red-500 hover:decoration-white"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    Artworks
                  </Link>
                  <Link
                    to="/#contact"
                    onClick={() => setMenuItem("Contact")}
                    className={`hover:text-red-500 cursor-target ${
                      menuItem === "Contact"
                        ? "line-through decoration-red-500 hover:decoration-white"
                        : "text-[#f0f0f0]"
                    }`}
                  >
                    Contact
                  </Link>
                  <a
                    className="hover:text-red-500 cursor-target"
                    href={resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuItem("Resume")}
                  >
                    Resume
                  </a>

                  {/* Credits */}
                  <button
                    className="opacity-50 hover:text-red-500 hover:opacity-100 cursor-pointer"
                    onClick={() => setCredits(true)}
                    type="button"
                  >
                    Credits
                  </button>
                </div>
              </header>
            ) : (
              <header
                id="navbar"
                className="w-full flex items-center justify-between gap-6 p-4 text-white sticky top-0 z-50 bg-black/85 backdrop-blur-lg hover:bg-black/90 transition-colors duration-300 inset-shadow-sm"
              >
                <Link
                  to="/#home"
                  onClick={() => setMenuItem("Home")}
                  className="hover:text-red-500 cursor-target"
                >
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-8 w-8 object-contain"
                  />
                </Link>
                <button
                  onClick={() =>
                    setIsPlayerOpen(false) || setMobileMenuOpen((prev) => !prev)
                  }
                  className="hover:text-red-500 cursor-target"
                >
                  <CgMenuGridO className="h-8 w-8" />
                </button>
                <AnimatePresence>
                  {mobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="fixed inset-0 h-[100vh] bg-[#060606] backdrop-blur-xl flex flex-col items-center justify-center space-y-8 text-2xl font-bold"
                      style={{
                        backgroundImage: `url(${WhiteBg})`,
                        backgroundSize: "cover",
                      }}
                    >
                      <button
                        className="absolute top-6 right-6 text-white hover:text-red-500 text-3xl"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        ✕
                      </button>
                      <Link
                        to="/#home"
                        onClick={() => {
                          setMenuItem("Home");
                          setMobileMenuOpen(false);
                        }}
                        className={`hover:text-red-500 ${
                          menuItem === "Home"
                            ? "line-through decoration-black"
                            : ""
                        }`}
                      >
                        Home
                      </Link>
                      <Link
                        to="/#featured-works"
                        onClick={() => {
                          setMenuItem("Projects");
                          setMobileMenuOpen(false);
                        }}
                        className={`hover:text-red-500 ${
                          menuItem === "Projects"
                            ? "line-through decoration-black"
                            : ""
                        }`}
                      >
                        Projects
                      </Link>

                      <Link
                        to="/#skills"
                        onClick={() => {
                          setMenuItem("Skills");
                          setMobileMenuOpen(false);
                        }}
                        className={`hover:text-red-500 ${
                          menuItem === "Skills"
                            ? "line-through decoration-black"
                            : ""
                        }`}
                      >
                        Skills
                      </Link>
                      <Link
                        to="/#career"
                        onClick={() => {
                          setMenuItem("Work");
                          setMobileMenuOpen(false);
                        }}
                        className={`hover:text-red-500 ${
                          menuItem === "Work"
                            ? "line-through decoration-black"
                            : ""
                        }`}
                      >
                        Career
                      </Link>

                      <Link
                        to="/#artworks"
                        onClick={() => {
                          setMenuItem("Artworks");
                          setMobileMenuOpen(false);
                        }}
                        className={`hover:text-red-500 ${
                          menuItem === "Artworks"
                            ? "line-through decoration-black"
                            : ""
                        }`}
                      >
                        Artworks
                      </Link>

                      <Link
                        to="/#contact"
                        onClick={() => {
                          setMenuItem("Contact");
                          setMobileMenuOpen(false);
                        }}
                        className={`hover:text-red-500 ${
                          menuItem === "Contact"
                            ? "line-through decoration-black"
                            : ""
                        }`}
                      >
                        Contact
                      </Link>

                      <a
                        href={resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setMenuItem("Resume");
                          setMobileMenuOpen(false);
                        }}
                        className="hover:text-red-500"
                      >
                        Resume
                      </a>
                      <button
                        className="opacity-50 hover:text-red-500 hover:opacity-100 cursor-pointer"
                        onClick={() => {
                          setCredits(true);
                          setMobileMenuOpen(false);
                        }}
                        type="button"
                      >
                        Credits
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </header>
            )}

            <AnimatePresence>
              {credits && (
                <motion.div
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1, opacity: 0 }} // Add exit animation
                  transition={{ duration: 0.3, ease: "easeInOut" }} // Define transition
                  className="fixed inset-0 z-50 flex items-center justify-center b backdrop-blur-sm" // Modal-like styling
                >
                  <Credits visible={credits} onClose={handleClose} />
                </motion.div>
              )}
            </AnimatePresence>

            <main className="flex-1 bg-black scrollbar-hide">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.7 }}
                >
                  <Routes location={location} key={location.pathname}>
                    <Route
                      path="/"
                      element={<Home setMenuItem={setMenuItem} />}
                    />

                    <Route path="/projects" element={<Soft />} />
                    <Route path="/artworks" element={<Artworks />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

          {isPlayerOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-20 right-6 bg-black/90 backdrop-blur-md text-white p-4 rounded-xl shadow-lg w-72 z-0"
            >
              <p className="font-mono text-sm mb-2">
                Now Playing: {playlist[currentTrack].name}
              </p>
              <input
                type="range"
                min="0"
                max={duration}
                value={progress}
                onChange={handleSeek}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-xs font-mono">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="flex items-center gap-4 mt-3 align-middle justify-left flex-row">
                <button
                  onClick={previousTrack}
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 cursor-target hover:rounded-sm transform transition-all duration-100 transition-ease-in-out"
                >
                  <SkipBackIcon className="w-5 h-5" />
                </button>
                {playerIcon === "Pause" ? (
                  <button
                    onClick={togglePlay}
                    className="p-2 bg-red-600 rounded-full hover:bg-red-500 cursor-target hover:rounded-sm transform transition-all duration-100 transition-ease-in-out"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      audioRef.current.currentTime = 0;
                      audioRef.current.play();
                      setIsPlaying(true);
                      setPlayerIcon("Pause");
                    }}
                    className="p-2 bg-red-600 rounded-full hover:bg-red-500 cursor-target hover:rounded-sm transform transition-all duration-100 transition-ease-in-out"
                  >
                    <MdRestartAlt className="w-5 h-5" />
                  </button>
                )}
                <div className="w-30">
                  <label className="text-xs font-mono">Volume</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-red-600"
                  />
                </div>
                <button
                  onClick={nextTrack}
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 cursor-target hover:rounded-sm transform transition-all duration-100 transition-ease-in-out"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
