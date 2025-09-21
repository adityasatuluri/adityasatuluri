import React, { useEffect, useRef } from "react";
import "./css/DayNightScrollBackground.css";

import morning from "../assets/cy-city-morning.png";
import afternoon from "../assets/cy-city-afternoon.png";
import evening from "../assets/cy-city-night.png";
import night from "../assets/cy-city.png";

const DayNightScrollBackground = () => {
  const morningRef = useRef(null);
  const afternoonRef = useRef(null);
  const eveningRef = useRef(null);
  const nightRef = useRef(null);

  const images = [morningRef, afternoonRef, eveningRef, nightRef];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.body.scrollHeight - windowHeight;

      const scrollFraction = scrollTop / totalHeight;
      const phase = scrollFraction * (images.length - 1);
      const index = Math.floor(phase);
      const alpha = phase - index;

      images.forEach((ref, i) => {
        if (ref.current) {
          if (i === index) {
            ref.current.style.opacity = 1 - alpha;
          } else if (i === index + 1) {
            ref.current.style.opacity = alpha;
          } else {
            ref.current.style.opacity = 0;
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div>
        <div className="background-container">
          <img
            ref={morningRef}
            src={morning}
            alt="Morning"
            className="bg-image"
          />
          <img
            ref={afternoonRef}
            src={afternoon}
            alt="Afternoon"
            className="bg-image"
          />
          <img
            ref={eveningRef}
            src={evening}
            alt="Evening"
            className="bg-image"
          />
          <img ref={nightRef} src={night} alt="Night" className="bg-image" />
        </div>

        <div className="content">
          <div className="section">Morning</div>
          <div className="section">Afternoon</div>
          <div className="section">Evening</div>
          <div className="section">Night</div>
        </div>
      </div>
    </>
  );
};

export default DayNightScrollBackground;
