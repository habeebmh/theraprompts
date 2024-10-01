import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { topics } from '../../prompts';
import { dateSeed, seededRandomItem } from '../../utils/random';
import { useAuthState } from '../../utils/hooks/useAuthState';

import './Prompts.css';


function stringToNumber(str) {
  return [...btoa(str)].reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function Prompt() {
  const { authenticated } = useAuthState();
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
          <div className='start-journaling-container'>
            {
              authenticated
                ? <a className='link-light' href={`/create-entry?index=${selectedItem.index}&prompt=${encodeURIComponent(selectedItem.text)}&topic=${encodeURIComponent(selectedItem.topic)}`}>start journaling</a>
                : <a className='link-light' href={`/sign-in?redirectUrl=${encodeURIComponent(`/create-entry?index=${selectedItem.index}&prompt=${encodeURIComponent(selectedItem.text)}&topic=${encodeURIComponent(selectedItem.topic)}`)}`}>sign in to start journaling</a>
            }
          </div>
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
