import './App.css';
import { useMemo } from 'react';

import prompts from './constants/prompts';

function App() {

  const selectedItem = useMemo(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const index = (day + month + year) % prompts.length;
    return prompts[index];
  }, []);

  const currentDate = useMemo(() => new Date().toLocaleDateString(), []);


  return (
    <>
      <div className="container">
        <div className='prompt-container'>
          <h2 className="subtitle">Prompt #{selectedItem.index} </h2>
          <h1 className="title">{selectedItem.text}</h1>
          <h3 className="small-subtitle">{currentDate}</h3>
          <div className="scroll-message">
            Scroll down to see all prompts
          </div>
        </div>
        <div className="prompt-list">
          {prompts.map((prompt, index) => (
            <div key={index} className="prompt-item">
              <span className="prompt-index">#{prompt.index}</span>
              <span className="prompt-text">{prompt.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
