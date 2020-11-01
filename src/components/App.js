import React, { useEffect, useState } from 'react';
import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api';
import { initialUser, CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CurrentCardContext } from '../contexts/CurrentCardContext.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
import { useForm } from 'react-hook-form';
import DeletePopup from './DeletePopup.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setisDeletePopupOpen] = useState(false);
  const [selectedCard, onCardClick] = useState({});
  const [isPopupImageOpen, setIsPopupImageOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(initialUser);
  const [cards, setCards] = useState([]);
  const [name, setName] = useState('Жак-Ив Кусто');
  const [description, setDescription] = useState('Исследователь океана');
  const [avatar, setAvatar] = useState('');

  // Валидация формы редактирования профиля
  const { register, errors, handleSubmit, clearErrors, reset } = useForm({
    mode: 'all',
  });

  // Валидация формы добавления карточки
  const {
    register: registerAddPlace,
    errors: errorsAddPlace,
    handleSubmit: handleSubmitAddPlace,
    clearErrors: clearErrorsAddPlace,
    reset: resetAddPlace
  } = useForm({
    mode: 'all',
  });

  // Валидация формы редактирования аватара
  const {
    register: registerAvatar,
    errors: errorsAvatar,
    handleSubmit: handleSubmitAvatar,
    clearErrors: clearErrorsAvatar,
    reset: resetAvatar
  } = useForm({
    mode: 'all',
  });

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

  function handleDeletePopupClick(card) {
    onCardClick(card)
    setisDeletePopupOpen(true)
    console.log(card)
  }

  // Открытие изображения
  function handleCardClick(card) {
    onCardClick(card)
    setIsPopupImageOpen(true)
  }

  // Закрытие всех попапов и сброс ошибок
  function closeAllPopups() {
    clearErrors()
    clearErrorsAddPlace()
    clearErrorsAvatar()
    setisDeletePopupOpen(false)
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
    console.log(card)
    api.deleteCard(card._id)
      .then((deletedCard) => {
        const newCards = cards.filter((c) => c._id !== card._id)
        setCards(newCards);
        closeAllPopups();
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
  function handleAddPlaceSubmit({ place, link }) {
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
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onDeleteCardClick={handleDeletePopupClick} />
            <Footer />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={() => {
                reset({
                  name: currentUser.name,
                  about: currentUser.about
                });
                closeAllPopups();
                setName(currentUser.name)
                setDescription(currentUser.about)
              }}
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              register={register}
              errors={errors}
              handleSubmit={handleSubmit(handleUpdateUser)}
              clearErrors={clearErrors}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              register={registerAddPlace}
              errors={errorsAddPlace}
              clearErrors={clearErrorsAddPlace}
              handleSubmit={handleSubmitAddPlace(handleAddPlaceSubmit)}
              onClose={() => {
                resetAddPlace({
                  place: '',
                  link: ''
                });
                closeAllPopups();
              }} />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              register={registerAvatar}
              errors={errorsAvatar}
              clearErrors={clearErrorsAvatar}
              handleSubmit={handleSubmitAvatar(handleUpdateAvatar)}
              avatar={avatar}
              setAvatar={setAvatar}
              onClose={() => {
                resetAvatar({
                  avatar: ''
                });
                closeAllPopups()
                setAvatar('')
              }}
            />

            <DeletePopup
              isOpen={isDeletePopupOpen}
              onClose={closeAllPopups}
              handleSubmit={handleCardDelete}
              card={selectedCard} />

            <ImagePopup
              name="popup_photo"
              onClose={closeAllPopups}
              isOpen={isPopupImageOpen}
              card={selectedCard} />

          </CurrentCardContext.Provider>
        </ CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
