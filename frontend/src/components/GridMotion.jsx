import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const GridMotion = ({ items = [], gradientColor = "black" }) => {
  const gridRef = useRef(null);
  const rowRefs = useRef([]);
  const mouseXRef = useRef(window.innerWidth / 2);
  const [isMobile, setIsMobile] = useState(false);

  const totalItems = 28;
  const defaultItems = Array.from(
    { length: totalItems },
    (_, index) => `Item ${index + 1}`
  );
  const combinedItems =
    items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip animations on mobile

    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e) => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = () => {
      const maxMoveAmount = isMobile ? 100 : 300; // Reduced movement on mobile
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount =
            ((mouseXRef.current / window.innerWidth) * maxMoveAmount -
              maxMoveAmount / 2) *
            direction;

          gsap.to(row, {
            x: moveAmount,
            duration:
              baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      removeAnimationLoop();
    };
  }, [isMobile]);

  return (
    <div
      ref={gridRef}
      className="h-[50vh] sm:h-[50vh] lg:h-[100vh] w-full overflow-hidden relative z-0 opacity-70"
    >
      <section
        className="w-full h-full overflow-hidden relative flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-[4]"></div>
        <div className="gap-2 sm:gap-3 lg:gap-4 flex-none relative w-[100vw] sm:w-[120vw] lg:w-[150vw] h-[100vh] sm:h-[120vh] lg:h-[150vh] grid grid-rows-8 lg:grid-rows-4 grid-cols-1 rotate-[-10deg] sm:rotate-[-12deg] lg:rotate-[-15deg] origin-center z-[2]">
          {[...Array(4)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-2 sm:gap-3 lg:gap-4 grid-cols-4 lg:grid-cols-8"
              style={{ willChange: "transform, filter" }}
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {[...Array(isMobile ? 3 : 7)].map((_, itemIndex) => {
                const content =
                  combinedItems[rowIndex * (isMobile ? 3 : 7) + itemIndex];
                return (
                  <div key={itemIndex} className="relative">
                    <div className="relative w-full h-full overflow-hidden rounded-[8px] sm:rounded-[10px] bg-[#111] flex items-center justify-center text-white text-sm sm:text-base lg:text-[1.5rem]">
                      {typeof content === "string" ||
                      typeof content === "object" ? (
                        <div
                          className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                          style={{ backgroundImage: `url(${content})` }}
                        ></div>
                      ) : (
                        <div className="p-2 sm:p-3 lg:p-4 text-center z-[1]">
                          {content}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default GridMotion;
