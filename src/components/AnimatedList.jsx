import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedList = ({
  items,
  onItemSelect,
  showGradients = false,
  enableArrowNavigation = false,
  onUpvote
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
    relative flex items-center py-4 cursor-pointer
    ${highlightedIndex === index ? 'bg-gray-100' : ''}
  `;

  return (
    <div className="overflow-y-auto max-h-96 hides-scrollbar">
      {
        items.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-8">
            No activities yet. Be the first to suggest one!
          </p>
        ) : (
          <motion.div
            ref={listRef}
            className="py-2"
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
                  <div className="flex flex-col items-start flex-1">
                    <h3 className="text-5xl font-normal text-gray-900 leading-tight mb-1">
                      {item.title}
                    </h3>
                    <span className="text-lg font-light text-gray-500 mt-1">
                      {item.year}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onUpvote) onUpvote(item.id, item.votes);
                    }}
                    className={`ml-4 px-3 py-1 border-2 border-gray-900 text-gray-900 font-bold text-sm uppercase leading-none
                      ${item.hasVoted ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'}
                    `}
                    disabled={item.hasVoted}
                    title={item.hasVoted ? 'You have already upvoted this activity' : 'Upvote this activity'}
                  >
                    {item.hasVoted ? 'Voted' : 'Upvote'}
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