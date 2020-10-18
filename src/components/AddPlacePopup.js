import React, {useState} from 'react';
import PopupWithForm from '../components/PopupWithForm.js';

function AddPlacePopup ({isOpen, onClose, onUpdateCard}) {

    const [place, setPlace] = useState('');
    const [link, setLink] = useState('');

    function handlePlaceChange(e) {
        setPlace(e.target.value)
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    } 

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateCard({
            name: place,
            link: link
        })
    }

    return (
        <PopupWithForm name="popup_add" isOpen={isOpen} title="Новое место" submitButtonText="Создать" onClose={onClose}
        onSubmit={handleSubmit}  children={
                <>
                  <div className="popup__field">
                    <input className="popup__item popup__item_el_place" id="place" type="text" name="name"
                      placeholder="Название" required minLength="1" maxLength="30" value={place} onChange={handlePlaceChange}/>
                    <span className="popup__item-error" id="place-error"></span>
                  </div>
                  <div className="popup__field">
                    <input className="popup__item popup__item_el_link" id="link" type="url" name="link"
                      placeholder="Ссылка на картинку" required value={link} onChange={handleLinkChange}/>
                    <span className="popup__item-error" id="link-error"></span>
                  </div>
                </>
              }
            />
    )
}

export default AddPlacePopup;