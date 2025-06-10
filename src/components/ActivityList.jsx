import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScrollList from './InfiniteScrollList.jsx';
import ActivityItem from './ActivityItem.jsx';
import { supabase } from '../supabaseClient.js'; // Import supabase client

function ActivityList({ onUpvote }) {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 5;

  const fetchActivities = useCallback(async (currentPage) => {
    setIsLoading(true);
    // Simulate a network delay removed, replaced with actual fetch delay if needed

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE - 1;

    const { data, error } = await supabase
      .from('activities')
      .select('id, title, created_at, votes') // Select required columns
      .order('votes', { ascending: false }) // Primary sort: votes descending
      .order('title', { ascending: true }) // Secondary sort: title ascending
      .range(startIndex, endIndex);

    if (error) {
      console.error('Error fetching activities:', error.message);
      setHasMore(false); // No more items on error
    } else {
      if (data && data.length > 0) {
        setActivities((prevActivities) => {
          // Filter out duplicates if any, especially important with real-time updates or re-fetches
          const newActivityIds = new Set(data.map(a => a.id));
          const filteredPrevActivities = prevActivities.filter(a => !newActivityIds.has(a.id));
          return [...filteredPrevActivities, ...data];
        });
        setPage((prevPage) => prevPage + 1);
        if (data.length < ITEMS_PER_PAGE) {
          setHasMore(false);
        }
      } else {
        setHasMore(false); // No more items if data is empty
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Only fetch on initial load if no activities are present
    if (activities.length === 0 && !isLoading && hasMore) {
      fetchActivities(0);
    }
  }, [activities.length, isLoading, hasMore, fetchActivities]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      fetchActivities(page);
    }
  }, [hasMore, isLoading, fetchActivities, page]);

  const handleItemSelect = useCallback((item, index) => {
    console.log(`Selected item: ${item.title} at index ${index}`);
    // Existing item selection logic
  }, []);

  const handleActivityUpdate = useCallback((updatedActivity) => {
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
  }, []);

  return (
    <div className="max-h-96 overflow-y-auto">
      <InfiniteScrollList
        items={activities}
        renderItem={(item, index, isSelected, handleItemClick) => (
          <ActivityItem
            key={item.id}
            activity={item}
            onUpvote={onUpvote}
            isSelected={isSelected}
            onClick={handleItemClick}
            onActivityUpdate={handleActivityUpdate}
          />
        )}
        onItemSelect={handleItemSelect}
        loadMoreItems={loadMore}
        hasMore={hasMore}
        isLoading={isLoading}
        enableArrowNavigation={true}
        scrollThreshold={200}
      />

      {isLoading && hasMore && <p className="text-center text-gray-600 my-4">Loading more activities...</p>}
      {!hasMore && !isLoading && activities.length > 0 && <p className="text-center text-gray-600 my-4">You've reached the end of the list.</p>}
    </div>
  );
}

export default ActivityList; 