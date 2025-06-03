// This comment is to force a new deployment attempt.
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.js';
import Header from './components/Header.jsx';
import ActivityForm from './components/ActivityForm.jsx';
import ActivityList from './components/ActivityList.jsx';

function App() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getActivities();

    const activitiesSubscription = supabase
      .channel('public:activities')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'activities' },
        payload => {
          // console.log('Change received!', payload);
          getActivities(); // Re-fetch activities on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(activitiesSubscription);
    };
  }, []);

  async function getActivities() {
    setLoading(true);
    const { data, error } = await supabase
      .from('activities')
      .select('id, title, votes')
      .order('votes', { ascending: false });

    if (error) {
      console.error('Error fetching activities:', error.message);
      setError(error.message);
    } else {
      setActivities(data);
    }
    setLoading(false);
  }

  async function addActivity(title) {
    const { data, error } = await supabase
      .from('activities')
      .insert([{ title, votes: 0 }])
      .select();

    if (error) {
      console.error('Error adding activity:', error.message);
      setError(error.message);
      return null;
    } else {
      // Supabase realtime will handle the update to the list
      return data[0];
    }
  }

  async function upvoteActivity(id, currentVotes) {
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
      // Supabase realtime will handle the update to the list
      return data[0];
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <Header />
      <main className="flex-grow w-full max-w-2xl mt-8">
        <ActivityForm onAddActivity={addActivity} />
        {loading && <p className="text-center text-gray-600">Loading activities...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <ActivityList activities={activities} onUpvote={upvoteActivity} />
        )}
      </main>
      <footer className="w-full max-w-2xl text-center mt-8 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Streamer Activity Ranker</p>
        <p>Built with React, Tailwind CSS, and Supabase</p>
      </footer>
    </div>
  );
}

export default App; 