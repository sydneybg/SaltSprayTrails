import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './components/Locations/LandingPage';
import MyLocations from './components/Locations/MyLocations';
import LocationForm from './components/Locations/LocationForm';
import LocationDetail from './components/Locations/LocationDetail';

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
        index: true, element: <LandingPage/>,
      },
      { path: 'my-locations', element: <MyLocations /> },
      { path: 'locations/new', element: <LocationForm /> },
      { path: 'locations/:locationId', element: <LocationDetail /> },
      { path: 'locations/:locationId/edit', element: <LocationForm /> },
    ],
  },
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
