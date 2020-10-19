import React, { useEffect, useState } from 'react';
import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api';
import { initialUser, CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentCardContext } from '../contexts/CurrentCardContext.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, onCardClick] = useState({});
  const [isPopupImageOpen, setIsPopupImageOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [cards, setCards] = useState([]);

  // Загрузка данных пользователя и карточек
  useEffect(() => {
    Promise.all([
      api.getUser(),
      api.getAllCards()
    ])
    .then(([user, initialCards]) => {
      setCurrentUser(user)
      setCards(initialCards)
    })
    .catch((error) => {
      console.log(error)
    })
  }, []) 

  // Открытие попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  // Открытие изображения
  function handleCardClick(card) {
    onCardClick(card)
    setIsPopupImageOpen(true)
  }

  // Закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsPopupImageOpen(false)
  }

  // Лайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (card._id && !isLiked) {
      api.addLikeCard(card._id, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      api.deleteLikeCard(card._id, isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((deletedCard) => {
        const newCards = cards.filter((c) => c._id !== card._id)
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Изменение профиля пользователя
  function handleUpdateUser({
    name,
    about: description }) {
    api.changeUser({
      name,
      about: description
    })
      .then((data) => {
        setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: data.avatar
        })
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Изменение аватара
  function handleUpdateAvatar({
    avatar: url }) {
    api.changeAvatar({ avatar: url })
      .then((data) => {
        setCurrentUser({
          name: data.name,
          about: data.about,
          avatar: data.avatar
        })
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Добавление новой карточки 
  function handleAddPlaceSubmit({
    name: place,
    link: link }) {

    api.addCard({
      name: place,
      link: link
    })
      .then((data) => {
        const newCard = data;
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
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

            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateCard={handleAddPlaceSubmit} />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar} />

            <PopupWithForm name="popup_popup_delete" title="Вы уверены?" submitButtonText="Да" />

            <ImagePopup name="popup_photo" onClose={closeAllPopups} isOpen={isPopupImageOpen} card={selectedCard} />

          </CurrentCardContext.Provider>
        </ CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;

