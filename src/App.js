import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';

import Account from './pages/Account';
import SignIn from './pages/SignIn';
import EntryDetails from './pages/EntryDetails';
import Learn from './pages/Learn';
import CreateEntry from './pages/CreateEntry';
import Home from './pages/Home';
import Prompts from './pages/prompt/Prompts';
import SignUp from './pages/SignUp';

import { topics } from './prompts';
import AuthProvider from './utils/providers/AuthProvider';
import { useAuthState } from './utils/hooks/useAuthState';
import { signOut, getAuth } from 'firebase/auth';

import './App.css';
import { AuthGuard } from './components/AuthGuard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },{
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/create-entry",
    element: <AuthGuard><CreateEntry /></AuthGuard>,
  },
  {
    path: "/account",
    element: <AuthGuard><Account /></AuthGuard>,
  },
  {
    path: "/learn",
    element: <Learn />,
  },
  {
    path: "/account/entry/:id",
    element: <AuthGuard><EntryDetails /></AuthGuard>,
  },
  {
    path: "/prompt/:topic",
    element: <Prompts />,
  },
]);

function SignInButton() {
  const { authenticated, loading } = useAuthState();
  const auth = getAuth();

  function handleSignOut() {
    signOut(auth).then(() => {
      window.location.href = '/';
    });
  }

  return loading ? <></> : (
    <>
      <a href={authenticated ? '/account' : '/sign-in'} className='nav-link'>
        {authenticated ? 'account' : 'sign in'}
      </a>
      {authenticated && <a href='/' onClick={handleSignOut} className='nav-link'>sign out</a>}
    </>
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
              <a key={index} href={`/prompt/${topic.replace(/\s+/g, '-').toLowerCase()}`} className={`nav-link ${topic === currentTopic ? 'nav-link-bold' : ''}`}>
                {topic}
              </a>
            ))}
            <div className='app-bar-right-buttons'>
              <a href='/learn' className='nav-link'>
                learn
              </a>
              <SignInButton />
              
            </div>
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
