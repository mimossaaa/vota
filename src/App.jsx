// This comment is to force a new deployment attempt in case of a bug or faliure.
import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.js';
import Header from './components/Header.jsx';
import ActivityForm from './components/ActivityForm.jsx';
import ActivityList from './components/ActivityList.jsx';
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
            getActivities(); // Re-fetch activities on any change
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
      .select('id, title, votes')
      .order('votes', { ascending: false });

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
      console.log('Activity added successfully:', data[0]);
      // Supabase realtime will handle the update to the list
      return data[0];
    }
  }

  async function upvoteActivity(id, currentVotes) {
    console.log('Upvoting activity:', id, 'Current votes:', currentVotes);
    const { data, error } = await supabase
      .from('activities')
      .update({ votes: currentVotes + 1 })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error upvoting activity:', error.message);
      setError(error.message);
      return null;
    } else {
      console.log('Activity upvoted successfully:', data[0]);
      // Supabase realtime will handle the update to the list
      return data[0];
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-start py-8 px-4 sm:px-6 lg:px-8">
      <Header />
      <main className="flex-grow w-full max-w-2xl mt-8">
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
        <p>&copy; {new Date().getFullYear()} Majid Rebouh - </p>
        <p>Built with React, Tailwind CSS, and Supabase</p>
      </footer>
    </div>
  );
}

export default App; 