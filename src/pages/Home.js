import { useMemo, useState } from 'react';


import { dateSeed, seededRandomItem } from '../utils/random';

import './Home.css';
import { topics } from '../prompts';
import { useParams } from 'react-router-dom';

function stringToNumber(str) {
  return [...btoa(str)].reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function Home() {
  const { topic = '' } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const currentTopic = useMemo(() => {
    const decodedTopic = topic.replace(/-/g, ' ')
    return topics[decodedTopic] ? decodedTopic : Object.keys(topics)[0];
  }, [topic]);

  const prompts = useMemo(() => topics[currentTopic], [currentTopic]);

  const selectedItem = useMemo(() => {
    const seed = dateSeed() + stringToNumber(currentTopic);
    return seededRandomItem(prompts, seed);
  }, [currentTopic, prompts]);

  const currentDate = useMemo(() => new Date().toLocaleDateString(), []);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <>
      <header className="app-bar">
        <button className="hamburger-menu" onClick={toggleMenu}>
          ☰
        </button>
        <h1 className="app-bar-title">THERAPROMPTS</h1>
        <nav className={`nav-bar ${menuOpen ? 'open' : ''}`}>
          {Object.keys(topics).map((topic, index) => (
            <a key={index} href={`/${topic.replace(/\s+/g, '-').toLowerCase()}`} className={`nav-link ${topic === currentTopic ? 'nav-link-bold' : ''}`}>
              {topic}
            </a>
          ))}
        </nav>
      </header>
      <div className="container">
        <div className='prompt-container'>
          <article className="prompt">
            <h2 className="subtitle">{currentDate}</h2>
            <h1 className="title">{selectedItem.text}</h1>
            <h3 className="small-subtitle">{selectedItem.topic} #{selectedItem.index}</h3>
          </article>
          <div className="scroll-message">
            Scroll to see more prompts
          </div>
        </div>
        <div className='all-prompts-header'>
          <h2 className="subtitle">All {currentTopic !== 'prompt' && <span>{currentTopic}</span>} prompts</h2>
        </div>
        <div className="prompt-list">
          {prompts.map((prompt, index) => (
            <div key={index} className="prompt-item">
              <span className="prompt-index">{prompt.topic} #{prompt.index}</span>
              <span className="prompt-text">{prompt.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
