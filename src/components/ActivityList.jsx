import React from 'react';
import AnimatedList from './AnimatedList.jsx';

function ActivityList({ activities, onUpvote, onAddActivity }) {
  return (
    <div className="">
      <AnimatedList
        items={activities}
        onItemSelect={() => { /* No-op for now, as selection isn't in scope */ }}
        onUpvote={onUpvote}
        enableArrowNavigation={true}
      />
    </div>
  );
}

export default ActivityList; 