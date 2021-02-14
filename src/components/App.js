import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((response) => {
        setCurrentUser(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((response) => {
        setCards(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const likeRequest = !isLiked ? api.addCardLike(card._id) : api.deleteLike(card._id);
    likeRequest
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function handleUpdateUser(user) {
    api.updateUserProfile(user.name, user.about)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error)
      });
  }

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
      <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer/>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
