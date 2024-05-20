import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LoginFormModal from './components/LoginFormModal/LoginFormModal';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <h1>Welcome to Salt'n'Swim!</h1>,
      }
    ],
  },
  // {
  //   path: '/login',
  //   element: <LoginFormModal />
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}


export default App;


//function App() {
  //   const dispatch = useDispatch();
  //   const [isLoaded, setIsLoaded] = useState(false);

  //   useEffect(() => {
  //     dispatch(sessionActions.restoreUser()).then(() => {
  //       setIsLoaded(true);
  //     });
  //   }, [dispatch]);

  //   return <RouterProvider router={router} />;
  // }
