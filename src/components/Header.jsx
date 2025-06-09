import React from 'react';
import RotatingText from './RotatingText.jsx';

function Header() {
  return (
    <header className="w-full max-w-2xl text-center mb-8">
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-tight mb-4 animate-fade-in-down flex items-center justify-center" style={{ color: '#1a1a1a' }}>
        Next stream, 
        <RotatingText
          texts={['cooking', 'fishing', 'fortnite']}
          mainClassName="px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg ml-2"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
          style={{ backgroundColor: '#333333', color: '#f0f0f0' }}
        />
      </h1>
      <p className="text-xl font-serif" style={{ color: '#333333' }}>
      🏀🐗
      </p>
    </header>
  );
}

export default Header; 