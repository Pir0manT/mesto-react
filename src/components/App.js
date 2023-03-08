import React from 'react'
import Header from './Header'
import Footer from "./Footer";
import Main from "./Main";
function App() {
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImageOpen, setImageOpen] = React.useState(false);
  return (
    <>
      <div className="page">
        <Header />
        <Main
          // onEditAvatar={handleEditAvatarClick}
          // onEditProfile={handleEditProfileClick}
          // onAddPlace={handleAddPlaceClick}
          // onCardClick={handleCardClick}
        />
        <Footer />
      </div>
    </>
  )
}

export default App
