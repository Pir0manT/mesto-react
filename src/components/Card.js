import React from 'react'

function Card({ card, handleClick, userId }) {
  const isLiked = card.likes.some((like) => like._id === userId)
  const itsMyCard = card.owner._id === userId
  return (
    <li className="element">
      {itsMyCard && (
        <button
          className="element__delete link-opacity"
          type="button"
          aria-label="удалить"
        />
      )}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like_container">
          <button
            className={`element__heart ${
              isLiked ? 'element__heart-active' : ''
            }`}
            type="button"
            aria-label="нравится"
          />
          <div className="element__heart-count">{card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

export default Card
