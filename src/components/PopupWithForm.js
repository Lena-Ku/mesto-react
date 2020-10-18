import React from 'react';

function PopupWithForm({ name, isOpen, title, children, submitButtonText, onClose, onSubmit }) {

  console.log(onSubmit)

  return (

    <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : " "}`} >
      <form className="popup__container" name={name} onSubmit={onSubmit} noValidate >
        <button className="popup__close" type="button" onClick={onClose}></button>
        <h3 className="popup__heading">{title}</h3>
        {children}
        <button className="popup__button" type="submit" disabled >{submitButtonText}</button>
      </form>
    </section>

  )
}

export default PopupWithForm;