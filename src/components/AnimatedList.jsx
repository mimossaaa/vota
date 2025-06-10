import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ActivityItem from './ActivityItem';

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
    relative flex items-center cursor-pointer
    ${highlightedIndex === index ? 'bg-gray-100' : ''}
  `;

  return (
    <div className="">
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
                  <ActivityItem activity={item} onUpvote={onUpvote} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )
      }
    </div>
  );
};

export default AnimatedList; 