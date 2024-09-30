import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useState, useMemo } from 'react';

import Home from './pages/Home';
import Account from './pages/Account';
import SignIn from './pages/SignIn';
import EntryDetails from './pages/EntryDetails';

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
    path: "/account",
    element: <Account />,
  },
  {
    path: "/account/entry/:id",
    element: <EntryDetails />,
  },
  {
    path: "/:topic",
    element: <Home />,
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
    if (window.location.pathname.includes('sign-in')) {
      return '';
    }

    return Object.keys(topics).find(topic => window.location.pathname.includes(topic.replace(/\s+/g, '-').toLowerCase())) || Object.keys(topics)[0];
  }, []);


  return (
    <>
      <AuthProvider>
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
