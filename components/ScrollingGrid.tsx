import React, { useEffect, useRef } from "react";

const ScrollingGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const gridItems = gsap.utils.toArray<HTMLElement>(".grid__item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gridItems.forEach((item) => {
        const inner = item.querySelector<HTMLElement>(".grid__item-inner");
        if (!inner) {
          // eslint-disable-next-line no-console
          console.warn("Inner element not found for grid item");
          return;
        }

        gsap.set(item, { z: -3000 });
        gsap.set(inner, { scale: 2 });

        tl.to(
          item,
          {
            z: 0,
            ease: "none",
          },
          0,
        ).to(
          inner,
          {
            scale: 1,
            ease: "none",
          },
          0,
        );
      });

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (gridRef.current) {
            gsap.to(gridRef.current, {
              rotationX: 20 * (self.progress - 0.5),
              rotationY: 20 * (self.progress - 0.5),
              ease: "none",
            });
          }
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };

    initializeGSAP().catch((error) => {
      // eslint-disable-next-line no-console
      console.error("Error initializing GSAP:", error);
    });
  }, []);

  return (
    <div className="grid" ref={gridRef}>
      <div className="grid-wrap">
        <div className="grid__item">
          <div className="grid__item-inner" style={{ backgroundImage: "url(/images/1.png)" }}></div>
        </div>
        <div className="grid__item">
          <div className="grid__item-inner" style={{ backgroundImage: "url(/images/2.png)" }}></div>
        </div>
        <div className="grid__item">
          <div className="grid__item-inner" style={{ backgroundImage: "url(/images/3.png)" }}></div>
        </div>
        <div className="grid__item">
          <div className="grid__item-inner" style={{ backgroundImage: "url(/images/4.png)" }}></div>
        </div>
        <div className="grid__item">
          <div className="grid__item-inner" style={{ backgroundImage: "url(/images/5.png)" }}></div>
        </div>
        <div className="grid__item">
          <div className="grid__item-inner" style={{ backgroundImage: "url(/images/6.png)" }}></div>
        </div>
        <div className="grid__item">
          <div className="grid__item-inner" style={{ backgroundImage: "url(/images/7.png)" }}></div>
        </div>
        <div className="grid__item">
          <div className="grid__item-inner" style={{ backgroundImage: "url(/images/8.png)" }}></div>
        </div>
        <div className="grid__item">
          <div className="grid__item-inner" style={{ backgroundImage: "url(/images/9.png)" }}></div>
        </div>
        <div className="grid__item">
          <div className="grid__item-inner" style={{ backgroundImage: "url(/images/10.png)" }}></div>
        </div>
        <div className="grid__item">
          <div className="grid__item-inner" style={{ backgroundImage: "url(/images/11.png)" }}></div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingGrid;
