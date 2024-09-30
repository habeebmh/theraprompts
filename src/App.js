import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useState, useMemo } from 'react';

import Account from './pages/Account';
import SignIn from './pages/SignIn';
import EntryDetails from './pages/EntryDetails';
import Learn from './pages/Learn';
import CreateEntry from './pages/CreateEntry';
import Home from './pages/Home';
import Prompt from './pages/Prompts';

import { topics } from './prompts';
import AuthProvider from './utils/providers/AuthProvider';
import { useAuthState } from './utils/hooks/useAuthState';

import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/create-entry",
    element: <CreateEntry />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/learn",
    element: <Learn />,
  },
  {
    path: "/account/entry/:id",
    element: <EntryDetails />,
  },
  {
    path: "/:topic",
    element: <Prompt />,
  },
]);

function SignInButton() {
  const { authenticated } = useAuthState();

  return (
    <a href={authenticated ? '/account' : '/sign-in'} className='nav-link end'>
      {authenticated ? 'account' : 'sign in'}
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };
  const currentTopic = useMemo(() => {
    return Object.keys(topics).find(topic => window.location.pathname.includes(topic.replace(/\s+/g, '-').toLowerCase())) ?? '';
  }, []);

  return (
    <>
      <AuthProvider>
        <header className="app-bar">
          <button className="hamburger-menu" onClick={toggleMenu}>
            ☰
          </button>
          <a href='/' className='app-bar-title-link'><h1 className="app-bar-title">THERAPROMPTS</h1></a>
          <nav className={`nav-bar ${menuOpen ? 'open' : ''}`}>
            {Object.keys(topics).map((topic, index) => (
              <a key={index} href={`/${topic.replace(/\s+/g, '-').toLowerCase()}`} className={`nav-link ${topic === currentTopic ? 'nav-link-bold' : ''}`}>
                {topic}
              </a>
            ))}
            <a href='/learn' className='nav-link end'>
              learn
            </a>
            {/* <SignInButton /> */}
          </nav>
        </header>
        <RouterProvider router={router} />
        <footer className="footer">
          Dedicated to my best friend ❤️
        </footer>
      </AuthProvider>
    </>
  );
}

export default App;
