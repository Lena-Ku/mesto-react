import React, { useState } from 'react';

import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {

  const [isEditProfilePopupOpen, OpenPopupProfile] = useState(false);
  const [isAddPlacePopupOpen, OpenPopupPlace] = useState(false);
  const [isEditAvatarPopupOpen, OpenPopupAvatar] = useState(false);
  const [selectedCard, onCardClick] = useState({});
  const [isPopupImageOpen, OpenPopupImage] = useState(false)

  function handleEditProfileClick() {
    OpenPopupProfile("popup_opened");
  }

  function handleAddPlaceClick() {
    OpenPopupPlace("popup_opened");
  }

  function handleEditAvatarClick() {
    OpenPopupAvatar("popup_opened");
  }

  function handleCardClick(card) {
    onCardClick(card)
    OpenPopupImage("popup_opened")
  }

  function closeAllPopups() {
    OpenPopupPlace(false)
    OpenPopupProfile(false)
    OpenPopupAvatar(false)
    OpenPopupImage(false)
  }

  return (
    <>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
          openFunction={handleCardClick} />
        <Footer />
        <PopupWithForm name="popup_edit" isOpen={isEditProfilePopupOpen} title="Редактировать профиль" onClose={closeAllPopups}
          submit="Сохранить" children={
            <>
              <div className="popup__field">
                <input className="popup__item popup__item_el_heading" id="name" type="text" name="name"
                  defaultValue="Жак-Ив Кусто" placeholder="Имя" required minLength="2" maxLength="40" />
                <span className="popup__item-error" id="name-error"></span>
              </div>
              <div className="popup__field">
                <input className="popup__item popup__item_el_about" id="about" type="text" name="about"
                  defaultValue="Исследователь океана" placeholder="О себе" required minLength="2" maxLength="200" />
                <span className="popup__item-error " id="about-error"></span>
              </div>
            </>
          }
        />
        <PopupWithForm name="popup_add" isOpen={isAddPlacePopupOpen} title="Новое место" submit="Создать" onClose={closeAllPopups}
          children={
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
          submit="Сохранить" children={
            <div className="popup__field">
              <input className="popup__item" id="avatar" type="url" name="avatar"
                placeholder="Ссылка на аватар" required />
              <span className="popup__item-error" id="avatar-error"></span>
            </div>
          }
        />
        <PopupWithForm name="popup_popup_delete" title="Вы уверены?" submit="Да" children={
          <button className="popup__button popup__button_delete" type="submit">Да</button>
        }
        />
        <ImagePopup name="popup_photo" onClose={closeAllPopups} isOpen={isPopupImageOpen} card={selectedCard} />
      </div>
    </>
  );
}

export default App;
