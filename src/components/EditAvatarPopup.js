import { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const currentUser = useContext(CurrentUserContext)
  const [avatar, setAvatar] = useState(currentUser.avatar)
  useEffect(() => setAvatar(currentUser.avatar), [currentUser])

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateAvatar({ avatar })
  }

  return (
    <PopupWithForm
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      btnTitle="Сохранить"
    >
      <input
        required
        className="popup__input"
        type="url"
        placeholder="Ссылка на аватар"
        id="avatar-link"
        name="avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
      <span className="popup__error avatar-link-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
