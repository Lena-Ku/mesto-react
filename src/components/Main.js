import React, { useEffect, useState, useContext } from 'react';
import profileAvatar from '../images/profile__avatar.jpg'
import api from '../utils/api.js'
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentCardContext } from '../contexts/CurrentCardContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onDeleteCardClick }) {

  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CurrentCardContext);

  //const [deleteButton, setdeleteButton] = useState(false)
    


    /*cards.forEach((item) => {
      if (item.owner._id === currentUser._id) {
        console.log('qq')
        setdeleteButton(true)
      }
      
      
    })*/

    /*const isOwn = cards.forEach((item) => {
      
      item.owner._id === currentUser._id;
    })

    if (isOwn) {
      setdeleteButton(true)
    } */
  

  


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
            card={item}  onCardClick={onCardClick} user={currentUser} cardDeleteButton={onDeleteCardClick}/>
        ))}

      </section>
    </main>
  )
}

export default Main;

//cardDeleteButton={showDeleteButton}

//isOwn={onCardDeleteIcon}

/*

onCardLike={handleCardLike}

 //<Card key={item.id} {...item} onCardLike={onCardLike}
            card={item} cardDeleteButton={showDeleteButton} />
        ))}

{cards && cards.map((item) => (

          <Card key={item.id} link={item.src} name={item.title} likes={item.likes.length} onCardLike={onCardLike}
            card={item} cardDeleteButton={showDeleteButton}/>
        ))}

*/