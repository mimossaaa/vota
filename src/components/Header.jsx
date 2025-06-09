import React from 'react';
import RotatingText from './RotatingText.jsx';

function Header() {
  return (
    <header className="w-full max-w-2xl text-left mb-8">
      {/* 
        - The h1 is a flex container to align the text block and the rotating text.
        - "items-end" helps to align the baseline of "Next stream," with the rotating text.
      */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-tight mb-4 animate-fade-in-down flex items-end flex-nowrap" style={{ color: '#1a1a1a' }}>
        
        {/* This div groups "Next stream," and the emojis into a vertical column */}
        <div className="flex flex-col">
          {/* Removed the extra space after the comma */}
          <span>Next stream,</span>
          {/* The emojis are now here, styled as a smaller span */}
          <span className="text-xl font-serif" style={{ color: '#333333' }}>
            🏀🐗
          </span>
        </div>

        <RotatingText
          texts={['cooking', 'fishing', 'fortnite']}
          mainClassName="px-2 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-2 rounded-lg ml-2"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
          style={{ backgroundColor: '#333333', color: '#f0f0f0' }}
        />
      </h1>
      {/* The original <p> tag for the emojis is no longer needed */}
    </header>
  );
}

export default Header;