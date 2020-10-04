import React from 'react';

function PopupWithForm({ name, isOpen, title, children, submit, onClose }) {

  return (

    <section className={`popup popup_type_${name} ${isOpen}`} >
      <form className="popup__container" name={name} method="POST" noValidate>
        <button className="popup__close" type="button" onClick={onClose}></button>
        <h3 className="popup__heading">{title}</h3>
        {children}
        <button className="popup__button" type="submit" disabled>{submit}</button>
      </form>
    </section>

  )
}

export default PopupWithForm;