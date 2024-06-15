import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserCollections } from '../../store/collections';
import { useModal } from '../../context/Modal';

const AddLocationToCollection = ({ onAdd, location}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const collections = useSelector((state) => state.collections.userCollections);

    const [activeCollectionId, setActiveCollectionId] = useState(`''`)

    useEffect(() => {
        dispatch(fetchUserCollections())
    }, [dispatch]);

    const handleChange = (e) => {
        setActiveCollectionId(e.target.value);
    };

    const handleClick = () => {
        const activeCollection = collections.find((collection) => collection.id.toString() === activeCollectionId)
        onAdd(activeCollection, location);
        closeModal();
    }

    return (
      <div className="add-location-modal">
          <h2>Add Location To Collection</h2>
          {collections.length === 0 ? (
              <div className="no-collections">
                  <p>You have no collections yet. Please navigate to My Collections to Create a Collection.</p>
              </div>
          ) : (
              <div className="modal-content">
                  <select
                      name="Collection"
                      value={activeCollectionId}
                      onChange={handleChange}
                      required
                      className="collection-select"
                  >
                      <option value="">Select Collection</option>
                      {collections.map((collection) => (
                          <option key={collection.id} value={collection.id}>
                              {collection.name}
                          </option>
                      ))}
                  </select>
                  <button onClick={handleClick} className="submit-button">Submit</button>
              </div>
          )}
      </div>
  );
    // return (
    //     <>
    //    <h2>Add Location To Collection</h2>
    //   {collections.length === 0 ? (
    //     <div>
    //       <p>You have no collections yet. Please navigate to My Collections to Create a Collection.</p>
    //     </div>
    //   ) : (
    //     <div className="modal-content">
    //       <select
    //         name="Collection"
    //         value={activeCollectionId}
    //         onChange={handleChange}
    //         required
    //       >
    //         <option value="">Select Collection</option>
    //         {collections.map((collection) => (
    //           <option key={collection.id} value={collection.id}>
    //             {collection.name}
    //           </option>
    //         ))}
    //       </select>
    //       <button onClick={handleClick}>Submit</button>
    //     </div>
    //   )}
    // </>

    // )
}

export default AddLocationToCollection;
