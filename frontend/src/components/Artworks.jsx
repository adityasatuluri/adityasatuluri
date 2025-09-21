import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import neogaze from "../../public/NEOGAZEDARK.webp";
import neogazelit from "../../public/NEOGAZE.webp";

const Artworks = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [artworkImages, setArtworkImages] = useState([]);
  const [isButtonHovered, setIsButtonHovered] = useState(false); // New state for hover

  // Load images and set up interval
  useEffect(() => {
    // Dynamically load specific images from /public/artworks/neogaze/
    // const modules = import.meta.glob("/public/artworks/neogaze/*.webp", {
    //   eager: true,
    // });
    // const images = Object.keys(modules).map((path) => path);
    const filteredImages = [neogaze, neogazelit];
    if (filteredImages.length === 2) {
      setArtworkImages(filteredImages);
      let sequenceIndex = 0;
      const sequence = [
        2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1,
        1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1,
      ];
      const interval = setInterval(() => {
        if (!isButtonHovered) {
          // Only update if not hovered
          setCurrentImageIndex((prevIndex) => {
            const nextImage = sequence[sequenceIndex] - 1;
            sequenceIndex = (sequenceIndex + 1) % sequence.length;
            return nextImage;
          });
        }
      }, 100); // 0.15 seconds per step
      return () => clearInterval(interval);
    } else {
      console.warn(
        "Expected 2 images (NEOGAZEDARK.webp, NEOGAZE.webp) not found in /public/artworks/neogaze/"
      );
      setArtworkImages(["/public/artworks/neogaze/NEOGAZE.webp"]); // Fallback
    }
  }, [isButtonHovered]); // Re-run effect when hover state changes

  // Debug: Log images and current index
  useEffect(() => {
    // console.log("Artwork Images:", artworkImages);
    // console.log("Current Index:", currentImageIndex);
  }, [artworkImages, currentImageIndex]);

  return (
    <div
      className="w-full h-[50vh] sm:h-[50vh] md:h-[50vh] lg:h-[100vh] text-white relative overflow-hidden z-0"
      style={{
        backgroundImage: `url(${
          isButtonHovered && artworkImages.length > 0
            ? artworkImages[1] // Force NEOGAZE.webp on hover
            : artworkImages[currentImageIndex] || "/artworks/NEOGAZE.webp"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-black/60 grain font-bold flex flex-col items-center justify-center gap-6 px-4 sm:px-6 md:px-12 lg:px-0 text-4xl sm:text-5xl lg:text-8xl w-full h-full relative z-10">
        <h1 className="elements text-white text-center leading-tight tracking-wide elements">
          ARTWORKS
        </h1>
        <Link
          to="/artworks"
          onClick={() => {
            localStorage.setItem("selectedMenuItem", "Artworks");
          }}
          onMouseEnter={() => setIsButtonHovered(true)} // Set hover state
          onMouseLeave={() => setIsButtonHovered(false)} // Reset hover state
          className="elements text-lg sm:text-xl px-6 py-2 sm:px-8 sm:py-3 rounded-xl hover:shadow-lg bg-white/40 hover:bg-white hover:text-black transition-all duration-500 ease-in-out text-center"
        >
          Explore the Collection
        </Link>
      </div>
    </div>
  );
};

export default Artworks;
