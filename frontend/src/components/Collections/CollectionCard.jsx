
const CollectionCard = ({ collection }) => {
  const locationCount = collection.locations ? collection.locations.length : 0;

  return (
    <div className="collection-card">
      <img src={collection.imageUrl} alt={collection.name} />
      <h2>{collection.name}</h2>
      <p>{locationCount} locations</p>
    </div>
  );
};

export default CollectionCard;
