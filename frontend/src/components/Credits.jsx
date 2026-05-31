import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { Suspense, useState } from "react";
const CyberpunkIcon = new URL("../assets/init.jpg", import.meta.url).href;

function Credits({ visible, onClose }) {
  if (!visible) return null;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {}, [loaded]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center w-screen h-screen backdrop-blur-md bg-black/80 p-4">
      <div className="w-full max-w-3xl lg:w-[50vw] max-h-[90vh] bg-[#D90908] cyber-box p-[1px] shadow-[0_0_30px_rgba(217,9,8,0.2)] flex flex-col relative">
        <div className="w-full h-full bg-black/95 relative flex flex-col" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)" }}>
          
          {/* Terminal Header */}
          <div className="bg-[#D90908]/10 border-b border-[#D90908]/30 px-5 py-3 flex justify-between items-center shrink-0">
            <span className="font-bold font-mono text-sm text-[#D90908]">>_ SYS.CREDITS.DAT</span>
            <button
              onClick={onClose}
              className="text-[#D90908] hover:text-white transition-colors duration-300 font-bold font-mono text-sm"
            >
              [X]
            </button>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col gap-10 scrollbar-hide">
            
            <div className="flex flex-col gap-6 text-[#f0f0f0] font-mono">
              
              {/* Music Card */}
              <div className="w-full border border-[#D90908]/20 bg-[#D90908]/5 p-4 flex flex-row items-center gap-5 sm:gap-6 relative group hover:border-[#D90908]/50 transition-colors">
                <img
                  src={CyberpunkIcon}
                  className="w-16 h-16 sm:w-24 sm:h-24 object-cover border border-[#D90908]/30 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                  alt="Track Cover"
                  loading="lazy"
                  onLoad={() => setLoaded(true)}
                />

                <div className="flex flex-col flex-1 justify-center">
                  <div className="text-[10px] sm:text-xs text-[#D90908] font-bold tracking-widest mb-1">>_ AUDIO.STREAM</div>
                  <p className="text-lg sm:text-xl font-bold uppercase tracking-widest text-white leading-none mb-1">
                    Init
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">Nine Inch Nails</p>
                </div>

                <div className="bg-[#D90908]/50 cyber-button p-[1px] shadow-[0_0_10px_rgba(217,9,8,0.2)]">
                  <a
                    href="https://open.spotify.com/track/29XfG8hFSaJuvnoWv6iS0B?si=d889e580f5cf4a17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex cyber-button px-4 py-2 bg-black text-[#D90908] hover:bg-[#D90908] hover:text-black transition-colors font-bold tracking-widest uppercase text-[10px] sm:text-xs items-center justify-center whitespace-nowrap"
                  >
                    PLAY
                  </a>
                </div>
              </div>

              {/* Logs */}
              <div className="flex flex-col gap-6 mt-2">
                <div className="flex flex-col gap-1 border-l-2 border-[#D90908]/40 pl-4 py-1 hover:border-[#D90908] transition-colors">
                  <div className="text-[10px] sm:text-xs text-[#D90908] font-bold tracking-widest">>_ LOG.ENTRY: 01</div>
                  <p className="text-xs sm:text-sm text-gray-400">Screenshots captured from in-game footage of Cyberpunk 2077.</p>
                </div>

                <div className="flex flex-col gap-1 border-l-2 border-[#D90908]/40 pl-4 py-1 hover:border-[#D90908] transition-colors">
                  <div className="text-[10px] sm:text-xs text-[#D90908] font-bold tracking-widest">>_ LOG.ENTRY: 02</div>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Glitch Animations by{" "}
                    <a href="https://pixabay.com/users/ceos_stock-13890949/" target="_blank" rel="noopener noreferrer" className="text-[#D90908] hover:text-white transition-colors underline decoration-[#D90908]/30 hover:decoration-white">Ceos_Stock</a>
                    {" "}&{" "}
                    <a href="https://www.pexels.com/@milan-matos-10954071/" target="_blank" rel="noopener noreferrer" className="text-[#D90908] hover:text-white transition-colors underline decoration-[#D90908]/30 hover:decoration-white">Milan Matos</a>.
                  </p>
                </div>

                <div className="flex flex-col gap-1 border-l-2 border-[#D90908]/40 pl-4 py-1 hover:border-[#D90908] transition-colors">
                  <div className="text-[10px] sm:text-xs text-[#D90908] font-bold tracking-widest">>_ LOG.ENTRY: 03</div>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Artworks by Aditya Satuluri // Copyright &copy; {new Date().getFullYear()} //{" "}
                    <a href="https://www.instagram.com/artvader04/" target="_blank" rel="noopener noreferrer" className="text-[#D90908] hover:text-white transition-colors underline decoration-[#D90908]/30 hover:decoration-white">DimensionZ FX</a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Credits;
