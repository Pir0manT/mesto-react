import React from 'react'
import defaultAvatar from '../images/avatar.jpg'
import { api } from '../utils/Api'
import Card from './Card'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто')
  const [userDescription, setUserDescription] = React.useState(
    'Исследователь океана'
  )
  const [userAvatar, setUserAvatar] = React.useState(defaultAvatar)
  const [cards, setCards] = React.useState([])
  const [userId, setUserId] = React.useState('')

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([{ name, about, avatar, _id }, cards]) => {
        setUserAvatar(avatar)
        setUserName(name)
        setUserDescription(about)
        setUserId(_id)
        setCards(cards)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <main>
      <section className="profile" aria-label="Профиль пользователя">
        <img
          className="profile__avatar"
          src={userAvatar}
          alt="Фотография пользователя"
        />
        <button
          className="profile__edit"
          type="button"
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__edit-button link-opacity"
              type="button"
              aria-label="редактировать профиль"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="profile__add-button link-opacity"
          type="button"
          aria-label="Добавить картинку"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements" aria-label="Различные фотографии">
        <ul className="elements__grid">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleClick={() => onCardClick(card)}
              userId={userId}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main
