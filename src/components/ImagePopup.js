import React from 'react';

function ImagePopup({name, onClose, isOpen, card}) {

    if({isOpen}) {
        return (
        <section className={`popup popup_type_${name} ${isOpen}`}>
          <div className="popup__content">
            <figure className="popup__figure">
              <img className="popup__photo" alt="" src={card.src} />
        <figcaption className="popup__text">{card.title}</figcaption>
            </figure>
            <button className="popup__close" type="button" onClick={onClose}></button>
          </div>
        </section>
    )
    }
}

export default ImagePopup;