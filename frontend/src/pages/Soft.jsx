import React, { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import projectsData from "../assets/projects.json";
import Footer from "../components/Footer";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaFilter } from "react-icons/fa6";
import bg from "../assets/h.jpg";

import {
  SiAdobephotoshop,
  SiBlender,
  SiUnrealengine,
  SiAdobe,
} from "react-icons/si";

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

  // ✅ Multi-select states
  const [selectedSkills, setSelectedSkills] = useState([]);

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
  const toggleFilter = (value, setFn, stateArr) => {
    if (stateArr.includes(value)) {
      setFn(stateArr.filter((v) => v !== value)); // remove
    } else {
      setFn([...stateArr, value]); // add
    }
  };

  // ✅ Apply filters and sort by year DESC
  const filteredProjects = projects
    .filter(
      (p) =>
        selectedSkills.length === 0 ||
        (p.skills && p.skills.some((s) => selectedSkills.includes(s)))
    )
    .sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <div className="text-white flex flex-col gap-30 align-middle justify-center items-center">
      <div className="flex flex-col w-full h-full gap-10 ">
        <motion.div
          className="text-white  h-full p-5 md:p-10 lg:p-10 border-1 border-red-600
                      flex flex-col justify-center items-center gap-5 abnes text-xl sm:text-3xl md:text-5xl lg:text-7xl
                      grain elements mx-10"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: easeInOut }}
          >
            PROJECTS
          </motion.p>
        </motion.div>

        {/* ================= Filter Section ================= */}
        {!isMobile ? (
          <>
            {/* Desktop: Floating Filter Button */}
            {!desktopFilterOpen && (
              <button
                className="fixed bottom-5 right-5 z-50 p-4 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center"
                onClick={() => setDesktopFilterOpen(true)}
              >
                <FaFilter size={20} />
              </button>
            )}

            <AnimatePresence>
              {desktopFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.25 }}
                  className="fixed bottom-16 right-5 z-50 w-80 bg-black/90 backdrop-blur-lg p-5 rounded-2xl shadow-xl"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-bold">Filter by Skills</h2>
                    <button
                      className="text-white hover:text-red-500"
                      onClick={() => setDesktopFilterOpen(false)}
                    >
                      <RiCloseLargeFill size={18} />
                    </button>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {skills.map((s) => (
                      <button
                        key={s}
                        className={`px-3 py-1 text-sm rounded-lg ${
                          selectedSkills.includes(s)
                            ? "bg-red-600"
                            : "bg-gray-700"
                        }`}
                        onClick={() =>
                          toggleFilter(s, setSelectedSkills, selectedSkills)
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            {/* Mobile: Floating Filter Button */}
            <button
              className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-6 py-2 bg-red-600 text-white rounded-full shadow-lg"
              onClick={() => setMobileFilterOpen(true)}
            >
              Filters
            </button>

            {/* Mobile: Slide-in Dock */}
            <AnimatePresence>
              {mobileFilterOpen && (
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg p-5 rounded-t-2xl shadow-lg"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Filter by Skills</h2>
                    <button
                      className="text-white hover:text-red-500"
                      onClick={() => setMobileFilterOpen(false)}
                    >
                      <RiCloseLargeFill size={20} />
                    </button>
                  </div>
                  <div className="flex gap-3 flex-wrap justify-center">
                    {skills.map((s) => (
                      <button
                        key={s}
                        className={`px-3 py-1 rounded-lg ${
                          selectedSkills.includes(s)
                            ? "bg-red-600"
                            : "bg-gray-700"
                        }`}
                        onClick={() =>
                          toggleFilter(s, setSelectedSkills, selectedSkills)
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* ================= Project Grid ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 w-full px-5 sm:px-5 md:px-10 lg:px-10 gap-[5vh] justify-center items-center">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="elements h-[40vh] sm:h-[50vh] md:h-[40vh] lg:h-[75vh] w-full border border-neutral-800 rounded-2xl transition-all duration-300 ease-in-out hover:rounded-none cursor-pointer"
              onClick={() => {
                if (isTouchDevice) setSelectedProject(p);
              }}
            >
              {/* Thumbnail */}
              <div
                className="relative flex items-center justify-center h-7/10 lg:h-8/10 rounded-t-2xl transition-all duration-300 ease-in-out hover:rounded-t-none"
                style={{
                  backgroundImage: `url(${p.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!isTouchDevice && (
                  <div className="flex flex-col gap-5 w-full h-full bg-[#f0f0f0]/50 text-[#010101] transition-all duration-300 backdrop-blur-md items-center justify-center opacity-0 hover:opacity-100 rounded-t-2xl hover:rounded-none">
                    <div className="px-10 flex text-center  font-bold text-lg sm:text-lg md:text-lg lg:text-xl">
                      {p.description}
                    </div>
                    <div className="flex flex-row gap-10 font-bold text-lg sm:text-lg md:text-lg lg:text-xl">
                      {p.repo_link && (
                        <a
                          className="px-3 py-3 bg-[#040404] hover:bg-[#0f0f0f] hover:shadow-xl/30 hover:shadow-black text-[#f0f0f0] font-light rounded-xl cursor-pointer transition-all duration-300 ease-in-out"
                          href={p.repo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Github
                        </a>
                      )}
                      {p.live_link && (
                        <a
                          className="px-3 py-3 bg-[#040404] hover:bg-[#0f0f0f] hover:shadow-xl/30 hover:shadow-black text-[#f0f0f0] font-light rounded-xl cursor-pointer transition-all duration-300 ease-in-out"
                          href={p.live_link[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {p.live_link[1] ? p.live_link[1] : "Preview"}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex flex-row gap-5 items-center justify-between lg:px-6 px-4 bg-[#0c0c0c] h-3/10 lg:h-2/10 rounded-b-2xl">
                <div className="flex flex-col items-start justify-center">
                  <div className="text-[#f1f1f1] text-lg lg:text-xl">
                    {p.title}
                  </div>
                  <div className="text-[#8c8c8c] text-sm lg:text-xl">
                    {p.category}
                  </div>
                </div>
                <div className="border border-[#454545] px-4 py-1 text-[#f1f1f1] text-lg rounded-full">
                  {p.year}
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
                  className="bg-[#f0f0f0] text-black rounded-2xl p-6 max-w-3xl w-[90%] shadow-2xl relative"
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

                    <p className="mb-6 text-xl">
                      {selectedProject.description}
                    </p>
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
      </div>

      <Footer />
    </div>
  );
}
