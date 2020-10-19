import React, { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentCardContext } from '../contexts/CurrentCardContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onDeleteCardClick }) {

  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CurrentCardContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img className="profile__avatar-photo" src={currentUser.avatar} alt="Фотография пользователя" />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}>
        </button>
      </section>
      <section className="elements">

        {cards && cards.map((item) => (

          <Card key={item._id} name={item.name} likes={item.likes.length} link={item.link} onCardLike={onCardLike}
            card={item} onCardClick={onCardClick} user={currentUser} cardDeleteButton={onDeleteCardClick} />
        ))}

      </section>
    </main>
  )
}

export default Main;