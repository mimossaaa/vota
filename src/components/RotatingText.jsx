import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RotatingText = ({
  texts,
  mainClassName,
  staggerFrom,
  initial,
  animate,
  exit,
  staggerDuration,
  splitLevelClassName,
  transition,
  rotationInterval,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts, rotationInterval]);

  const currentText = texts[currentIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        staggerDirection: staggerFrom === "last" ? -1 : 1,
      },
    },
  };

  return (
    <div className={mainClassName}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentText}
          className="flex"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {currentText.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="whitespace-nowrap">
              {word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  className={splitLevelClassName}
                >
                  <motion.span
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={transition}
                  >
                    {char}
                  </motion.span>
                </motion.span>
              ))}
              {wordIndex < currentText.split(' ').length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText; 