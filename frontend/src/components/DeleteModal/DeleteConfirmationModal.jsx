// import React from 'react';
import { useModal } from '../../context/Modal';

const DeleteConfirmationModal = ({ onDelete, itemName, itemType, customMessage }) => {
  const { closeModal } = useModal();

  const handleDelete = () => {
    onDelete();
    closeModal();
  };

  return (
    <>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal">
      <p>{customMessage || `Are you sure you want to delete this ${itemType}: ${itemName}?`}</p>
        <div className="button-container">
          <button className="primary-button" onClick={handleDelete}>Yes</button>
          <button className="secondary-button" onClick={closeModal}>No</button>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
