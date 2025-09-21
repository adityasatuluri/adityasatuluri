import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Test() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Dynamically calculate grid size based on viewport
  const cols = Math.floor(window.innerWidth / 30); // ~30px per column
  const rows = Math.floor(window.innerHeight / 30); // ~30px per row
  const spacing = 30; // px gap between dots

  useEffect(() => {
    const updateMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center bg-black w-full h-full min-h-screen"
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${spacing}px)`,
          gridTemplateRows: `repeat(${rows}, ${spacing}px)`,
          gap: "0px",
        }}
      >
        {[...Array(cols * rows)].map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;

          // dot center position
          const x = col * spacing + spacing / 2;
          const y = row * spacing + spacing / 2;

          // container offset
          const rect = containerRef.current?.getBoundingClientRect();
          const mouseX = mouse.x - (rect?.left ?? 0);
          const mouseY = mouse.y - (rect?.top ?? 0);

          const dist = Math.hypot(mouseX - x, mouseY - y);
          const maxDist = 150; // Cap distance for smoother falloff
          const scale = Math.max(1, 6 - (dist > maxDist ? maxDist : dist) / 20); // Adjusted falloff

          return (
            <motion.div
              key={i}
              className="rounded-full bg-white"
              style={{ width: 3, height: 3 }}
              animate={{ scale }}
              transition={{ type: "tween", duration: 0.1, ease: "easeOut" }} // Optimized transition
            />
          );
        })}
      </div>
    </div>
  );
}