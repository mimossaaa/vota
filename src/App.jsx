// This comment is to force a new deployment attempt in case of a bug or faliure.
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { supabase } from './supabaseClient.js';
import Header from './components/Header.jsx';
import ActivityForm from './components/ActivityForm.jsx';
import ActivityList from './components/ActivityList.jsx';
import About from './components/About.jsx';
// This comment is to force a new deployment attempt in case of a bug or faliure.

function App() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('App useEffect triggered');
    getActivities();

    // Check if supabase is initialized before subscribing
    if (supabase) {
      console.log('Supabase client initialized, attempting to subscribe to changes.');
      const activitiesSubscription = supabase
        .channel('public:activities')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'activities' },
          payload => {
            console.log('Supabase realtime change received:', payload);
            // getActivities(); // Re-fetch activities on any change - replace with granular updates

            setActivities(prevActivities => {
              let newActivities = [...prevActivities];
              const { eventType, new: newRecord, old: oldRecord } = payload;

              switch (eventType) {
                case 'INSERT':
                  // Add new activity, assuming it's not a duplicate if it comes from real-time INSERT
                  newActivities = [...newActivities, newRecord];
                  break;
                case 'UPDATE':
                  // Find and replace the updated activity
                  newActivities = newActivities.map(activity =>
                    activity.id === newRecord.id ? newRecord : activity
                  );
                  break;
                case 'DELETE':
                  // Remove the deleted activity
                  newActivities = newActivities.filter(activity => activity.id !== oldRecord.id);
                  break;
                default:
                  break;
              }

              // Re-sort the activities after update to maintain order: votes (highest first), then created_at (newest first)
              return newActivities.sort((a, b) => {
                const voteComparison = b.votes - a.votes;
                if (voteComparison !== 0) {
                  return voteComparison;
                }
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
              });
            });
          }
        )
        .subscribe();

      return () => {
        console.log('Cleaning up Supabase subscription.');
        supabase.removeChannel(activitiesSubscription);
      };
    } else {
      console.error('Supabase client is not initialized!');
      setError('Supabase client not initialized. Check environment variables.');
    }
  }, []);

  async function getActivities() {
    console.log('Fetching activities...');
    setLoading(true);
    const { data, error } = await supabase
      .from('activities')
      .select('id, title, votes, created_at')
      // Primary sort: votes descending
      .order('votes', { ascending: false })
      // Secondary sort: created_at descending (for tie-breaking)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching activities:', error.message);
      setError(error.message);
      setActivities([]); // Ensure activities is empty on error
    } else {
      console.log('Activities fetched successfully:', data);
      setActivities(data);
    }
    setLoading(false);
    console.log('Finished fetching activities. Loading state:', false);
  }

  async function addActivity(title) {
    console.log('Adding activity:', title);
    const { data, error } = await supabase
      .from('activities')
      .insert([{ title, votes: 0, created_at: new Date().toISOString() }])
      .select();

    if (error) {
      console.error('Error adding activity:', error.message);
      setError(error.message);
      return null;
    } else {
      console.log('Activity added successfully in addActivity:', data[0]);
      // Supabase realtime will handle the update to the list
      return data[0];
    }
  }

  async function upvoteActivity(id, currentVotes) {
    console.log('upvoteActivity called in App.jsx for activity:', id, 'with current votes:', currentVotes);

    // Optimistic UI update
    setActivities(prevActivities => {
      return prevActivities.map(activity =>
        activity.id === id ? { ...activity, votes: activity.votes + 1 } : activity
      ).sort((a, b) => b.votes - a.votes); // Re-sort to maintain order
    });

    const { data, error } = await supabase
      .from('activities')
      .update({ votes: currentVotes + 1 })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error upvoting activity in App.jsx:', error.message);
      setError(error.message);
      // Revert optimistic update if there's an error
      setActivities(prevActivities => {
        return prevActivities.map(activity =>
          activity.id === id ? { ...activity, votes: currentVotes } : activity
        ).sort((a, b) => b.votes - a.votes); // Re-sort to maintain order
      });
      return null;
    } else {
      console.log('Activity upvoted successfully in App.jsx:', data[0]);
      // Supabase realtime will handle the final update and re-sort
      return data[0];
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-start py-8 px-4 sm:px-6 lg:px-8">
      <nav className="w-full max-w-2xl mb-6 flex gap-6 text-lg font-serif">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main className="flex-grow mt-8">
              <ActivityForm onAddActivity={addActivity} />
              {loading && <p className="text-left text-gray-600">Loading activities...</p>}
              {error && <p className="text-left text-red-500">Error: {error}</p>}
              {!loading && !error && activities.length === 0 && (
                <p className="text-left text-gray-600">No activities found. Add one!</p>
              )}
              {!loading && !error && activities.length > 0 && (
                <ActivityList activities={activities} onUpvote={upvoteActivity} />
              )}
            </main>
            <footer className="w-full max-w-2xl text-left mt-8 text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Vota</p>
              <p>Built with React, Tailwind CSS, and Supabase</p>
            </footer>
          </>
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App; 