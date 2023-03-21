import { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser])

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateUser({ name, about: description })
    onClose()
  }

  return (
    <PopupWithForm
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      btnTitle="Сохранить"
    >
      <input
        required
        className="popup__input"
        type="text"
        placeholder="Ваше имя"
        id="name-input"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__error name-input-error"></span>
      <input
        required
        className="popup__input"
        type="text"
        placeholder="Немного о себе"
        id="description-input"
        minLength="2"
        maxLength="200"
        name="about"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span className="popup__error description-input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup
