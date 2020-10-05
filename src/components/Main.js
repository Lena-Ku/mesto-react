import React, { useEffect, useState } from 'react';
import profileAvatar from '../images/profile__avatar.jpg'
import api from '../utils/api.js'
import Card from './Card.js'

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = useState(profileAvatar);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUser()
      .then((data) => {
        setUserName(
          data.name
        )
        setUserDescription(
          data.about
        )
        setUserAvatar(
          data.avatar
        )
      })
      api.getAllCards()
      .then((data) => {
        const card = data.map((item) => ({
          title: item.name,
          src: item.link,
          id: item._id,
          likes: item.likes
        }))
        setCards(card)
      })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__avatar" onClick={onEditAvatar}>
            <img className="profile__avatar-photo" src={userAvatar} alt="Фотография пользователя" />
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}>
        </button>
      </section>
      <section className="elements">
        {cards && cards.map((item) => (

          <Card key={item.id} {...item} onCardClick={onCardClick} card={item} />

        ))}
      </section>
    </main>
  )
}

export default Main;