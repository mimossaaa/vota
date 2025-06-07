import React from 'react';
import AnimatedList from './AnimatedList.jsx';

function ActivityList({ activities, onUpvote }) {
  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-lg font-bold">TIL WAGNER</h1>
        <nav>
          <ul className="flex space-x-6 text-sm font-light uppercase tracking-wider">
            <li><a href="#" className="hover:text-gray-600">Portfolio</a></li>
            <li><a href="#" className="hover:text-gray-600">About</a></li>
            <li><a href="#" className="hover:text-gray-600">Contact</a></li>
          </ul>
        </nav>
      </header>

      <h1 className="text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">Selected Works</h1>
      <AnimatedList
        items={activities}
        onItemSelect={() => { /* No-op for now, as selection isn't in scope */ }}
        onUpvote={onUpvote}
        enableArrowNavigation={true}
        displayScrollbar={false}
      />

      <div className="mt-12 text-6xl font-extrabold text-gray-900 tracking-tight">
        View All / View A
      </div>
    </div>
  );
}

export default ActivityList; 