import { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

const EditProfilePopup = ({
  isOpen,
  isSaving,
  loadingText,
  onClose,
  onUpdateUser,
}) => {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState(currentUser.name)
  const [description, setDescription] = useState(currentUser.about)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateUser({ name, about: description })
  }

  return (
    <PopupWithForm
      name="edit-profile"
      isOpen={isOpen}
      isSaving={isSaving}
      loadingText={loadingText}
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
