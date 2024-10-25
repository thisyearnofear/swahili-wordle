import React, { useEffect, useRef } from "react";
import styles from "./OnChainWordle.module.css";

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

    initializeGSAP().catch((error) => {
      // Consider using a logging service or custom error handling here
      // For now, we'll keep the console.error but disable the eslint warning
      // eslint-disable-next-line no-console
      console.error("Error initializing GSAP:", error);
    });
  }, []);

  return (
    <div
      ref={onChainWordleRef}
      className={`OnChainWordle ${styles.container}`}
      style={{
        minHeight: "200vh",
        opacity: 0,
        transform: "translateY(50px)",
      }}
    >
      <h1 className={styles.title}>Welcome to On-Chain Wordle</h1>

      <section className={styles.section}>
        <h2>How to Play</h2>
        <ol>
          <li>
            Start by playing the off-chain version of the game at the top of the page. This is your practice round!
          </li>
          <li>You&apos;ll see images that provide clues for the on-chain Wordle word.</li>
          <li>The words in both Spanish and English are related to blockchain and crypto themes.</li>
          <li>Based on your practice and the image clues, you get one guess every 24 hours for the on-chain Wordle.</li>
        </ol>
      </section>

      <section className={styles.section}>
        <h2>Tips for Success</h2>
        <ul>
          <li>
            Pay close attention to the images as you scroll - they&apos;re your key to solving the on-chain Wordle!
          </li>
          <li>Use your practice games to familiarize yourself with common blockchain terms in both languages.</li>
          <li>Remember, you only get one guess per day for the on-chain version, so make it count!</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>On-Chain Wordle Rules</h2>
        <p>The on-chain Wordle follows similar rules to the practice version, with a few key differences:</p>
        <ul>
          <li>You only get one guess every 24 hours.</li>
          <li>The word is always related to blockchain or cryptocurrency.</li>
          <li>Your guess is recorded on the blockchain, making it immutable and verifiable.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Ready to Play?</h2>
        <p>Scroll down to make your on-chain guess!</p>
      </section>

      <div className={styles.placeholder}>
        <h2>On-Chain Wordle Game</h2>
        <p>Your on-chain Wordle interface will be implemented here.</p>
        {/* Placeholder for the actual game interface */}
        <div className={styles.gameInterface}>
          <input type="text" placeholder="Enter your guess" className={styles.guessInput} />
          <button className={styles.submitButton}>Submit On-Chain Guess</button>
        </div>
      </div>
    </div>
  );
};

export default OnChainWordle;
