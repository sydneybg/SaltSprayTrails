import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './components/Locations/LandingPage';
import MyLocations from './components/Locations/MyLocations';
import LocationForm from './components/Locations/LocationForm';
import LocationDetail from './components/Locations/LocationDetail';
import AllLocations from './components/Locations/AllLocations';
import MyCollections from './components/Collections/MyCollections';
import AddCollectionForm from './components/Collections/AddCollectionForm';
import EditCollectionForm from './components/Collections/EditCollectionForm';


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


function ProtectedRoute({ children }) {
  const user = useSelector(state => state.session.user);
  return user ? children : <Navigate to="/" />;
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: 'my-locations', element: <ProtectedRoute><MyLocations /></ProtectedRoute> },
        { path: 'locations/new', element: <ProtectedRoute><LocationForm /></ProtectedRoute> },
        { path: 'locations/:locationId', element: <LocationDetail /> },
        { path: 'locations/:locationId/edit', element: <ProtectedRoute><LocationForm /></ProtectedRoute> },
        { path: 'locations', element: <AllLocations /> },
        { path: 'my-collections', element: <ProtectedRoute><MyCollections /></ProtectedRoute> },
        { path: 'collections/new', element: <ProtectedRoute><AddCollectionForm /></ProtectedRoute> },
        { path: 'collections/:collectionId/edit', element: <ProtectedRoute><EditCollectionForm /></ProtectedRoute> },

      ],
    },
  ]);

  return <RouterProvider router={router} />;
}



export default App;






// function App() {
//   const userState = useSelector(state => state.session.user)
//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Layout />,
//       children: [
//         {
//           index: true, element: <LandingPage/>,
//         },
//         { path: 'my-locations', element: <MyLocations />, isProtected: true },
//         { path: 'locations/new', element: <LocationForm /> },
//         { path: 'locations/:locationId', element: <LocationDetail /> },
//         { path: 'locations/:locationId/edit', element: <LocationForm /> },
//         // { path: 'my-collections', element: <MyCollections /> },
//       ].filter(child => !child.isProtected || userState),
//     },
//   ]);
//   return <RouterProvider router={router} />;
// }
