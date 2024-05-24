import { useState } from 'react';
import axios from 'axios';

const AddCollectionForm = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/collections', { name, imageUrl });
      onSave();
      onClose();
    } catch (error) {
      console.error('Error adding collection', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </label>
        <button type="submit">Add Collection</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddCollectionForm;
