import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";

export default function CyberText({ text, delay = 0, className = "" }) {
  const textRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !textRef.current) return;

    let split;
    let ctx;

    // Small delay to ensure React has painted and fonts are reasonably ready
    const timeout = setTimeout(() => {
      split = new SplitType(textRef.current, { types: "chars" });

      ctx = gsap.context(() => {
        gsap.set(split.chars, {
          opacity: 0,
          y: 15,
          rotateX: -90,
          color: "#D90908"
        });

        gsap.to(split.chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          color: "inherit",
          stagger: 0.04,
          duration: 0.6,
          ease: "back.out(1.5)",
          delay: delay,
        });
      }, textRef);
    }, 50);

    return () => {
      clearTimeout(timeout);
      if (split) split.revert();
      if (ctx) ctx.revert();
    };
  }, [text, delay, isMounted]);

  return (
    <div className={className} style={{ perspective: "400px" }}>
      <span 
        ref={textRef} 
        key={text}
        style={{ display: "inline-block" }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
