import React from 'react';
import { Link } from 'react-router-dom';
import { topics } from '../prompts';
import './Home.css';

function LandingPage() {
  return (
    <div className="landing-page-container">
      <h1>welcome to theraprompts</h1>
      <h2 className='subtitle'>choose a topic to get started</h2>
      <hr className="divider" />
      <div className="topics-container">
        {Object.keys(topics).map((topic, index) => (
          <Link key={index} to={`/${topic.replace(/\s+/g, '-').toLowerCase()}`} className="topic-link">
            {topic}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;