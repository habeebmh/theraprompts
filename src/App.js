import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useState, useMemo } from 'react';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { topics } from './prompts';

import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:topic",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };
  const currentTopic = useMemo(() => {
    if (window.location.pathname.includes('sign-in')) {
      return '';
    }

    return Object.keys(topics).find(topic => window.location.pathname.includes(topic.replace(/\s+/g, '-').toLowerCase())) || Object.keys(topics)[0];
  }, []);


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
          {/* <a href='/sign-in' className='nav-link end'>
            sign in
          </a> */}
        </nav>
      </header>
      <RouterProvider router={router} />
      <footer className="footer">
        Dedicated to my best friend ❤️
      </footer>
    </>
  );
}

export default App;
