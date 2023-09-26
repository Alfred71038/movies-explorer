import React from "react"
import { durationFilmConverter } from "../../utils/utils"
import deleteButton from "../../images/icon-close.svg"
import "./MoviesCard.css"

function MoviesCard({
  card,
  saved,
  isSavedFilms,
  handleLikeFilm,
  savedMovies,
  onDeleteCard,
}) {
  console.log(handleLikeFilm)
  function whenClick() {
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  function whenDelete() {
    onDeleteCard(card)
  }

  const cardLikeButtonClassName = `${
    saved ? "card__like-button card__like-active" : "card__like-button"
  }`

  return (
    <>
      <li className="card" key={card.id}>
        <div className="card__wrapper">
          <a href={card.trailerLink} target="_blank" rel="noreferrer">
            <img
              className="card__image"
              alt={card.nameRU}
              src={
                isSavedFilms
                  ? card.image
                  : `https://api.nomoreparties.co/${card.image.url}`
              }
            />
          </a>

          {isSavedFilms ? (
            <button
              className="card__like-delete"
              type="button"
              onClick={whenDelete}
            >
              <img
                className="card__like-delete"
                src={deleteButton}
                alt="удалить"
              />
            </button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={whenClick}
            ></button>
          )}
          <div className="card__title-block">
            <h2 className="card__title">{card.nameRU}</h2>
            <span className="card__time">
              {durationFilmConverter(card.duration)}
            </span>
          </div>
        </div>
      </li>
    </>
  )
}

export default MoviesCard
