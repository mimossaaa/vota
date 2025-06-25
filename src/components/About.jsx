import React from 'react';
import Cubes from "../components/Cubes";
import AboutCard from "../components/AboutCard";

const DEFAULT_ABOUT = `Majid H Rebouh\ngithub = @mimossaaa\nUC Berkeley Genetics and BioE student passionate about synthetic biology, biotechnology, machine learning, and robotics.\n\nAbout this site:\nVota is a real-time activity suggestion and ranking platform. Suggest new activities, upvote your favorites, and see the most popular ideas rise to the top instantly! Powered by React, Tailwind CSS, and Supabase.`;

function About() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0020",
      }}
    >
      {/* Background Cubes */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none", // so the card is clickable
        }}
      >
        <Cubes
          gridSize={8}
          maxAngle={60}
          radius={4}
          borderStyle="2px dashed #5227FF"
          faceColor="#1a1a2e"
          rippleColor="#ff6b6b"
          rippleSpeed={1.5}
          autoAnimate={true}
          rippleOnClick={true}
        />
      </div>
      {/* Foreground Card */}
      <div style={{ position: "relative", zIndex: 2, pointerEvents: "auto" }}>
        <AboutCard />
      </div>
    </div>
  );
}

export default About; 