import React from "react";

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="cards__group" key={props._id}>
      <div className="cards__image-container">
        <img src={props.card.link} alt={props.card.name} className="cards__photo" onClick={handleClick}/>
        <button type="button" aria-label="Remove" className="cards__remove-button"/>
      </div>
      <div className="cards__description-area">
        <p className="cards__description">{props.card.name}</p>
        <div className="cards__like-kit">
          <button type="button" aria-label="Like" className="cards__like-button"/>
          <p className="cards__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>)
}

export default Card;
