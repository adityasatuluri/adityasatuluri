import React from "react";

const ShinyText = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`text-[#b5b5b5a4] bg-clip-text inline-block ${className}
      [text-shadow:0_0_1px_#b5b5b5a4] 
      hover:[text-shadow:0_0_1px_#ffffff] transition-all duration-300 ease-in-out
      `}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        color: "transparent",
        animation: disabled
          ? "none"
          : `shine ${animationDuration} linear infinite`,
      }}
    >
      {text}

      {/* Local keyframes definition */}
      <style>
        {`
          @keyframes shine {
            0% {
              background-position: 100% 0;
            }
            100% {
              background-position: -100% 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ShinyText;
