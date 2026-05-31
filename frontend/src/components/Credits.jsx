import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { Suspense, useState } from "react";
const CyberpunkIcon = new URL("../assets/init.jpg", import.meta.url).href;

function Credits({ visible, onClose }) {
  if (!visible) return null;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {}, [loaded]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center w-screen h-screen backdrop-blur-sm bg-black/80">
      <div
        className="w-full h-full lg:w-[60vw] lg:h-auto lg:max-h-[85vh] bg-black border border-[#D90908]/50 shadow-[0_0_30px_rgba(217,9,8,0.3)] cyber-box flex flex-col p-1 relative overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="bg-[#D90908] text-black font-mono text-sm sm:text-base px-4 py-2 flex justify-between items-center shrink-0">
          <span className="font-bold">>_ SYS.CREDITS.DAT</span>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors duration-300 font-bold"
          >
            [X]
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-8 scrollbar-hide bg-black/90">
          <h2 className="abnes text-white text-3xl sm:text-4xl lg:text-5xl tracking-widest">
            CREDITS
          </h2>
          
          <div className="flex flex-col gap-6 text-white text-base sm:text-lg font-mono">
            
            {/* Music Card */}
            <div className="w-full border border-[#D90908]/30 border-l-4 border-l-[#D90908] bg-black/50 p-5 flex flex-col sm:flex-row gap-6 sm:gap-8 relative group hover:bg-[#D90908]/10 transition-colors">
              <img
                src={CyberpunkIcon}
                className="w-32 h-32 sm:w-40 sm:h-40 object-cover border border-[#D90908]/50 shrink-0"
                alt="Track Cover"
                loading="lazy"
                onLoad={() => setLoaded(true)}
              />

              <div className="flex flex-col justify-between w-full py-1">
                <p className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-[#D90908] leading-none">
                  Init
                </p>
                <div className="flex items-center gap-2 text-sm sm:text-base text-gray-400">
                  <p>ARTIST</p>
                  <span className="text-[#D90908]">//</span>
                  <p>Nine Inch Nails</p>
                </div>

                <a
                  href="https://open.spotify.com/track/29XfG8hFSaJuvnoWv6iS0B?si=d889e580f5cf4a17"
                  target="_blank"
                  className="py-2 px-6 w-full sm:w-auto text-center border border-[#D90908] text-[#D90908] hover:bg-[#D90908] hover:text-black transition-all duration-300 font-bold tracking-widest uppercase"
                >
                  EXECUTE_PLAY
                </a>
              </div>
            </div>

            {/* Note 1 */}
            <div className="w-full border-b border-[#D90908]/30 pb-4">
              <div className="text-xs text-[#D90908]/60 mb-1">>_ LOG.ENTRY: 01</div>
              <p className="text-sm sm:text-base text-gray-300">
                Screenshots captured from in-game footage of Cyberpunk 2077.
              </p>
            </div>

            {/* Note 2 */}
            <div className="w-full border-b border-[#D90908]/30 pb-4">
              <div className="text-xs text-[#D90908]/60 mb-1">>_ LOG.ENTRY: 02</div>
              <p className="text-sm sm:text-base text-gray-300">
                Glitch Animations by{" "}
                <a
                  href="https://pixabay.com/users/ceos_stock-13890949/"
                  target="_blank"
                  className="text-[#D90908] hover:text-white transition-colors underline decoration-[#D90908]/50"
                >
                  Ceos_Stock
                </a>{" "}
                &{" "}
                <a
                  href="https://www.pexels.com/@milan-matos-10954071/"
                  target="_blank"
                  className="text-[#D90908] hover:text-white transition-colors underline decoration-[#D90908]/50"
                >
                  Milan Matos
                </a>.
              </p>
            </div>

            {/* Note 3 */}
            <div className="w-full pb-4">
              <div className="text-xs text-[#D90908]/60 mb-1">>_ LOG.ENTRY: 03</div>
              <p className="text-sm sm:text-base text-gray-300">
                Artworks by Aditya Satuluri // Copyright &copy; {new Date().getFullYear()} //{" "}
                <a
                  className="text-[#D90908] hover:text-white transition-colors underline decoration-[#D90908]/50"
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
