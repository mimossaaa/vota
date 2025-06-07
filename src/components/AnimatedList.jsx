import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedList = ({
  items,
  onItemSelect,
  showGradients = false,
  enableArrowNavigation = false,
  displayScrollbar = false,
}) => {
  const listRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleKeyDown = useCallback((event) => {
    if (!enableArrowNavigation || !items || items.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % items.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    } else if (event.key === 'Enter' && highlightedIndex !== -1) {
      event.preventDefault();
      onItemSelect(items[highlightedIndex], highlightedIndex);
    }
  }, [enableArrowNavigation, items, highlightedIndex, onItemSelect]);

  useEffect(() => {
    if (enableArrowNavigation) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [enableArrowNavigation, handleKeyDown]);

  useEffect(() => {
    if (listRef.current && highlightedIndex !== -1) {
      const highlightedItem = listRef.current.children[highlightedIndex];
      if (highlightedItem) {
        highlightedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const listItemClassName = (index) => `
    relative flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] cursor-pointer
    ${highlightedIndex === index ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
  `;

  return (
    <div className={`relative ${displayScrollbar ? 'overflow-y-auto' : 'overflow-hidden'} max-h-96 rounded-lg`}>
      {
        items.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-8">
            No activities yet. Be the first to suggest one!
          </p>
        ) : (
          <motion.div
            ref={listRef}
            className="space-y-4 py-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id || item.title || index}
                  variants={itemVariants}
                  className={listItemClassName(index)}
                  onClick={() => onItemSelect(item, index)}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">Votes: <span className="font-bold text-blue-600">{item.votes}</span></p>
                  </div>
                  {/* Assuming an upvote button similar to ActivityItem if needed */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent item selection on button click
                      // This is where you would call your upvote logic
                      // For now, it just logs, you'll need to pass upvote prop to AnimatedList
                      if (item.onUpvote) item.onUpvote(item.id, item.votes); 
                      else console.log('Upvote button clicked for:', item.title);
                    }}
                    className={
                      `ml-4 px-5 py-2 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out
                      ${item.hasVoted ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}
                    `}
                    disabled={item.hasVoted}
                    title={item.hasVoted ? 'You have already upvoted this activity' : 'Upvote this activity'}
                  >
                    {item.hasVoted ? 'Voted! 👍' : 'Upvote ▲'}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )
      }

      {showGradients && (
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      )}
    </div>
  );
};

export default AnimatedList; 