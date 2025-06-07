import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedList = ({
  items,
  onItemSelect,
  showGradients = false,
  enableArrowNavigation = false,
  displayScrollbar = false,
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
    relative flex items-center border-b border-gray-300 py-4 cursor-pointer
    ${highlightedIndex === index ? 'bg-gray-100' : ''}
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
            className="py-2 border-t border-gray-300"
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
                  <div className="flex items-center flex-1">
                    <span className="text-sm font-light text-gray-500 mr-4 select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-2xl font-normal text-gray-900 uppercase tracking-wide leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onUpvote) onUpvote(item.id, item.votes);
                    }}
                    className="ml-4 text-3xl text-gray-700 hover:text-gray-900 transition-colors duration-200 ease-in-out focus:outline-none"
                    title="Upvote this activity"
                  >
                    &#8599;
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