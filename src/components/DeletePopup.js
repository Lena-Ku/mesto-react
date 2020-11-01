import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function DeletePopup({ isOpen, onClose, handleSubmit, card }) {

    const typeDelete = true;

    function deleteCard(e) {
        e.preventDefault();
        handleSubmit(card)
    }

    return (
        <PopupWithForm
            name="popup_delete"
            title="Вы уверены?"
            submitButtonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            handleSubmit={deleteCard}
            typeDelete={typeDelete}
        />
    )
}

export default DeletePopup;