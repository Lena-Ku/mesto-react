import React, {useState, useEffect, useContext} from 'react';
import PopupWithForm from '../components/PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

    const {onClose, isOpen, onUpdateUser} = props;

    const [name, setName] = useState('Жак-Ив Кусто');
    const [description, setDescription] = useState('Исследователь океана');
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
   
      function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description
        })
    }

    return (

        <PopupWithForm name="popup_edit" isOpen={isOpen} title="Редактировать профиль" onClose={onClose}
            submitButtonText="Сохранить" onSubmit={handleSubmit} children={
                <>
                    <div className="popup__field">
                        <input className="popup__item popup__item_el_heading" onChange={handleNameChange} id="name" type="text" name="name"
                             placeholder="Имя" required minLength="2" maxLength="40" value={name}/>
                        <span className="popup__item-error" id="name-error"></span>
                    </div>
                    <div className="popup__field">
                        <input className="popup__item popup__item_el_about" onChange={handleDescriptionChange} id="about" type="text" name="about"
                             placeholder="О себе" required minLength="2" maxLength="200" value={description}/>
                        <span className="popup__item-error " id="about-error"></span>
                    </div>
                </>
            }
        />    
    )
}

export default EditProfilePopup;