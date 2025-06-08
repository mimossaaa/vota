import React from 'react';
import AnimatedList from './AnimatedList.jsx';

function ActivityList({ activities, onUpvote, onAddActivity }) {
  return (
    <div className="min-h-screen font-serif bg-gray-100 text-gray-900 p-8 w-full">
      <h1 className="text-6xl font-extrabold mb-6 tracking-tight">Top Activities</h1>
      <AnimatedList
        items={activities}
        onItemSelect={() => { /* No-op for now, as selection isn't in scope */ }}
        onUpvote={onUpvote}
        enableArrowNavigation={true}
        displayScrollbar={true}
      />
    </div>
  );
}

export default ActivityList; 