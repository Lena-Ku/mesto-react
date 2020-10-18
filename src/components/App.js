import React, { useEffect, useState } from 'react';

import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api';
import { initialUser, CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentCardContext, card } from '../contexts/CurrentCardContext.js';
import EditProfilePopup from '../components/EditProfilePopup.js';

function App() {

  /*function getAllData() {
    return Promise.all([
      api.getUser(),
      api.getAllCards()
    ])
    .then(([user, cards]) => {
      return {user, cards}
    })
  }

  const promise = getAllData(); */

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, onCardClick] = useState({});
  const [isPopupImageOpen, setIsPopupImageOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [cards, setCards] = useState([]);
  const [newUser, onUpdateUser] = useState(false);


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    onCardClick(card)
    setIsPopupImageOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsPopupImageOpen(false)
  }

  /*useEffect(() => {
    promise.then(data => {
      setCurrentUser(data.user);
      setCards(data.cards);
    });
  }, []);*/



  useEffect(() => {
    api.getUser()
      .then((data) =>
        setCurrentUser(data)
      )
    api.getAllCards()
      .then((data) => {
        console.log(data)
        setCards(data)}
      )
  }, [])


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (card._id, !isLiked) {
      api.addLikeCard(card._id, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
    } else {
      api.deleteLikeCard(card._id, isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then((deletedCard) => {
      const newCards = cards.filter((c) => c._id !== card._id)
      setCards(newCards);
    })
  }

  function handleUpdateUser(currentUser) {
    console.log('123')
    onUpdateUser(true)
    api.getUser(currentUser)
    .then((data) => {
      console.log(data)
      //setCurrentUser(data.name)
    })
    closeAllPopups();
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('11')
}
  

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser} >
          <Header />
          <CurrentCardContext.Provider value={cards}>
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick} onCardLike={handleCardLike} onDeleteCardClick={handleCardDelete} />
            <Footer />

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}
            handleSubmit={handleSubmit}/> 

            <PopupWithForm name="popup_add" isOpen={isAddPlacePopupOpen} title="Новое место" submitButtonText="Создать" onClose={closeAllPopups}
              onSubmit={handleSubmit}  children={
                <>
                  <div className="popup__field">
                    <input className="popup__item popup__item_el_place" id="place" type="text" name="name"
                      placeholder="Название" required minLength="1" maxLength="30" />
                    <span className="popup__item-error" id="place-error"></span>
                  </div>
                  <div className="popup__field">
                    <input className="popup__item popup__item_el_link" id="link" type="url" name="link"
                      placeholder="Ссылка на картинку" required />
                    <span className="popup__item-error" id="link-error"></span>
                  </div>
                </>
              }
            />
            <PopupWithForm name="popup_avatar-edit" isOpen={isEditAvatarPopupOpen} title="Обновить аватар" onClose={closeAllPopups}
              onSubmit={handleSubmit} submitButtonText="Сохранить" children={
                <div className="popup__field">
                  <input className="popup__item" id="avatar" type="url" name="avatar"
                    placeholder="Ссылка на аватар" required />
                  <span className="popup__item-error" id="avatar-error"></span>
                </div>
              }
            />
            <PopupWithForm name="popup_popup_delete" title="Вы уверены?" submitButtonText="Да" onSubmit={handleSubmit}/>

            <ImagePopup name="popup_photo" onClose={closeAllPopups} isOpen={isPopupImageOpen} card={selectedCard} />

          </CurrentCardContext.Provider>
        </ CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;

