import React from 'react';

function Card(props) {

  const { card, onCardClick } = props;

  function handleClick() {
    onCardClick(card);
  }

  return (
    <figure className="element" >
      <img className="element__photo" src={props.src} alt="" onClick={handleClick} />
      <button className="element__trash" type="button"></button>
      <figcaption className="element__group">
        <h2 className="element__title">{props.title}</h2>
        <div className="element__raiting">
          <button className="element__like" type="button"></button>
          <p className="element__count">{props.likes.length}</p>
        </div>
      </figcaption>
    </figure>
  )
}

export default Card;
