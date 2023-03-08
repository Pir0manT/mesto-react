import React from 'react'

function PopupWithForm({ name, isOpen, title, btnTitle, children, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={name} className="popup__form">
          {children}
          <button className="popup__save" type="submit">
            {btnTitle}
          </button>
        </form>
        <button
          className="popup__close link-opacity"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  )
}

export default PopupWithForm
