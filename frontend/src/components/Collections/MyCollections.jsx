// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { fetchUserCollections, deleteCollection } from '../../store/collections';
// import PrivateRoute from '../PrivateRoute';

// const MyCollections = () => {
//   const dispatch = useDispatch();
//   const userCollections = useSelector(state => state.collections.userCollections);

//   useEffect(() => {
//     dispatch(fetchUserCollections());
//   }, [dispatch]);

//   const handleDelete = (collectionId) => {
//     dispatch(deleteCollection(collectionId));
//   };

//   return (
//     <PrivateRoute>
//       <div className="my-collections-page">
//         <h1>My Collections</h1>
//         <Link to="/collections/new" className="create-collection-button">
//           Create Collection
//         </Link>
//         <div className="collections-grid">
//           {userCollections.map(collection => (
//             <div key={collection.id} className="collection-tile">
//               <div className="collection-image">
//                 <img src={collection.image} alt={collection.name} />
//               </div>
//               <div className="collection-details">
//                 <h2>{collection.name}</h2>
//                 <p>{collection.description}</p>
//                 <Link to={`/collections/${collection.id}/edit`}>Edit</Link>
//                 <button onClick={() => handleDelete(collection.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </PrivateRoute>
//   );
// };

// export default MyCollections;
