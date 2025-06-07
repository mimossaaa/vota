import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RotatingText = ({
  texts,
  mainClassName = "",
  staggerFrom = "first", // Can be 'first' or 'last'
  initial = { y: "100%" },
  animate = { y: 0 },
  exit = { y: "-120%" },
  staggerDuration = 0.075,
  splitLevelClassName = "",
  transition = { type: "spring", damping: 10, stiffness: 100 },
  rotationInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  const currentText = texts[currentIndex];
  const words = currentText.split(' ');

  const getCharVariants = () => ({
    initial: initial,
    animate: animate,
    exit: exit,
  });

  return (
    <div className={`relative inline-flex ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentText}
          className="inline-flex"
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            staggerChildren: staggerFrom === "first" ? staggerDuration : -staggerDuration,
          }}
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className="whitespace-nowrap inline-flex">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={getCharVariants()}
                  transition={transition}
                  className={splitLevelClassName}
                >
                  {char}
                </motion.span>
              ))}
              {wordIndex < words.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText; 