import React, { useState, useEffect } from 'react';

function ActivityItem({ activity, onUpvote, onActivityUpdate, isSelected, onClick }) {
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Check localStorage for vote status when component mounts
    const votedActivities = JSON.parse(localStorage.getItem('votedActivities')) || {};
    if (votedActivities[activity.id]) {
      setHasVoted(true);
    }
  }, [activity.id]);

  const handleUpvote = async (e) => {
    e.stopPropagation(); // Prevent click from bubbling up to the item's onClick
    if (hasVoted) return; // Prevent multiple votes

    const updatedActivity = await onUpvote(activity.id, activity.votes); // Expecting updated activity object
    if (updatedActivity) {
      // Mark as voted in localStorage
      const votedActivities = JSON.parse(localStorage.getItem('votedActivities')) || {};
      votedActivities[activity.id] = true;
      localStorage.setItem('votedActivities', JSON.stringify(votedActivities));
      setHasVoted(true);
      if (onActivityUpdate) {
        onActivityUpdate(updatedActivity); // Update parent state with the new activity
      }
    }
  };

  // Function to format date
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
    const time = date.toLocaleTimeString('fr-FR', optionsTime); // French locale for time

    const optionsDate = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    let dateString = date.toLocaleDateString('fr-FR', optionsDate);

    // Replace full month names with abbreviated ones as per requirement (janvier -> janv.)
    // This is a simple regex for French month names, may need adjustment for other locales
    dateString = dateString.replace(/janvier/i, 'janv.');
    dateString = dateString.replace(/février/i, 'févr.');
    dateString = dateString.replace(/mars/i, 'mars.');
    dateString = dateString.replace(/avril/i, 'avr.');
    dateString = dateString.replace(/mai/i, 'mai.');
    dateString = dateString.replace(/juin/i, 'juin.');
    dateString = dateString.replace(/juillet/i, 'juil.');
    dateString = dateString.replace(/août/i, 'août.');
    dateString = dateString.replace(/septembre/i, 'sept.');
    dateString = dateString.replace(/octobre/i, 'oct.');
    dateString = dateString.replace(/novembre/i, 'nov.');
    dateString = dateString.replace(/décembre/i, 'déc.');

    return `${time} ${dateString}`;
  };

  const formattedDateTime = activity.created_at ? formatTimestamp(activity.created_at) : '';

  // Split into time and date for separate display if needed, but the requirement is combined
  const displayTime = formattedDateTime.split(' ')[0]; // Gets HH:MM
  const displayDate = formattedDateTime.substring(formattedDateTime.indexOf(' ') + 1); // Gets DD mon. YYYY

  return (
    <div className="flex items-center border-b border-gray-300 py-10 pr-4">
      {/* Title Column - now first, with a fixed width for consistent spacing */}
      <div className="w-96 text-2xl font-normal text-gray-800 font-serif">
        {activity.title}
      </div>

      {/* Group for Time and Date - pushed to the right with ml-auto */}
      <div className="flex items-center ml-auto">
        <div className="w-16 text-xl font-bold text-gray-800 font-serif mr-4">{displayTime}</div>
        <div className="w-32 text-xl text-gray-700 font-serif mr-16">{displayDate}</div>
      </div>

      {/* Upvote Count - displayed to the right of the date */}
      <span className="text-2xl font-bold text-gray-800 font-serif mr-4">{activity.votes}</span>

      {/* Upvote Button - positioned after date, no additional ml needed */}
      <button
        onClick={handleUpvote}
        disabled={hasVoted}
        className={`px-4 py-2 text-gray-800 text-2xl font-bold font-serif hover:bg-gray-100 rounded-md transition-all duration-200 ease-in-out
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