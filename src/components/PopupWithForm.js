import React from 'react';

function PopupWithForm({ name, isOpen, title, children, submitButtonText, onClose, handleSubmit, isInvalid, typeDelete }) {

  return (

    <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : " "}`} >
      <form className="popup__container" name={name} onSubmit={handleSubmit}  >
        <button className="popup__close" type="button" onClick={onClose}></button>
        <h3 className="popup__heading">{title}</h3>
        {children}
        <button className={`popup__button popup__button_${isInvalid ? "disabled" : "" } popup__button_${typeDelete ? "delete" : ""}`}  
        type="submit">{submitButtonText}</button>
      </form>
    </section>

  )
}

export default PopupWithForm;
