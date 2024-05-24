import React from "react";
import { useNavigate } from "react-router-dom";

const CollectionTile = ({ collection }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/collections/${collection.id}`);
  };

  return (
    <div onClick={handleClick} className="collection-tile">
      <img src={collection.imageUrl} alt={collection.name} />
      <h2>{collection.name}</h2>
      <p>{collection.locations.length} locations</p>
    </div>
  );
};

export default CollectionTile;
