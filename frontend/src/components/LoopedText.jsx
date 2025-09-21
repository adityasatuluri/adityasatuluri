import { useRef, useEffect } from "react";

const LoopedText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (textElement) {
      const duplicateText = textElement.innerText;
      textElement.innerHTML += ` ${duplicateText}`; // Duplicate the text for seamless looping
    }
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-10 bg-gray-900 text-white">
      <div
        ref={textRef}
        className="absolute whitespace-nowrap animate-scroll text-lg font-light"
      >
        Explore the Artworks - Infinite Creativity
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoopedText;
