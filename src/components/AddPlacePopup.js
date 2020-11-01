import React, { useState } from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, register, errors, handleSubmit }) {

  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  function handlePlaceChange(e) {
    setPlace(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  const invalidPlace = errors.place?.type === "required" || errors.place?.type === "minLength";
  const invalidLink = errors.link?.type === "required" || errors.link?.type === "pattern";
  const isInvalid = invalidPlace || invalidLink;

  return (
    <PopupWithForm
      name="popup_add"
      isOpen={isOpen}
      title="Новое место"
      submitButtonText="Создать"
      onClose={onClose}
      handleSubmit={handleSubmit}
      isInvalid={isInvalid}
      children={
        <>
          <div className="popup__field">
            <input className={`popup__item popup__item_${invalidPlace ? "invalid" : "valid"} popup__item_el_place`} id="place"
              type="text" name="place" placeholder="Название" value={place} onChange={handlePlaceChange}
              ref={register({
                required: 'Это поле обязательно для заполнения',
                minLength: 2,
                maxLength: 30
              })
              } />
            <span className="popup__item-error_active" id="place-error">
              {errors.place?.type === "required" && 'Это поле обязательно для заполнения'}
              {errors.place?.type === "minLength" && 'Минимальное количество символов - 2'}
            </span>
          </div>
          <div className="popup__field">
            <input className={`popup__item popup__item_${invalidLink ? "invalid" : "valid"} popup__item_el_link`} id="link"
              name="link" placeholder="Ссылка на картинку" value={link} onChange={handleLinkChange}
              ref={register({
                required: 'Это поле обязательно для заполнения',
                pattern: {
                  value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                  message: 'Введите URL'
                }
              })} />
            <span className="popup__item-error_active" id="link-error">
              {errors.link?.type === "required" && 'Это поле обязательно для заполнения'}
              {errors.link?.type === "pattern" && 'Введите URL'}</span>
          </div>
        </>
      }
    />
  )
}

export default AddPlacePopup;

