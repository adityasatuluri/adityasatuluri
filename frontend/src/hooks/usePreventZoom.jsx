// usePreventZoom.js
import { useEffect } from "react";

const usePreventZoom = () => {
  useEffect(() => {
    const handleKeydown = (e) => {
      // Prevents Ctrl/Cmd + '+', '-', or '='
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "-" || e.key === "=")
      ) {
        e.preventDefault();
      }
    };

    const handleWheel = (e) => {
      // Prevents Ctrl/Cmd + Scroll Wheel
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeydown, { passive: false });
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      // Cleanup: remove event listeners when the component unmounts
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);
};

export default usePreventZoom;
