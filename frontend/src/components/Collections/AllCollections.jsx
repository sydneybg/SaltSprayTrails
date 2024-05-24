import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCollections } from "../store/collections";
import CollectionTile from "./CollectionTile";

const AllCollections = () => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  return (
    <div>
      <h1>All Collections</h1>
      <div className="collections-grid">
        {collections.map((collection) => (
          <CollectionTile key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
};

export default AllCollections;
