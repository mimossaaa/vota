import React from 'react';
import ActivityItem from './ActivityItem';

function ActivityList({ activities, onUpvote }) {
  if (!activities || activities.length === 0) {
    return (
      <p className="text-center text-gray-600 text-lg mt-8">
        No activities yet. Be the first to suggest one!
      </p>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} onUpvote={onUpvote} />
        ))}
      </div>
    </div>
  );
}

export default ActivityList; 