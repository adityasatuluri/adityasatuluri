import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { Suspense, useState } from "react";
const CyberpunkIcon = new URL("../assets/init.jpg", import.meta.url).href;

function Credits({ visible, onClose }) {
  if (!visible) return null;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {}, [loaded]);

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center w-screen h-screen  backdrop-blur-sm">
      <div
        className="lg:w-[90vw] lg:h-[90vh] lg:bg-black/90 w-full  h-full 
        rounded-2xl bg-black/90 backdrop-blur-lg 
        p-4 sm:p-6 md:p-8 shadow-2xl overflow-y-auto"
      >
        {/* HEADER */}
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="text-white text-2xl md:text-3xl font-light hover:text-red-600 transition-colors duration-300"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className=" flex justify-center items-center">
          <div className="flex flex-col gap-8 w-[90vw] md:w-[60vw] lg:w-[50vw] align-middle text-white text-base sm:text-lg md:text-xl">
            {/* Cyberpunk Card */}
            {/* <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/track/2u1FWVxAb16qbgwPgygAdj?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            /> */}

            <div className="w-full border border-neutral-600 rounded-xl p-5 flex flex-col sm:flex-row gap-6 sm:gap-10">
              <img
                src={CyberpunkIcon}
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain mx-auto sm:mx-0 border-2 text-white border-neutral-800"
                alt="Cyberpunk 2077 Icon"
                loading="lazy"
                onLoad={() => setLoaded(true)}
              />

              <div className="flex flex-col justify-between gap-4 sm:gap-6 w-full">
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                  Init
                </p>
                <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                  <p className="opacity-50">Artist</p>
                  <GoDotFill className="h-4 w-4 opacity-50" />
                  <p>Nine Inch Nails</p>
                </div>

                <a
                  href="https://open.spotify.com/track/29XfG8hFSaJuvnoWv6iS0B?si=d889e580f5cf4a17"
                  target="_blank"
                  className="py-2 sm:py-3 px-4 w-full sm:w-auto text-center bg-white text-black rounded-lg hover:bg-[#1DB954] hover:text-black transition-all duration-300 ease-in-out"
                >
                  Play
                </a>
              </div>
            </div>

            {/* Credits Note */}
            <div className="w-full border border-neutral-600 rounded-xl p-5 flex justify-center items-center">
              <p className="text-center text-sm sm:text-base md:text-lg opacity-80">
                Screenshots captured from in-game footage of Cyberpunk 2077
              </p>
            </div>

            <div className="w-full border border-neutral-600 rounded-xl p-5 flex justify-center items-center">
              <p className="text-center text-sm sm:text-base md:text-lg opacity-80">
                Glitch Animations from{" "}
                <a
                  href="https://pixabay.com/users/ceos_stock-13890949/"
                  target="_blank"
                >
                  <span className="text-red-500 hover:underline transition-all duration-300 ease-in-out">
                    Ceos_Stock
                  </span>
                </a>{" "}
                &{" "}
                <a
                  href="https://www.pexels.com/@milan-matos-10954071/"
                  target="_blank"
                >
                  <span className="text-red-500 hover:underline transition-all duration-300 ease-in-out">
                    Milan Matos
                  </span>
                </a>
              </p>
            </div>

            <div className="w-full border border-neutral-600 rounded-xl p-5 flex justify-center items-center">
              <p className="text-center text-sm sm:text-base md:text-lg opacity-80">
                Artworks by Aditya Satuluri - Copyright &copy;{" "}
                {new Date().getFullYear()} &nbsp;
                <a
                  className="hover:underline text-red-500 transition-all duration-300 ease-in-out"
                  href="https://www.instagram.com/dimensionz.fx/"
                  target="blank"
                >
                  DimensionZ FX
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credits;
