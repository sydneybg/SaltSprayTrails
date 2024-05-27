import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { updateCollection, fetchCollection } from '../../store/collections';

const EditCollectionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const location = useLocation();

  const currentCollection = useSelector((state) => state.collections.currentCollection);
  const errorMessage = useSelector((state) => state.collections.errorMessage);

  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (collectionId) {
      dispatch(fetchCollection(collectionId));
    }
  }, [collectionId, dispatch]);

  useEffect(() => {
    const isEdit = location.pathname.includes('edit');
    if (currentCollection && isEdit) {
      setFormData({
        name: currentCollection.name,
        imageUrl: currentCollection.imageUrl,
      });
    }
  }, [currentCollection, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let actionResult;

    if (collectionId) {
      actionResult = await dispatch(updateCollection(collectionId, formData));
      if (actionResult && !actionResult.errors) {
        console.log(actionResult)
        navigate(`/collections/${collectionId}`);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">Edit Collection</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="form-input" />
        <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} required className="form-input" />
        <button type="submit" className="form-button">Update</button>
      </form>
      <div className="form-error">{errorMessage}</div>
    </div>
  );
};

export default EditCollectionForm;
