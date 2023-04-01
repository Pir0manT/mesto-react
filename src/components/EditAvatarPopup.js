import { useContext, useEffect, useRef } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

const EditAvatarPopup = ({
  isOpen,
  isSaving,
  loadingText,
  onClose,
  onUpdateAvatar,
}) => {
  const currentUser = useContext(CurrentUserContext)
  const avatarRef = useRef()

  useEffect(() => {
    avatarRef.current.value = currentUser.avatar
    // avatarRef.current.value = ''
  }, [currentUser, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateAvatar({ avatar: avatarRef.current.value })
  }

  return (
    <PopupWithForm
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      isSaving={isSaving}
      loadingText={loadingText}
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
        ref={avatarRef}
      />
      <span className="popup__error avatar-link-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
