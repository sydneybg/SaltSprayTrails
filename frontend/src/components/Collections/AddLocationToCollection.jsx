import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
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
        <>
        <h2>Add Location To Collection</h2>
        <select
        name="Collection"
        value={activeCollectionId}
        onChange={handleChange}
        required
      >
        <option value="">Select Collection</option>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>
        <button onClick={handleClick}>Submit</button>

        <div></div>
        </>

    )
}

export default AddLocationToCollection;
