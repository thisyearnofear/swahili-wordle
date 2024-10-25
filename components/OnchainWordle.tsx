import React, { useEffect, useRef } from "react";

const OnChainWordle = () => {
  const onChainWordleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      gsap.to(onChainWordleRef.current, {
        scrollTrigger: {
          trigger: onChainWordleRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        opacity: 1,
        y: 0,
      });
    };

    initializeGSAP().then(
      () => {
        console.log("GSAP initialized successfully");
      },
      (error) => {
        console.error("Error initializing GSAP:", error);
      },
    );
  }, []);

  return (
    <div
      ref={onChainWordleRef}
      style={{
        minHeight: "100vh",
        opacity: 0,
        transform: "translateY(50px)",
      }}
    >
      <h1>On-Chain Wordle</h1>
      {/* Your on-chain Wordle game implementation goes here */}
    </div>
  );
};

export default OnChainWordle;
