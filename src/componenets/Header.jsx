import React from 'react';

function Header() {
  return (
    <header className="w-full max-w-2xl text-center mb-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 leading-tight mb-4 animate-fade-in-down">
        Vote on What the Streamer Does Next! 🚀
      </h1>
      <p className="text-xl text-gray-600">
        Suggest and upvote activity ideas for upcoming streams.
      </p>
    </header>
  );
}

export default Header; 