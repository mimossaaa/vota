import React from 'react';

const DEFAULT_ABOUT = `Majid H Rebouh\ngithub = @mimossaaa\nUC Berkeley Genetics and BioE student passionate about synthetic biology, biotechnology, machine learning, and robotics.\n\nAbout this site:\nVota is a real-time activity suggestion and ranking platform. Suggest new activities, upvote your favorites, and see the most popular ideas rise to the top instantly! Powered by React, Tailwind CSS, and Supabase.`;

function About() {
  return (
    <div className="max-w-2xl w-full mx-auto bg-white border-2 border-gray-900 p-8 rounded-lg shadow text-left">
      <div className="flex flex-col items-center mb-6">
        <img
          src="/C892DFA2-6CB7-4D70-91E5-035C6786126D.jpeg"
          alt="Creator profile"
          className="w-48 h-48 rounded-xl object-cover border-4 border-gray-900 mb-2"
        />
        <span className="text-lg font-semibold font-serif">Creator of this site</span>
      </div>
      <h2 className="text-3xl font-bold mb-4 font-serif">About</h2>
      <div className="mb-4 whitespace-pre-line font-serif">{DEFAULT_ABOUT}</div>
    </div>
  );
}

export default About; 