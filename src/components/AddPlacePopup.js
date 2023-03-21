import { useEffect, useRef } from 'react'
import PopupWithForm from './PopupWithForm'

const AddPlacePopup = ({
  isOpen,
  isSaving,
  loadingText,
  onClose,
  onAddPlace,
}) => {
  const nameRef = useRef()
  const linkRef = useRef()

  useEffect(() => {
    nameRef.current.value = ''
    linkRef.current.value = ''
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddPlace({ name: nameRef.current.value, link: linkRef.current.value })
  }

  return (
    <PopupWithForm
      name="add-element"
      isOpen={isOpen}
      isSaving={isSaving}
      loadingText={loadingText}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      btnTitle="Создать"
    >
      <input
        required
        className="popup__input"
        type="text"
        placeholder="Название"
        id="element-name"
        minLength="2"
        maxLength="30"
        name="name"
        ref={nameRef}
      />
      <span className="popup__error element-name-error"></span>
      <input
        required
        className="popup__input"
        type="url"
        placeholder="Ссылка на картинку"
        id="element-link"
        name="link"
        ref={linkRef}
      />
      <span className="popup__error element-link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup
