import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  lazy,
  Suspense,
} from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence, easeInOut } from "motion/react";
import { MdArrowUpward } from "react-icons/md";
import ScrollToTop from "react-scroll-to-top";
import Footer from "../components/Footer";
import "../App.css";
import bg from "../assets/h.jpg";
// import GlitchGif from "../assets/verticalglitch.gif";
// const GlitchBg = lazy(() => import("../assets/verticalglitch.gif"));
import {
  SiAdobephotoshop,
  SiBlender,
  SiUnrealengine,
  SiAdobe,
} from "react-icons/si";

// Auto-import all images from artworks folder
const images = Object.values(
  import.meta.glob("/public/artworks/*.webp", { eager: true })
).map((mod) => mod.default);

// Extract filename from path for label
function getFileName(path) {
  return path
    .split("/")
    .pop()
    .replace(/\.(png|jpe?g|svg|webp)$/i, "")
    .split(".webp")[0]
    .split("-")[0];
}

// Shimmer loader component
function Shimmer() {
  return (
    <div className="w-full h-full bg-neutral-900 animate-pulse border border-neutral-800"></div>
  );
}

// Lazy image loader with hover label
function LazyImage({ src, alt, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative w-full group overflow-hidden cursor-pointer border border-transparent hover:border-[#D90908] transition-colors duration-300 shadow-md hover:shadow-[0_0_15px_rgba(217,9,8,0.5)]"
      onClick={onClick}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Shimmer />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => {
          // delay a bit so shimmer is visible
          setTimeout(() => setLoaded(true), 400);
        }}
        onError={() => setLoaded(true)}
        className={`w-full h-full object-cover block transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ minHeight: "16rem" }} // matches shimmer height
      />

      {/* Hover overlay with glitch */}
      <div
        className="absolute inset-0 flex items-center justify-center text-white text-lg sm:text-xl uppercase tracking-widest 
                bg-black/80 backdrop-blur-sm
                opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <span className="hover-glitch font-mono font-bold text-[#D90908]">
          {getFileName(src)}
        </span>
      </div>
    </div>
  );
}

// Modal for expanded view
function ImageModal({ images, selectedIndex, onClose, onPrev, onNext }) {
  if (selectedIndex === null) return null;

  return (
    <motion.div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md">
      {/* Desktop Controls */}
      <div className="hidden sm:block absolute top-5 right-5 z-50 bg-[#D90908]/50 cyber-button p-[1px] shadow-[0_0_10px_rgba(217,9,8,0.2)]">
        <button
          onClick={onClose}
          className="text-[#D90908] hover:text-white font-mono font-bold text-sm tracking-widest cyber-button px-4 py-2 hover:bg-[#D90908] transition-colors bg-black"
        >
          [ X ] EXEC_CLOSE
        </button>
      </div>

      <div className="hidden sm:block absolute left-5 z-50 bg-[#D90908]/50 cyber-button p-[1px] shadow-[0_0_10px_rgba(217,9,8,0.2)]">
        <button
          onClick={onPrev}
          className="text-[#D90908] hover:text-black font-mono font-bold text-base tracking-widest cyber-button px-6 py-10 hover:bg-[#D90908] transition-colors bg-black/50"
        >
          [ PREV ]
        </button>
      </div>

      <div className="cyber-box bg-[#D90908] p-[2px] relative shadow-[0_0_30px_rgba(217,9,8,0.3)] z-40 mb-16 sm:mb-0">
        <div className="bg-black relative h-full w-full" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)" }}>
          <motion.img
            key={selectedIndex}
            initial={{ opacity: 0, x: 0, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: easeInOut }}
            src={images[selectedIndex]}
            alt="expanded"
            className="max-h-[70vh] sm:max-h-[85vh] max-w-[90vw] sm:max-w-[70vw] object-contain"
          />
        </div>
      </div>

      <div className="hidden sm:block absolute right-5 z-50 bg-[#D90908]/50 cyber-button p-[1px] shadow-[0_0_10px_rgba(217,9,8,0.2)]">
        <button
          onClick={onNext}
          className="text-[#D90908] hover:text-black font-mono font-bold text-base tracking-widest cyber-button px-6 py-10 hover:bg-[#D90908] transition-colors bg-black/50"
        >
          [ NEXT ]
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="sm:hidden absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex gap-4 w-auto justify-center">
        <div className="bg-[#D90908]/50 cyber-button p-[1px] shadow-[0_0_10px_rgba(217,9,8,0.2)]">
          <button
            onClick={onPrev}
            className="text-[#D90908] hover:text-black font-mono font-bold text-xl cyber-button px-6 py-3 hover:bg-[#D90908] transition-colors bg-black/80"
          >
            &lt;
          </button>
        </div>
        <div className="bg-[#D90908]/50 cyber-button p-[1px] shadow-[0_0_10px_rgba(217,9,8,0.2)]">
          <button
            onClick={onClose}
            className="text-[#D90908] hover:text-white font-mono font-bold text-xl cyber-button px-6 py-3 hover:bg-[#D90908] transition-colors bg-black/80"
          >
            X
          </button>
        </div>
        <div className="bg-[#D90908]/50 cyber-button p-[1px] shadow-[0_0_10px_rgba(217,9,8,0.2)]">
          <button
            onClick={onNext}
            className="text-[#D90908] hover:text-black font-mono font-bold text-xl cyber-button px-6 py-3 hover:bg-[#D90908] transition-colors bg-black/80"
          >
            &gt;
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Ux() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClose = () => setSelectedIndex(null);
  const handlePrev = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  const handleNext = () =>
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  const [value, setValue] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-col lg:gap-30 mg:gap-25 sm:gap-20 gap-20">
      <ScrollToTop
        smooth
        component={<MdArrowUpward size={30} color="white" />}
        style={{
          backgroundColor: "#D90908",
          borderRadius: "0",
          clipPath: "polygon(25% 0, 100% 0, 100% 75%, 75% 100%, 0 100%, 0 25%)",
          padding: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          zIndex: 900,
        }}
      />
      <div className="flex flex-col w-full h-full gap-10">
        <div className="elements mx-4 sm:mx-10 mt-10 relative z-10 bg-[#D90908] cyber-box p-[2px] shadow-[0_0_30px_rgba(217,9,8,0.2)]">
          <div className="flex flex-col w-full h-full bg-black/90 relative" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)" }}>
            {/* Header Data Bar */}
            <div className="bg-[#D90908] text-black font-mono text-xs px-4 py-2 flex justify-between items-center shrink-0">
              <span className="font-bold">&gt;_ SYS.GALLERY.DAT</span>
              <span className="font-bold animate-pulse">RENDERING: ONLINE</span>
            </div>

            {/* Body */}
            <motion.div
              className="text-white h-full p-10 md:p-20 flex flex-col justify-center items-center gap-6 futuristic-armour text-4xl sm:text-5xl md:text-7xl lg:text-8xl grain relative overflow-hidden"
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
                ARTWORKS
              </motion.p>

              <motion.a
                href="https://www.instagram.com/artvader04/"
                target="_blank"
                className="relative z-10 text-lg flex flex-row gap-10 mt-4 text-[#D90908]"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: easeInOut }}
              >
                <SiAdobe className="h-6 w-6 md:w-7 md:h-7 lg:w-8 lg:h-8 hover:text-white transition-colors" />
                <SiBlender className="h-6 w-6 md:w-7 md:h-7 lg:w-8 lg:h-8 hover:text-white transition-colors" />
                <SiUnrealengine className="h-6 w-6 md:w-7 md:h-7 lg:w-8 lg:h-8 hover:text-white transition-colors" />
              </motion.a>
            </motion.div>
          </div>
        </div>
        <div className="mx-4 sm:mx-10">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 450: 2, 650: 3, 900: 4 }}
          >
            <Masonry gutter="20px">
            {images.map((image, i) => (
              <motion.div className="elements">
                <LazyImage
                  key={i}
                  src={image}
                  alt={`Artwork ${i}`}
                  onClick={() => setSelectedIndex(i)}
                />
              </motion.div>
            ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>

      <div className="mt-20">
        <div className="bg-[#D90908] border-y border-black h-12 lg:h-16 uppercase text-black font-mono font-bold flex justify-between items-center px-6 sm:px-12 md:px-20 shadow-[0_0_20px_rgba(217,9,8,0.3)] z-20 relative">
          <div className="hidden sm:block">&gt;_ SYS.COPYRIGHT // AUTHENTICATED</div>
          <motion.p
            className="text-xs sm:text-sm lg:text-base flex flex-row tracking-widest items-center"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            &copy; {new Date().getFullYear()} &nbsp; // &nbsp;
            <motion.a
              className="hover:text-white transition-colors ml-2"
              href="https://www.instagram.com/artvader04/"
              target="_blank"
              animate={{ opacity: [1, 1, 0, 1] }} // fade in, fade out, fade in
              transition={{
                duration: 5, // total blink cycle
                repeat: Infinity, // infinite looping
                ease: "easeInOut",
              }}
            >
              DIMENSIONZ FX
            </motion.a>
          </motion.p>
        </div>

        <Footer />
      </div>

      {/* Modal */}
      <ImageModal
        images={images}
        selectedIndex={selectedIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
