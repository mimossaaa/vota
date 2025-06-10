import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScrollList from './InfiniteScrollList.jsx';
import ActivityItem from './ActivityItem.jsx';
// import { supabase } from '../supabaseClient.js'; // Removed as activities are now passed via props

function ActivityList({ activities, onUpvote }) {
  // Activities are now passed as a prop from App.jsx
  // const [activities, setActivities] = useState([]); // Removed
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 5;

  // No longer fetching activities internally
  // const fetchActivities = useCallback(async (currentPage) => { ... }); // Removed

  // No longer a need for this useEffect as activities are managed by App.jsx
  // useEffect(() => { ... }, []); // Removed

  const loadMore = useCallback(() => {
    // This function's logic needs to be revisited if we implement pagination
    // where App.jsx fetches paginated data. For now, it's a placeholder.
    console.log('Load more called, but activities are managed by App.jsx');
    // As all activities are passed, hasMore might always be false if all are loaded at once.
    // Or, we need to pass a 'totalActivitiesCount' from App.jsx to properly calculate hasMore.
    if (activities.length > (page + 1) * ITEMS_PER_PAGE) {
      setPage(prevPage => prevPage + 1);
    }
  }, [activities.length, page, ITEMS_PER_PAGE]);

  const handleItemSelect = useCallback((item, index) => {
    console.log(`Selected item: ${item.title} at index ${index}`);
    // Existing item selection logic
  }, []);

  // handleActivityUpdate is no longer needed here as App.jsx manages activity updates
  // const handleActivityUpdate = useCallback((updatedActivity) => { ... }); // Removed

  const paginatedActivities = activities.slice(0, (page + 1) * ITEMS_PER_PAGE);
  const hasMore = paginatedActivities.length < activities.length; // Determine hasMore based on actual activities length

  return (
    <div className="max-h-96 overflow-y-auto scrollbar-hide">
      <InfiniteScrollList
        items={paginatedActivities}
        renderItem={(item, index, isSelected, handleItemClick) => (
          <ActivityItem
            key={item.id}
            activity={item}
            onUpvote={onUpvote}
            isSelected={isSelected}
            onClick={handleItemClick}
            // onActivityUpdate is no longer needed here
          />
        )}
        onItemSelect={handleItemSelect}
        loadMoreItems={loadMore}
        hasMore={hasMore}
        isLoading={false} // isLoading should be managed by App.jsx or determined based on fetch status there
        enableArrowNavigation={true}
        scrollThreshold={200}
      />

      {/* Conditional rendering for loading and end of list. Adjust as needed. */}
      {/* If App.jsx handles loading, these messages might not be needed here */}
      {/* {isLoading && <p className="text-center text-gray-600 my-4">Loading more activities...</p>}
      {!hasMore && paginatedActivities.length > 0 && <p className="text-center text-gray-600 my-4">You've reached the end of the list.</p>} */}
    </div>
  );
}

export default ActivityList; 