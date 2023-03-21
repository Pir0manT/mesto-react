import { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import ImagePopup from './ImagePopup'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/Api'
import spinner from '../images/Spinner.svg'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'

function App() {
  const [isEditProfilePopupOpen, setOpenEditProfile] = useState(false)
  const [isEditAvatarPopupOpen, setOpenEditAvatar] = useState(false)
  const [isAddPlacePopupOpen, setOpenAddPlace] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImageOpen, setImageOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    name: 'Загрузка...',
    about: 'Загрузка...',
    avatar: spinner,
    id: '',
  })
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userProfile, cards]) => {
        setCurrentUser(userProfile)
        setCards(cards)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setImageOpen(true)
  }

  const handleCardLike = (card) => {
    const cardIsLiked = card.likes.some((like) => like._id === currentUser._id)
    api
      .changeLike(card._id, cardIsLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        )
      )
      .catch((error) => console.log(error))
  }

  const handleCardDelete = (id) => {
    api
      .delCard(id)
      .then(() => setCards((state) => state.filter((card) => card._id !== id)))
      .catch((error) => console.log(error))
  }

  const handleUpdateUser = (newUser) => {
    api
      .setProfile(newUser)
      .then((user) => setCurrentUser(user))
      .catch((error) => console.log(error))
    closeAllPopups()
  }

  const handleUpdateAvatar = (avatar) => {
    api
      .setAvatar(avatar)
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((error) => console.log(error))
    closeAllPopups()
  }

  const handleAddPlaceClick = () => {
    setOpenAddPlace(true)
  }

  const handleEditAvatarClick = () => {
    setOpenEditAvatar(true)
  }

  const handleEditProfileClick = () => {
    setOpenEditProfile(true)
  }

  const closeAllPopups = () => {
    isImageOpen && setImageOpen(false)
    isAddPlacePopupOpen && setOpenAddPlace(false)
    isEditAvatarPopupOpen && setOpenEditAvatar(false)
    isEditProfilePopupOpen && setOpenEditProfile(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="add-element"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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
          />
          <span className="popup__error element-name-error"></span>
          <input
            required
            className="popup__input"
            type="url"
            placeholder="Ссылка на картинку"
            id="element-link"
            name="link"
          />
          <span className="popup__error element-link-error"></span>
        </PopupWithForm>

        <ImagePopup
          name="open-image"
          isOpen={isImageOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
