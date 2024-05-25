import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { fetchUserCollections } from '../../store/collections';
import { useModal } from '../../context/Modal';


const AddLocationToCollection = ({ onAdd, location}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const collections = useSelector((state) => state.collections.userCollections);

    const [activeCollectionId, setActiveCollectionId] = useState(null)

    useEffect(() => {
        dispatch(fetchUserCollections())
    }, [dispatch]);

    const handleChange = (e) => {
        setActiveCollectionId(e.target.value)
    }

    const handleClick = () => {
        const activeCollection = collections.find((collection) => collection.id.toString() === activeCollectionId)
        // console.log(activeCollection)
        onAdd(activeCollection, location);
        closeModal();
    }


    return (
        <>
        <h2>Add Location To Collection</h2>
        <select name="Collection" value={activeCollectionId} onChange={handleChange} required>
            <option value={null}>Select Collection</option>
            {collections.map(collection => {
               return <option value={collection.id}>{collection.name}</option>
            })}
        </select>
        <button onClick={handleClick}>Submit</button>

        <div></div>
        </>

    )
}

export default AddLocationToCollection;


{/* <select name="activity_type" value={formData.activity_type} onChange={handleChange} required>
<option value="" disabled>Select Activity Type</option>
<option value="swimming">Swimming</option>
<option value="surfing">Surfing</option>
<option value="rafting">Rafting</option>
<option value="kayaking">Kayaking</option>
</select> */}
