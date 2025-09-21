import React from "react";

const Credits = (visible) => {
  if (!visible) return null;
  return (
    <div className="w-full h-full bg-black/60 text-white text-3xl backdrop-blur-3xl">
      Credits
    </div>
  );
};

export default Credits;
