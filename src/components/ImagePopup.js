import React from 'react';

function ImagePopup({ name, onClose, isOpen, card }) {

    return (
      <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : " "}`}>
        <div className="popup__content">
          <figure className="popup__figure">
            <img className="popup__photo" alt="" src={card.link} />
            <figcaption className="popup__text">{card.name}</figcaption>
          </figure>
          <button className="popup__close" type="button" onClick={onClose}></button>
        </div>
      </section>
    )
}

export default ImagePopup;