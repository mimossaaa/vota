import React, { useState } from 'react';

function ActivityForm({ onAddActivity }) {
  const [activityTitle, setActivityTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const forbiddenWords = ["banned", "badword", "xxx"]; // Example forbidden words, can be passed as prop later

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activityTitle.trim()) {
      setMessage({ type: 'error', text: 'Activity title cannot be empty.' });
      return;
    }

    // Check for forbidden words
    const lowerCaseTitle = activityTitle.toLowerCase();
    const containsForbidden = forbiddenWords.some(word => lowerCaseTitle.includes(word));
    if (containsForbidden) {
      setMessage({ type: 'error', text: 'Your suggestion contains forbidden words. Please revise.' });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const newActivity = await onAddActivity(activityTitle);
      if (newActivity) {
        setMessage({ type: 'success', text: 'Activity suggested! 🎉' });
        setActivityTitle('');
      } else {
        setMessage({ type: 'error', text: 'Failed to suggest activity. Please try again.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(null), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div className="bg-white border-2 border-gray-900 p-6 mb-8 text-left">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Suggest a New Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="activity-title" className="block text-sm font-medium text-gray-700 font-serif">Activity Title</label>
          <input
            type="text"
            id="activity-title"
            className="mt-1 block w-full px-3 py-2 border-2 border-gray-900 focus:outline-none focus:ring-0 focus:border-gray-900 sm:text-sm font-serif"
            value={activityTitle}
            onChange={(e) => setActivityTitle(e.target.value)}
            disabled={submitting}
            placeholder="e.g., Play a horror game, Do a cooking stream"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-start py-2 px-4 border-2 border-gray-900 text-gray-900 font-bold text-sm uppercase leading-none hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed font-serif"
          disabled={submitting}
        >
          {submitting ? 'Suggesting...' : 'Suggest Activity'}
        </button>
        {message && (
          <p className={`text-left text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'} font-serif`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}

export default ActivityForm; 