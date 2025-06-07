import React from 'react';
import RotatingText from './RotatingText.jsx';

function Header() {
  return (
    <header className="w-full max-w-2xl text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 leading-tight mb-4 animate-fade-in-down flex items-center">
        Next stream, 
        <RotatingText
          texts={['cooking', 'fishing', 'try not to laugh']}
          mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg ml-2"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </h1>
      <p className="text-xl text-gray-600">
      🏀🐗
      </p>
    </header>
  );
}

export default Header; 