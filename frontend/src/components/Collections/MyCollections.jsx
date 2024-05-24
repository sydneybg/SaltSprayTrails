import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections, createCollection } from "../store/collections";
import CollectionTile from "./CollectionTile";
import { useNavigate } from "react-router-dom";

const MyCollections = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const handleAddCollection = () => {
    const newCollection = { name: "New Collection", imageUrl: "default-image-url" };
    dispatch(createCollection(newCollection)).then((collection) => {
      navigate(`/collections/${collection.id}`);
    });
  };

  return (
    <div>
      <h1>My Collections</h1>
      <button onClick={handleAddCollection}>Add Collection</button>
      <div className="collections-grid">
        {collections.map((collection) => (
          <CollectionTile key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default MyCollections;
