import React, { useState, useEffect } from 'react';

function ActivityItem({ activity, onUpvote }) {
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Check localStorage for vote status when component mounts
    const votedActivities = JSON.parse(localStorage.getItem('votedActivities')) || {};
    if (votedActivities[activity.id]) {
      setHasVoted(true);
    }
  }, [activity.id]);

  const handleUpvote = async () => {
    if (hasVoted) return; // Prevent multiple votes

    const success = await onUpvote(activity.id, activity.votes);
    if (success) {
      // Mark as voted in localStorage
      const votedActivities = JSON.parse(localStorage.getItem('votedActivities')) || {};
      votedActivities[activity.id] = true;
      localStorage.setItem('votedActivities', JSON.stringify(votedActivities));
      setHasVoted(true);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 transition-all duration-300 ease-in-out hover:shadow-lg">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
        <p className="text-gray-600">Votes: <span className="font-bold text-blue-600">{activity.votes}</span></p>
      </div>
      <button
        onClick={handleUpvote}
        disabled={hasVoted}
        className={`ml-4 px-5 py-2 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out
          ${hasVoted ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}
        `}
        title={hasVoted ? 'You have already upvoted this activity' : 'Upvote this activity'}
      >
        {hasVoted ? 'Voted! 👍' : 'Upvote ▲'}
      </button>
    </div>
  );
}

export default ActivityItem; 