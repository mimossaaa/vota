import React, { useState } from 'react';

function ActivityForm({ onAddActivity }) {
  const [activityTitle, setActivityTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activityTitle.trim()) {
      setMessage({ type: 'error', text: 'Activity title cannot be empty.' });
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
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Suggest a New Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="activity-title" className="block text-sm font-medium text-gray-700">Activity Title</label>
          <input
            type="text"
            id="activity-title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={activityTitle}
            onChange={(e) => setActivityTitle(e.target.value)}
            disabled={submitting}
            placeholder="e.g., Play a horror game, Do a cooking stream"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={submitting}
        >
          {submitting ? 'Suggesting...' : 'Suggest Activity'}
        </button>
        {message && (
          <p className={`text-center text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}

export default ActivityForm; 