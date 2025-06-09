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

  // For demonstration, using static date/time as 'activity' object does not contain this data.
  // You would need to add 'date' and 'time' fields to your activity data in Supabase.
  const displayDate = "25 janv. 2024"; // Example static date
  const displayTime = "18:00"; // Example static time

  return (
    <div className="flex items-center border-b border-gray-300 py-6 pr-4">
      {/* Title Column - first and taking up flexible space */}
      <div className="flex-1 text-2xl font-normal text-gray-800 font-serif">
        {activity.title}
      </div>

      {/* Group for Time and Date - acting as the "Category" column */}
      <div className="flex flex-col items-end ml-auto">
        <div className="w-16 text-xl font-bold text-gray-800 font-serif">{displayTime}</div>
        <div className="w-32 text-xl text-gray-700 font-serif">{displayDate}</div>
      </div>

      {/* Upvote Button - acting as the "Year" column, pushed to the far right */}
      <button
        onClick={handleUpvote}
        disabled={hasVoted}
        className={`ml-8 px-4 py-2 text-gray-800 text-2xl font-bold font-serif hover:bg-gray-100 rounded-md transition-all duration-200 ease-in-out
          ${hasVoted ? 'text-gray-400 cursor-not-allowed' : 'text-gray-800'}
        `}
        title={hasVoted ? 'You have already upvoted this activity' : 'Upvote this activity'}
      >
        ▲
      </button>
    </div>
  );
}

export default ActivityItem; 