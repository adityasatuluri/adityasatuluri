import React, { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import projectsData from "../assets/projects.json";
import Footer from "../components/Footer";
import { RiCloseLargeFill, RiErrorWarningLine } from "react-icons/ri";
import { FaFilter } from "react-icons/fa6";
import bg from "../assets/h.jpg";
import { MdArrowUpward } from "react-icons/md";
import ScrollToTop from "react-scroll-to-top";
import { useLocation } from "react-router-dom";

export default function Soft() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [desktopFilterOpen, setDesktopFilterOpen] = useState(false);

  // all projects
  const projects = projectsData.projects;

  // ✅ Extract unique skills
  const skills = Array.from(
    new Set(projects.flatMap((p) => p.skills || []))
  ).filter(Boolean);

  // ✅ Extract unique years
  const years = Array.from(
    new Set(projects.map((p) => p.year))
  ).filter(Boolean).sort((a, b) => b - a);

  // ✅ Multi-select states
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const skillParam = params.get("skill");
    if (skillParam) {
      setSelectedSkills((prev) => {
        if (!prev.includes(skillParam)) {
          return [...prev, skillParam];
        }
        return prev;
      });
    }
  }, [location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setIsTouchDevice(
      "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0
    );

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Toggle helper
  const toggleFilter = (value, setFn) => {
    setFn((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      return [...prev, value];
    });
  };

  // ✅ Apply filters and sort by year DESC
  const filteredProjects = [...projects]
    .filter(
      (p) =>
        (selectedSkills.length === 0 ||
          (p.skills && p.skills.some((s) => selectedSkills.includes(s)))) &&
        (selectedYears.length === 0 || selectedYears.includes(p.year))
    )
    .sort((a, b) => Number(b.year || 0) - Number(a.year || 0));

  return (
    <div className="text-white flex flex-col gap-30 align-middle justify-center items-center">
      {/* <ScrollToTop
        smooth
        component={<MdArrowUpward size={30} color="white" />}
        style={{
          backgroundColor: "red",
          borderRadius: "50%",
          padding: "9px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          zIndex: 900,
        }}
      /> */}
      <div className="flex flex-col w-full h-full gap-10 ">
        <div className="elements mx-4 sm:mx-10 mt-10 relative z-10 bg-[#D90908] cyber-box p-[2px] shadow-[0_0_30px_rgba(217,9,8,0.2)]">
          <div className="flex flex-col w-full h-full bg-black/90 relative" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)" }}>
            {/* Header */}
            <div className="bg-[#D90908] text-black font-mono text-xs px-4 py-2 flex justify-between items-center shrink-0">
              <span className="font-bold">>_ SYS.ARCHIVE.DAT</span>
              <span className="font-bold animate-pulse">STATUS: ONLINE</span>
            </div>

            {/* Body */}
            <motion.div
              className="text-white h-full p-10 md:p-20 flex flex-col justify-center items-center gap-5 futuristic-armour text-4xl sm:text-5xl md:text-7xl lg:text-8xl grain relative overflow-hidden"
              style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="absolute inset-0 bg-black/50 z-0"></div>
              <div 
                className="absolute inset-0 z-0 opacity-30 pointer-events-none" 
                style={{ 
                  backgroundImage: 'linear-gradient(rgba(217, 9, 8, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(217, 9, 8, 0.2) 1px, transparent 1px)', 
                  backgroundSize: '40px 40px' 
                }}
              ></div>
              <motion.p
                className="relative z-10 tracking-widest text-shadow-md text-[#f0f0f0]"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: easeInOut }}
              >
                PROJECTS
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* ================= Filter Section ================= */}
        {!isMobile ? (
          <>
            {/* Desktop: Floating Filter Button */}
            {!desktopFilterOpen && (
              <button
                className="fixed bottom-5 right-5 z-50 p-3 px-4 bg-[#D90908] text-black cyber-nav-button font-bold text-sm tracking-widest hover:bg-white hover:text-black transition-colors"
                onClick={() => setDesktopFilterOpen(true)}
              >
                [ FILTER.EXE ]
              </button>
            )}

            <AnimatePresence>
              {desktopFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.25 }}
                  className="fixed bottom-16 right-5 z-50 w-80"
                >
                  <div className="w-full bg-[#D90908] cyber-box p-[2px] shadow-[0_0_20px_rgba(217,9,8,0.2)]">
                    <div className="w-full h-full bg-black/95 backdrop-blur-lg relative" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)" }}>
                      <div className="bg-[#D90908]/10 border-b border-[#D90908]/30 px-4 py-3 flex justify-between items-center relative z-10">
                    <h2 className="text-sm font-bold font-mono text-[#D90908]">>_ SYS.FILTER</h2>
                    <button
                      className="text-white hover:text-red-500"
                      onClick={() => setDesktopFilterOpen(false)}
                    >
                      <RiCloseLargeFill size={18} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 p-5">
                    <div>
                      <div className="text-[10px] text-[#D90908] mb-2 font-mono">>_ BY_SKILL</div>
                      <div className="flex gap-2 flex-wrap">
                        {skills.map((s) => (
                          <button
                            key={s}
                            className={`px-3 py-1 text-sm font-mono transition-all duration-300 cyber-button ${
                              selectedSkills.includes(s)
                                ? "bg-[#D90908] text-black font-bold"
                                : "bg-black text-[#D90908] border border-[#D90908]/50 hover:border-[#D90908]"
                            }`}
                            onClick={() =>
                              toggleFilter(s, setSelectedSkills)
                            }
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#D90908] mb-2 font-mono">>_ BY_YEAR</div>
                      <div className="flex gap-2 flex-wrap">
                        {years.map((y) => (
                          <button
                            key={y}
                            className={`px-3 py-1 text-sm font-mono transition-all duration-300 cyber-button ${
                              selectedYears.includes(y)
                                ? "bg-[#D90908] text-black font-bold"
                                : "bg-black text-[#D90908] border border-[#D90908]/50 hover:border-[#D90908]"
                            }`}
                            onClick={() =>
                              toggleFilter(y, setSelectedYears)
                            }
                          >
                            {y}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end border-t border-[#D90908]/20 pt-4 mt-2">
                      <button 
                        onClick={() => { setSelectedSkills([]); setSelectedYears([]); }}
                        className="text-xs font-mono text-gray-400 hover:text-[#D90908] transition-colors"
                      >
                        [ CLEAR_FILTERS ]
                      </button>
                    </div>
                  </div>
                  </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            {/* Mobile: Floating Filter Button */}
            <button
              className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-[#D90908] text-black cyber-nav-button font-bold text-sm tracking-widest hover:bg-white hover:text-black transition-colors"
              onClick={() => setMobileFilterOpen(true)}
            >
              [ FILTER.EXE ]
            </button>

            {/* Mobile: Slide-in Dock */}
            <AnimatePresence>
              {mobileFilterOpen && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="fixed bottom-0 left-0 right-0 z-50"
                >
                  <div className="w-full bg-[#D90908] cyber-box p-[2px] shadow-[0_0_20px_rgba(217,9,8,0.2)]">
                    <div className="w-full h-full bg-black/95 backdrop-blur-lg relative" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)" }}>
                      <div className="bg-[#D90908]/10 border-b border-[#D90908]/30 px-5 py-4 flex justify-between items-center relative z-10">
                    <h2 className="text-sm font-bold font-mono text-[#D90908]">>_ SYS.FILTER</h2>
                    <button
                      className="text-white hover:text-red-500"
                      onClick={() => setMobileFilterOpen(false)}
                    >
                      <RiCloseLargeFill size={20} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 p-6 overflow-y-auto max-h-[60vh]">
                    <div>
                      <div className="text-[10px] text-[#D90908] mb-2 font-mono">>_ BY_SKILL</div>
                      <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
                        {skills.map((s) => (
                          <button
                            key={s}
                            className={`px-3 py-1 text-sm font-mono transition-all duration-300 cyber-button ${
                              selectedSkills.includes(s)
                                ? "bg-[#D90908] text-black font-bold"
                                : "bg-black text-[#D90908] border border-[#D90908]/50 hover:border-[#D90908]"
                            }`}
                            onClick={() =>
                              toggleFilter(s, setSelectedSkills)
                            }
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#D90908] mb-2 font-mono">>_ BY_YEAR</div>
                      <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
                        {years.map((y) => (
                          <button
                            key={y}
                            className={`px-3 py-1 text-sm font-mono transition-all duration-300 cyber-button ${
                              selectedYears.includes(y)
                                ? "bg-[#D90908] text-black font-bold"
                                : "bg-black text-[#D90908] border border-[#D90908]/50 hover:border-[#D90908]"
                            }`}
                            onClick={() =>
                              toggleFilter(y, setSelectedYears)
                            }
                          >
                            {y}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center border-t border-[#D90908]/20 pt-4 mt-2">
                      <button 
                        onClick={() => { setSelectedSkills([]); setSelectedYears([]); }}
                        className="text-xs font-mono text-gray-400 hover:text-[#D90908] transition-colors"
                      >
                        [ CLEAR_FILTERS ]
                      </button>
                    </div>
                  </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* ================= Project Grid ================= */}
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-4 text-center px-5">
            <div className="text-[#D90908] text-6xl sm:text-7xl mb-4"><RiErrorWarningLine /></div>
            <h3 className="futuristic-armour text-3xl sm:text-4xl text-[#f0f0f0] tracking-widest">NO_DATA_FOUND</h3>
            <p className="font-mono text-sm sm:text-base text-gray-400 max-w-md">The requested query yielded zero results in the database. Please adjust your filter parameters.</p>
            <button 
              onClick={() => { setSelectedSkills([]); setSelectedYears([]); }}
              className="mt-6 cyber-button px-6 py-3 bg-[#D90908] text-black font-bold font-mono tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              [ RESET_QUERY ]
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 w-full px-5 sm:px-5 md:px-10 lg:px-10 gap-[5vh] justify-center items-center">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="h-[40vh] sm:h-[50vh] md:h-[40vh] lg:h-[75vh] w-full bg-[#D90908] cyber-box p-[2px] transition-all duration-300 ease-in-out cursor-pointer relative z-10 shadow-[0_0_15px_rgba(217,9,8,0.1)] group"
                onClick={() => {
                  if (isTouchDevice) setSelectedProject(p);
                }}
              >
              <div className="flex flex-col w-full h-full bg-black relative" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)" }}>
                {/* Thumbnail */}
                <div
                  className="relative flex items-center justify-center h-[75%] lg:h-[80%] transition-all duration-300 ease-in-out overflow-hidden"
                >
                  <img
                    src={`/${p.image}`}
                    alt={p.title || "Project Thumbnail"}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  {!isTouchDevice && (
                    <div className="flex flex-col gap-6 w-full h-full relative z-10 bg-black/80 text-[#f0f0f0] transition-all duration-300 backdrop-blur-md items-center justify-center opacity-0 group-hover:opacity-100 p-6 text-center">
                      <div className="font-bold text-sm sm:text-base lg:text-lg hover-glitch">
                        {p.description}
                      </div>
                      <div className="flex flex-row gap-3 flex-wrap justify-center mt-2">
                        {p.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="hover-glitch text-[10px] sm:text-xs bg-transparent text-[#D90908] border border-[#D90908] px-2 py-1 font-mono tracking-widest"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-row gap-6 font-bold text-xs sm:text-sm font-mono mt-4">
                        {p.repo_link && (
                          <div className="bg-[#D90908] cyber-button p-[1px] shadow-[0_0_10px_rgba(217,9,8,0.2)] hover-glitch" style={{ animationDelay: `0.2s` }}>
                            <a
                              className="block cyber-button px-4 py-2 bg-black text-[#D90908] hover:bg-[#D90908] hover:text-black transition-colors"
                              href={p.repo_link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              [ SRC_CODE ]
                            </a>
                          </div>
                        )}
                        {p.live_link && (
                          <div className="bg-[#D90908] cyber-button p-[1px] shadow-[0_0_10px_rgba(217,9,8,0.2)] hover-glitch" style={{ animationDelay: `0.3s` }}>
                            <a
                              className="block cyber-button px-4 py-2 bg-black text-[#D90908] hover:bg-[#D90908] hover:text-black transition-colors"
                              href={p.live_link[0]}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              [ {p.live_link[1] ? p.live_link[1] : "INIT_PREVIEW"} ]
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Data Readout */}
                <div className="flex flex-col justify-center px-4 sm:px-6 bg-[#0c0c0c] h-[25%] lg:h-[20%] border-t border-[#D90908]/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#D90908] font-mono text-[10px] sm:text-xs font-bold">>_ SYS.DAT // {p.category.toUpperCase()}</span>
                    <span className="text-gray-500 font-mono text-[10px] sm:text-xs border border-gray-800 px-2">VER {p.year}</span>
                  </div>
                  <div className="futuristic-armour text-[#f0f0f0] text-xl sm:text-2xl tracking-widest">
                    {p.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
          {/* Mobile Modal */}
          <AnimatePresence>
            {isTouchDevice && selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-lg"
                onClick={() => setSelectedProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-[90%] max-w-3xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full bg-[#D90908] cyber-box p-[2px] shadow-[0_0_30px_rgba(217,9,8,0.3)]">
                    <div className="flex flex-col w-full h-full bg-black relative text-[#f0f0f0]" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)" }}>
                      <div className="bg-[#D90908]/10 border-b border-[#D90908]/30 px-4 py-2 flex justify-between items-center mb-4 relative z-10">
                    <h2 className="text-sm font-bold font-mono text-[#D90908]">>_ SYS.DAT // {selectedProject.category.toUpperCase()}</h2>
                    <button
                      className="text-white hover:text-red-500"
                      onClick={() => setSelectedProject(null)}
                    >
                      <RiCloseLargeFill size={20} />
                    </button>
                  </div>
                  
                  <div className="p-4 flex flex-col gap-6">
                    <div className="flex flex-col space-y-4">
                      <h2 className="text-3xl font-bold futuristic-armour text-white tracking-widest">
                        {selectedProject.title}
                      </h2>
                      <p className="text-sm font-mono text-gray-300">{selectedProject.description}</p>
                    </div>

                    <div className="flex flex-row gap-2 flex-wrap">
                      {selectedProject.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="p-[1px] bg-[#D90908]/50 cyber-button inline-block"
                        >
                          <span className="block w-full h-full text-xs bg-black text-[#D90908] px-2 py-1 font-mono cyber-button">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col space-y-3 mt-4">
                      {selectedProject.repo_link && (
                        <a
                          className="w-full text-center cyber-button px-4 py-3 bg-[#D90908] text-black font-bold font-mono hover:bg-white transition-colors"
                          href={selectedProject.repo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          [ SRC_CODE ]
                        </a>
                      )}
                      {selectedProject.live_link && (
                        <div className="w-full bg-[#D90908] cyber-button p-[1px] shadow-[0_0_10px_rgba(217,9,8,0.2)]">
                          <a
                            className="block w-full text-center cyber-button px-4 py-3 bg-black text-[#D90908] font-bold font-mono hover:bg-[#D90908] hover:text-black transition-colors"
                            href={selectedProject.live_link[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            [ {selectedProject.live_link[1] ? selectedProject.live_link[1] : "INIT_PREVIEW"} ]
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      <Footer />
    </div>
  );
}
