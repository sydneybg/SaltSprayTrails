import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../../store/collections";
import CollectionTile from "./CollectionTile";


const AllCollections = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  console.log("Collections in component:", collections); 


  return (
    <div>
      <h1>All Collections</h1>
      <div className="collections-grid">
        {collections && collections.length > 0 ? (
          collections.map((collection) => (
            <CollectionTile key={collection.id} collection={collection} />
          ))
        ) : (
          <p>No collections available</p>
        )}
      </div>
    </div>
  );
};

export default AllCollections;
