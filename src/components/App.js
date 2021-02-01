import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">
      <Header/>
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer/>

      <PopupWithForm
        name={'profile'}
        title={'Редактировать профиль'}
        submitButtonText={'Сохранить'}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text" name="name" className="popup__input popup__input_type_name" id="name-input"
               placeholder="Имя" minLength={2} maxLength={40} required/>
        <span id="name-input-error" className="input-error"/>
        <input type="text" name="title" className="popup__input popup__input_type_title" id="title-input"
               placeholder="О себе" minLength={2} maxLength={200} required/>
        <span id="title-input-error" className="input-error"/>
      </PopupWithForm>

      <PopupWithForm
        name={'card'}
        title={'Новое место'}
        submitButtonText={'Сохранить'}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text" name="name" className="popup__input popup__input_type_card-title" id="card-title-input"
               placeholder="Название" minLength={2} maxLength={30} required/>
        <span id="card-title-input-error" className="input-error"/>
        <input type="url" name="link" className="popup__input popup__input_type_card-link" id="card-link-input"
               placeholder="Ссылка на картинку" required/>
        <span id="card-link-input-error" className="input-error"/>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

      <PopupWithForm
        name={'avatar'}
        title={'Обновить аватар'}
        submitButtonText={'Сохранить'}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input type="url" name="link" className="popup__input popup__input_type_avatar-link" id="avatar-link-input"
               placeholder="Ссылка на картинку" required/>
        <span id="avatar-link-input-error" className="input-error input-error_avatar"/>
      </PopupWithForm>

      <PopupWithForm
        name={'confirmation'}
        title={'Вы уверены?'}
        submitButtonText={'Да'}>
      </PopupWithForm>
    </div>
  );
}

export default App;
