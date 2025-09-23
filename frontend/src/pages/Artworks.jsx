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
    <div className="w-full h-full bg-gray-800 animate-pulse rounded-lg"></div>
  );
}

// Lazy image loader with hover label
function LazyImage({ src, alt, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative w-full group overflow-hidden rounded-lg cursor-pointer"
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
        className={`w-full h-full object-cover block rounded-lg transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ minHeight: "16rem" }} // matches shimmer height
      />

      {/* Hover overlay with gradient */}
      <div
        className="absolute bottom-0 left-0 w-full px-3 py-3 text-white text-lg uppercase tracking-widest 
                bg-gradient-to-t from-black/80 via-black/40 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {getFileName(src)}
      </div>
    </div>
  );
}

// Modal for expanded view
function ImageModal({ images, selectedIndex, onClose, onPrev, onNext }) {
  if (selectedIndex === null) return null;

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-4xl font-light hover:text-red-600 duration-300 transition-all ease-in-out"
      >
        ✕
      </button>

      <button
        onClick={onPrev}
        className="absolute left-5 text-white text-7xl font-light hover:text-red-600 duration-300 transition-all ease-in-out"
      >
        ‹
      </button>

      <motion.img
        key={selectedIndex} // ensures animation runs on index change
        initial={{ opacity: 0, x: 0, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: easeInOut }}
        src={images[selectedIndex]}
        alt="expanded"
        className="max-h-[90vh] max-w-[70vw] rounded-lg shadow-lg"
      />

      <button
        onClick={onNext}
        className="absolute right-5 text-white text-7xl font-light hover:text-red-600 duration-300 transition-all ease-in-out"
      >
        ›
      </button>
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
      <div className="my-10 mx-10 flex flex-col gap-10">
        <motion.div
          className="text-white w-full h-full p-5 md:p-10 lg:p-10 border-1 border-red-600
                      flex flex-col justify-center items-center gap-5 abnes text-xl sm:text-3xl md:text-5xl lg:text-7xl
                      grain elements"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: easeInOut }}
          >
            ARTWORKS
          </motion.p>
          <motion.a
            href="https://www.instagram.com/dimensionz.fx/"
            target="blank"
            className="text-lg flex flex-row gap-10"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: easeInOut }}
          >
            <SiAdobe className="h-6 w-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            <SiBlender className="h-6 w-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            <SiUnrealengine className="h-6 w-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
          </motion.a>
        </motion.div>
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

      <Footer />

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
