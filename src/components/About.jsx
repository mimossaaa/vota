import React from "react";

const DEFAULT_ABOUT = `Majid H Rebouh
github = @mimossaaa
UC Berkeley Genetics and BioE student passionate about synthetic biology, biotechnology, machine learning, and robotics.

About this site:
Vota is a real-time activity suggestion and ranking platform. Suggest new activities, upvote your favorites, and see the most popular ideas rise to the top instantly! Powered by React, Tailwind CSS, and Supabase.`;

function About() {
  return (
    <div className="min-h-screen flex flex-col items-start py-8 px-4 sm:px-6 lg:px-8 bg-white text-gray-900 font-sans">
      <div className="flex-grow w-full max-w-2xl mx-auto py-12 text-center">
        <h1 className="text-6xl mb-8 font-bold font-serif">About This Project</h1>
        <pre className="text-xl whitespace-pre-line break-words leading-relaxed font-serif">{DEFAULT_ABOUT}</pre>
      </div>
    </div>
  );
}

export default About; 