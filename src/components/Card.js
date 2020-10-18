import React, {useState} from 'react';

function Card(props) {

  const { card, onCardClick, onCardLike, cardDeleteButton, user } = props;


  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  const isOwn = card.owner._id === user._id;

  function handleDeleteClick() {
    cardDeleteButton(card)
  }

  //onClick={handleDeleteClick}

  return (
    <figure className="element">
        <img className="element__photo" src={props.link} alt="" onClick={handleClick} />
  <button className={`element__trash element__trash_${isOwn ? "active" : " "}`} type="button" onClick={handleDeleteClick}></button>
      <figcaption className="element__group">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__raiting">
          <button className="element__like" type="button" onClick={handleLikeClick}></button>
          <p className="element__count">{props.likes}</p>
        </div>
      </figcaption>
      </figure>
  )
}

export default Card;


/*<>
    {currentCard.map((card) => (
    <figure className="element" >
        <img className="element__photo" src={card.link} alt="" onClick={handleClick} />
      <button className="element__trash" type="button"></button>
      <figcaption className="element__group">
        <h2 className="element__title">{name}</h2>
        <div className="element__raiting">
          <button className="element__like" type="button" onClick={handleLikeClick}></button>
          <p className="element__count">{likes}</p>
        </div>
      </figcaption>
      </figure>
      ))}
    </> */

    /*
function Card({card, onCardClick, onCardLike, link, name, likes, cardDeleteButton}) {

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    cardDeleteButton(card)
  }

  //const isOwn = card.owner._id === currentUser._id;

  //console.log(card.owner._id)


  return (
    <figure className="element" onClick={handleDeleteClick}>
        <img className="element__photo" src={link} alt="" onClick={handleClick} />
      <button className="element__trash" type="button" ></button>
      <figcaption className="element__group">
        <h2 className="element__title">{name}</h2>
        <div className="element__raiting">
          <button className="element__like" type="button" onClick={handleLikeClick}></button>
          <p className="element__count">{likes}</p>
        </div>
      </figcaption>
      </figure>
  )
}
    */