import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollection, addLocation, removeLocation } from "../store/collections";
import { useParams } from "react-router-dom";

const CollectionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const collection = useSelector((state) => state.collections.currentCollection);

  useEffect(() => {
    dispatch(fetchCollection(id));
  }, [dispatch, id]);

  const handleAddLocation = (location) => {
    dispatch(addLocation(id, location));
  };

  const handleRemoveLocation = (locationId) => {
    dispatch(removeLocation(id, locationId));
  };

  if (!collection) return null;

  return (
    <div>
      <h1>{collection.name}</h1>
      <img src={collection.imageUrl} alt={collection.name} />
      <div className="locations-list">
        {collection.locations.map((location) => (
          <div key={location.id} className="location-item">
            <h3>{location.name}</h3>
            <button onClick={() => handleRemoveLocation(location.id)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleAddLocation}>Add Location</button>
    </div>
  );
};

export default CollectionDetail;



// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCollections, createCollection } from "../store/collections";
// import CollectionTile from "./CollectionTile";
// import { useHistory } from "react-router-dom";

// const MyCollections = () => {
//   const dispatch = useDispatch();
//   const collections = useSelector((state) => state.collections.collections);
//   const history = useHistory();

//   useEffect(() => {
//     dispatch(fetchCollections());
//   }, [dispatch]);

//   const handleAddCollection = () => {
//     const newCollection = { name: "New Collection", imageUrl: "default-image-url" };
//     dispatch(createCollection(newCollection)).then((collection) => {
//       history.push(`/collections/${collection.id}`);
//     });
//   };

//   return (
//     <div>
//       <h1>My Collections</h1>
//       <button onClick={handleAddCollection}>Add Collection</button>
//       <div className="collections-grid">
//         {collections.map((collection) => (
//           <CollectionTile key={collection.id} collection={collection} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyCollections;
