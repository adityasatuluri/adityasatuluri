import React, { useEffect, useRef, useState, useCallback } from "react";

const MomentumScroll = ({
  children,
  ease = 0.08,
  speed = 1.2,
  touchSpeed = 1.8,
  boundaryBounce = 0.1,
  onScrollProgress,
}) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollDataRef = useRef({
    ease: ease,
    current: 0,
    target: 0,
    velocity: 0,
    touchStart: null,
    touchCurrent: 0,
    isTouch: false,
    maxScroll: 0,
  });
  const rafRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateProgress = useCallback(() => {
    if (onScrollProgress && scrollDataRef.current.maxScroll > 0) {
      const progress =
        scrollDataRef.current.current / scrollDataRef.current.maxScroll;
      onScrollProgress(Math.max(0, Math.min(1, progress)));
    }
  }, [onScrollProgress]);

  const clampTarget = useCallback(() => {
    const data = scrollDataRef.current;
    const overshoot = boundaryBounce * window.innerHeight;

    if (data.target < -overshoot) {
      data.target = -overshoot;
    } else if (data.target > data.maxScroll + overshoot) {
      data.target = data.maxScroll + overshoot;
    }
  }, [boundaryBounce]);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let scrollTimeout;
    let isAnimating = false;

    // Update container height and max scroll
    const updateDimensions = () => {
      const contentHeight = content.getBoundingClientRect().height;
      const containerHeight = window.innerHeight;
      scrollDataRef.current.maxScroll = Math.max(
        0,
        contentHeight - containerHeight
      );

      // Clamp current position if content changed
      if (scrollDataRef.current.target > scrollDataRef.current.maxScroll) {
        scrollDataRef.current.target = scrollDataRef.current.maxScroll;
      }
    };

    // ResizeObserver for content changes
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(content);

    // Initial setup
    updateDimensions();

    // Wheel event handler
    const handleWheel = (e) => {
      e.preventDefault();

      const delta = e.deltaY * speed;
      scrollDataRef.current.target += delta;
      scrollDataRef.current.isTouch = false;

      clampTarget();

      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 200);
    };

    // Touch event handlers
    const handleTouchStart = (e) => {
      const data = scrollDataRef.current;
      data.touchStart = e.touches[0].clientY;
      data.touchCurrent = data.current;
      data.isTouch = true;
      data.velocity = 0;
    };

    const handleTouchMove = (e) => {
      const data = scrollDataRef.current;
      if (!data.touchStart) return;

      e.preventDefault();

      const touchY = e.touches[0].clientY;
      const diff = (data.touchStart - touchY) * touchSpeed;

      data.target = data.touchCurrent + diff;
      clampTarget();

      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 200);
    };

    const handleTouchEnd = () => {
      scrollDataRef.current.touchStart = null;
      scrollDataRef.current.isTouch = false;
    };

    // Smooth scroll animation
    const smoothScroll = () => {
      const data = scrollDataRef.current;

      // Calculate velocity for momentum
      const diff = data.target - data.current;
      data.velocity = diff * data.ease;

      // Apply momentum
      data.current += data.velocity;

      // Boundary bounce back
      if (data.current < 0) {
        data.target = 0;
        data.current *= 0.95; // Bounce back effect
      } else if (data.current > data.maxScroll) {
        data.target = data.maxScroll;
        data.current = data.maxScroll + (data.current - data.maxScroll) * 0.95;
      }

      // Round to avoid sub-pixel rendering
      data.current = Math.round(data.current * 100) / 100;

      // Apply transform with hardware acceleration
      content.style.transform = `translate3d(0, ${-data.current}px, 0)`;

      // Update scroll progress
      updateProgress();

      // Continue animation if there's movement
      if (Math.abs(data.velocity) > 0.1 || Math.abs(diff) > 0.1) {
        rafRef.current = requestAnimationFrame(smoothScroll);
        isAnimating = true;
      } else {
        isAnimating = false;
      }
    };

    // Start animation loop
    const startLoop = () => {
      if (!isAnimating) {
        rafRef.current = requestAnimationFrame(smoothScroll);
        isAnimating = true;
      }
    };

    // Throttled scroll start
    let wheelTimer;
    const throttledWheel = (e) => {
      handleWheel(e);
      if (!isAnimating) startLoop();

      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        if (!isAnimating) startLoop();
      }, 16);
    };

    // Event listeners
    if (!isMobile) {
      container.addEventListener("wheel", throttledWheel, { passive: false });
    }

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Start initial loop
    startLoop();

    // Handle window resize
    const handleResize = () => {
      updateDimensions();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      resizeObserver.disconnect();

      if (!isMobile) {
        container.removeEventListener("wheel", throttledWheel);
      }
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);

      clearTimeout(scrollTimeout);
      clearTimeout(wheelTimer);
    };
  }, [speed, touchSpeed, ease, clampTarget, updateProgress, isMobile]);

  // Scroll to function (can be exposed via ref)
  const scrollTo = useCallback((target, duration = 1000) => {
    const data = scrollDataRef.current;
    const start = data.current;
    const change = target - start;
    const startTime = Date.now();

    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);

      data.target = start + change * easeOut;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    animateScroll();
  }, []);

  return (
    <div
      ref={containerRef}
      className="momentum-scroll-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        cursor: isScrolling ? "grabbing" : isMobile ? "default" : "grab",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
      }}
    >
      <div
        ref={contentRef}
        className="momentum-scroll-content"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: "1000px",
          width: "100%",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MomentumScroll;
