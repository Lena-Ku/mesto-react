import React from 'react';

function Card(card) {

    function handleClick() {
        card.onCardClick(card);
        console.log(card)
    }
      
    return (
        <figure className="element" >
        <img className="element__photo" src={card.src} alt="" onClick={handleClick} />
        <button className="element__trash" type="button"></button>
        <figcaption className="element__group">
    <h2 className="element__title">{card.title}</h2>
          <div className="element__raiting">
            <button className="element__like" type="button"></button>
    <p className="element__count">{card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
    )
}

export default Card;