import './App.css';
import { useMemo } from 'react';

import { emotionsPrompts } from './prompts/emotions';
import { positivePrompts } from './prompts/positive';
import { gratitudePrompts } from './prompts/gratitude';
import { mindfulnessPrompts } from './prompts/mindfulness';

const allPrompts = {
  positive: positivePrompts,
  gratitude: gratitudePrompts,
  mindfulness: mindfulnessPrompts,
  emotional: emotionsPrompts,
  prompt: [...positivePrompts, ...gratitudePrompts, ...mindfulnessPrompts, ...emotionsPrompts]
}

function seededRandom(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function stringToNumber(str) {
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num += str.charCodeAt(i) * Math.pow(31, str.length - 1 - i);
  }
  return num;
}

function App() {

  const currentTopic = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get('topic') ?? 'prompt';
    return allPrompts?.[topic] ? topic : 'prompt';
  }, []);

  const prompts = useMemo(() => allPrompts[currentTopic], [currentTopic]);

  const selectedItem = useMemo(() => {
    const date = new Date();
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate() + stringToNumber(currentTopic);
    const randomIndex = Math.floor(seededRandom(seed) * prompts.length);
    return prompts[randomIndex];
  }, [currentTopic, prompts]);

  const currentDate = useMemo(() => new Date().toLocaleDateString(), []);


  return (
    <>
      <div className="container">
        <div className='prompt-container'>
          <article className="prompt">
            <h2 className="subtitle">{currentDate}</h2>
            <h1 className="title">{selectedItem.text}</h1>
            <h3 className="small-subtitle">{selectedItem.topic} #{selectedItem.index} </h3>
          </article>
          <div className="scroll-message">
            Scroll to see more prompts
          </div>
        </div>
        <div>
          <div className='all-prompts-header'>
            <span className='nav-link'>More prompts:</span>
          </div>
          <nav className="nav-bar">
            {Object.keys(allPrompts).map((topic, index) => topic !== currentTopic && (
              <a key={index} href={`?topic=${topic.replace(/\s+/g, '-').toLowerCase()}`} className='nav-link'>
                {topic === 'prompt' ? 'all' : topic} prompts
              </a>
            ))}
          </nav>
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

export default App;
