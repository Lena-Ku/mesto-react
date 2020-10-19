import React from 'react';

function Card(props) {
  const { card, onCardClick, onCardLike, cardDeleteButton, user } = props;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  const isOwn = card.owner._id === user._id;
  const isLiked = card.likes.some(i => i._id === user._id);
  
  function handleDeleteClick() {
    cardDeleteButton(card)
  }

  return (
    <figure className="element">
        <img className="element__photo" src={props.link} alt="" onClick={handleClick} />
  <button className={`element__trash element__trash_${isOwn ? "active" : "hidden"}`} type="button" onClick={handleDeleteClick}></button>
      <figcaption className="element__group">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__raiting">
          <button className={`element__like element__like_${isLiked ? "active" : "hidden"}`} type="button" onClick={handleLikeClick}></button>
          <p className="element__count">{props.likes}</p>
        </div>
      </figcaption>
      </figure>
  )
}

export default Card;