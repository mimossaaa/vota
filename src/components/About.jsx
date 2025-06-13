import React, { useState, useEffect } from 'react';

function About() {
  const [aboutText, setAboutText] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aboutInfo');
    if (saved) setAboutText(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem('aboutInfo', aboutText);
    setEditing(false);
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-white border-2 border-gray-900 p-8 rounded-lg shadow text-left">
      <h2 className="text-3xl font-bold mb-4 font-serif">About</h2>
      {editing ? (
        <>
          <textarea
            className="w-full h-40 p-2 border border-gray-400 rounded mb-4 font-serif"
            value={aboutText}
            onChange={e => setAboutText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded font-serif mr-2"
            onClick={handleSave}
          >Save</button>
          <button
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded font-serif"
            onClick={() => setEditing(false)}
          >Cancel</button>
        </>
      ) : (
        <>
          <div className="mb-4 whitespace-pre-line font-serif">{aboutText || 'No about info yet. Click edit to add some.'}</div>
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded font-serif"
            onClick={() => setEditing(true)}
          >Edit</button>
        </>
      )}
    </div>
  );
}

export default About; 