import React from 'react';
import RotatingText from './RotatingText.jsx';

function Header() {
  return (
    <header className="w-full max-w-2xl text-left mb-8">
      {/* 
        MODIFIED: The H1 is now a single HORIZONTAL flex container to align all
        elements on one line.
        - `flex`, `items-baseline`, and `gap-x-4` create a horizontal row with
          proper alignment and consistent spacing.
        - `flex-wrap` is added to allow elements to wrap gracefully on smaller screens.
        - The previous multi-line structure with `flex-col` has been removed.
        - All elements ("Next stream,", emojis, and RotatingText) are now
          direct children of the H1.
      */}
      <h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-4 animate-fade-in-down flex flex-wrap items-baseline gap-x-4"
        style={{ color: '#1a1a1a' }}
      >
        {/* The static text "Next stream," */}
        <span>Next stream,</span>

        {/* 
          The emojis are a direct child of the flex container, allowing them
          to align naturally with the text. `shrink-0` prevents them from
          shrinking on smaller screens.
        */}
        <span className="shrink-0">🏀🐗</span>

        {/* 
          The RotatingText component is also a direct child.
          The `ml-2` class was removed as the parent's `gap-x-4` now handles spacing.
        */}
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
      </h1>
    </header>
  );
}

export default Header;