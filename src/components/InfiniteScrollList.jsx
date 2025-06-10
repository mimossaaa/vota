import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const InfiniteScrollList = ({
  items,
  renderItem,
  onItemSelect,
  loadMoreItems,
  hasMore,
  isLoading,
  enableArrowNavigation = true,
  initialSelectedIndex = -1,
  scrollThreshold = 100,
}) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);

  const handleKeyDown = useCallback((e) => {
    if (!enableArrowNavigation || !items || items.length === 0) return;

    let newIndex = selectedIndex;
    if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
      e.preventDefault();
      newIndex = Math.min(selectedIndex + 1, items.length - 1);
      setKeyboardNav(true);
      setSelectedIndex(newIndex);
    } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
      e.preventDefault();
      newIndex = Math.max(selectedIndex - 1, 0);
      setKeyboardNav(true);
      setSelectedIndex(newIndex);
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < items.length) {
        e.preventDefault();
        if (onItemSelect) {
          onItemSelect(items[selectedIndex], selectedIndex);
        }
      }
    }
  }, [enableArrowNavigation, items, selectedIndex, onItemSelect]);

  useEffect(() => {
    if (enableArrowNavigation) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [enableArrowNavigation, handleKeyDown]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;

    const container = listRef.current;
    const selectedItemElement = container.querySelector(`[data-infinite-scroll-index="${selectedIndex}"]`);

    if (selectedItemElement) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItemElement.offsetTop;
      const itemBottom = itemTop + selectedItemElement.offsetHeight;

      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth',
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  const handleScroll = useCallback(() => {
    if (!listRef.current || isLoading || !hasMore) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;

    if (scrollHeight - scrollTop - clientHeight < scrollThreshold) {
      loadMoreItems();
    }
  }, [isLoading, hasMore, loadMoreItems, scrollThreshold]);

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll);
      return () => {
        listElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <div ref={listRef} onScroll={handleScroll}>
      {items.length === 0 && !isLoading && !hasMore ? (
        <p>No items to display.</p>
      ) : (
        items.map((item, index) =>
          renderItem(item, index, index === selectedIndex, () => {
            setSelectedIndex(index);
            if (onItemSelect) {
              onItemSelect(item, index);
            }
          })
        )
      )}
      {isLoading && hasMore && (
        <p>Loading more items...</p>
      )}
      {!hasMore && !isLoading && items.length > 0 && (
        <p>You've reached the end of the list.</p>
      )}
    </div>
  );
};

export default InfiniteScrollList; 