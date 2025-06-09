import React from 'react';
import RotatingText from './RotatingText.jsx';

function Header() {
  return (
    <header className="w-full max-w-2xl text-left mb-8">
      <h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-tight mb-4 animate-fade-in-down flex flex-col"
        style={{ color: '#1a1a1a' }}
      >
        {/* TOP ROW: This contains the text and the rotating word. */}
        <div className="flex items-baseline gap-x-4">
          {/* 
            MODIFIED: Added `whitespace-nowrap` to the span.
            This is the critical fix that prevents "Next stream," from
            breaking into multiple lines at large font sizes.
          */}
          <span className="whitespace-nowrap">Next stream,</span>

          <RotatingText
            texts={['cooking', 'fishing', 'fortnite']}
            mainClassName="px-2 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-2 rounded-lg"
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.025}
            splitLevelClassName="pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={2000}
            style={{ backgroundColor: '#333333', color: '#f0f0f0' }}
          />
        </div>

        {/* BOTTOM ROW: The emojis will now render correctly underneath the single top line. */}
        <span>🏀🐗</span>
      </h1>
    </header>
  );
}

export default Header;