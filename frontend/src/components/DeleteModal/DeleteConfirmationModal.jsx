import React from 'react';
import { useModal } from '../../context/Modal';

const DeleteConfirmationModal = ({ onDelete, itemName, itemType }) => {
  const { closeModal } = useModal();

  const handleDelete = () => {
    onDelete();
    closeModal();
  };

  return (
    <div className="modal">
      <p>Are you sure you want to delete this {itemType}: {itemName}?</p>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={closeModal}>No</button>
    </div>
  );
};

export default DeleteConfirmationModal;
