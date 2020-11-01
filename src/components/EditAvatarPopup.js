import React from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, register, errors, handleSubmit, avatar, setAvatar }) {

  function handleAvatarChange(e) {
    setAvatar(e.target.value)
  }

  const invalidLink = errors.avatar?.type === "required" || errors.avatar?.type === "pattern";
  const isInvalid = invalidLink;

  return (
    <PopupWithForm
      name="popup_avatar-edit"
      isOpen={isOpen}
      title="Обновить аватар"
      onClose={onClose}
      submitButtonText="Сохранить"
      handleSubmit={handleSubmit}
      isInvalid={isInvalid}
      children={
        <div className="popup__field">
          <input className={`popup__item popup__item_${invalidLink ? "invalid" : "valid"}`}
            id="avatar" type="url" name="avatar" placeholder="Ссылка на аватар" value={avatar} onChange={handleAvatarChange}
            ref={register({
              required: 'Это поле обязательно для заполнения',
              pattern: {
                value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                message: 'Введите URL'
              }
            }
            )}
          />
          <span className="popup__item-error_active" id="avatar-error">
            {errors.avatar?.type === "pattern" && 'Введите URL'}
          </span>
        </div>
      }
    />
  )
}

export default EditAvatarPopup;

