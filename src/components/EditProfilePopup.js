import React, { useEffect, useContext } from 'react';
import PopupWithForm from '../components/PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

    const { onClose, isOpen, register, errors, handleSubmit, name, setName, description, setDescription, } = props;

    const currentUser = useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    const invalidName = errors.name?.type === "required" || errors.name?.type === "minLength";
    const invalidAbout = errors.about?.type === "required" || errors.about?.type === "minLength";

    const isInvalid = invalidName || invalidAbout;

    return (

        <PopupWithForm
            name="popup_edit"
            isOpen={isOpen}
            title="Редактировать профиль"
            onClose={onClose}
            submitButtonText="Сохранить"
            handleSubmit={handleSubmit}
            isInvalid={isInvalid}
            children={
                <>
                    <div className="popup__field">
                        <input className={`popup__item popup__item_${invalidName ? "invalid" : "valid"} popup__item_el_heading`}
                            id="name" type="text" name="name"
                            placeholder="Имя" value={name} onChange={handleNameChange}
                            ref={register({
                                required: 'Это поле обязательно для заполнения',
                                minLength: 2,
                                maxLength: 40
                            })
                            } />
                        <span className="popup__item-error_active" id="name-error">
                            {errors.name?.type === "required" && 'Это поле обязательно для заполнения'}
                            {errors.name?.type === "minLength" && 'Минимальное количество символов - 2'}</span>
                    </div>
                    <div className="popup__field">
                        <input className={`popup__item popup__item_${invalidAbout ? "invalid" : "valid"} popup__item_el_heading`}
                            onChange={handleDescriptionChange} id="about" type="text" name="about"
                            placeholder="О себе" value={description}
                            ref={register({
                                required: 'Это поле обязательно для заполнения',
                                minLength: 2,
                                maxLength: 200
                            })
                            } />
                        <span className="popup__item-error_active" id="about-error">
                            {errors.about?.type === "required" && 'Это поле обязательно для заполнения'}
                            {errors.about?.type === "minLength" && 'Минимальное количество символов - 2'}</span>
                    </div>
                </>
            }
        />
    )
}

export default EditProfilePopup;

