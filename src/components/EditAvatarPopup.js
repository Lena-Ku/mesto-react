import React, {useRef} from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateUser}) {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            avatar: avatarRef.current.value
        })
    }

    return (
        <PopupWithForm name="popup_avatar-edit" isOpen={isOpen} title="Обновить аватар" onClose={onClose} onSubmit={handleSubmit}
              submitButtonText="Сохранить"  children={
                <div className="popup__field">
                  <input className="popup__item" id="avatar" type="url" name="avatar" ref={avatarRef}
                    placeholder="Ссылка на аватар" required />
                  <span className="popup__item-error" id="avatar-error"></span>
                </div>
              }
            />
    )
}

export default EditAvatarPopup;