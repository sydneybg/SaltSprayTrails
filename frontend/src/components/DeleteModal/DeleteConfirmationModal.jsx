import React from 'react';

const DeleteConfirmationModal = ({ onClose, onDelete, itemName, itemType }) => (
  <div className="modal">
    <p>Are you sure you want to delete this {itemType}: {itemName}?</p>
    <button onClick={onDelete}>Yes</button>
    <button onClick={onClose}>No</button>
  </div>
);

export default DeleteConfirmationModal;
