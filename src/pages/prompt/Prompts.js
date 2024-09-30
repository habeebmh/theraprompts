import { useMemo } from 'react';


import { dateSeed, seededRandomItem } from '../../utils/random';

import './Prompts.css';
import { topics } from '../../prompts';
import { useParams } from 'react-router-dom';

function stringToNumber(str) {
  return [...btoa(str)].reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function Prompt() {
  const { topic = '' } = useParams();  
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

  return (
    <>
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

export default Prompt;
