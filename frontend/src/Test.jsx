import React from "react";
import { GoTriangleUp } from "react-icons/go";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

const Test = () => {
  const [text, setText] = useState(" This is a test component");

  useEffect(() => {}, [text]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const generateTest = () => {
    setText("HIIIIII \n This is a test component \n Let's see how it works");
  };

  return (
    <div
      className="w-[100vw] h-[100vh] text-black justify-center align-middle flex items-center 
    bg-[radial-gradient(circle_at_center,#f9f9f9,#cccccc,#b5b5b5)]"
    >
      <div className=" text-2xl">
        <motion.p
          key={text}
          initial={{ scaleY: 0.8 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
        <div className="flex flex-col items-center gap-1">
          <motion.hr
            key={text}
            initial={{ scaleX: 0.3 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="font-bold text-black w-full "
          ></motion.hr>
          <GoTriangleUp
            className="text-5xl text-red-600 p-0 mt-[-1vh] cursor-pointer hover:scale-110"
            onClick={() => generateTest()}
          />
        </div>
      </div>
    </div>
  );
};

export default Test;
