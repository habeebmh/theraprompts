import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <> 
      <RouterProvider router={router}>
        <footer className="footer">
          Dedicated to my best friend ❤️
        </footer>
      </RouterProvider>
    </>
  );
}

export default App;
