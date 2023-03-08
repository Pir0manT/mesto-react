import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import ImagePopup from './ImagePopup'
function App() {
  const [selectedCard, setSelectedCard] = React.useState({})
  const [isImageOpen, setImageOpen] = React.useState(false)

  function handleCardClick(card) {
    setSelectedCard(card)
    setImageOpen(true)
  }

  function closeAllPopups() {
    isImageOpen && setImageOpen(false)
  }
  return (
    <>
      <div className="page">
        <Header />
        <Main
          // onEditAvatar={handleEditAvatarClick}
          // onEditProfile={handleEditProfileClick}
          // onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>

      <ImagePopup
        name="open-image"
        isOpen={isImageOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </>
  )
}

export default App
