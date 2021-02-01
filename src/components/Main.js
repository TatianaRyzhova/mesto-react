import React, {useEffect, useState} from "react";
import {api} from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((response) => {
        setUserName(response.name)
        setUserDescription(response.about)
        setUserAvatar(response.avatar)
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

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__picture-kit">
          <img src={userAvatar} alt="#" className="profile__picture"/>
          <div className="profile__overlay" onClick={props.onEditAvatar}/>
        </div>
        <div className="profile__info">
          <div className="profile__name-kit">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" aria-label="Edit" className="profile__edit-button" onClick={props.onEditProfile}/>
          </div>
          <p className="profile__title">{userDescription}</p>
        </div>
        <button type="button" aria-label="Add" className="profile__add-button" onClick={props.onAddPlace}/>
      </section>

      <template id="cards-template" className="cards">
        {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
            />
          )
        )}
      </template>
    </main>
  )
}

export default Main;
