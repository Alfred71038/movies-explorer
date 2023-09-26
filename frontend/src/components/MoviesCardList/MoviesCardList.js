import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import SearchError from "../SearchError/SearchError"
import Preloader from "../Preloader/Preloader"
import { HIRES_ITEMS, DESKTOP_ITEMS, TABLET_ITEMS, MOBILE_ITEMS } from "../../utils/config"

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  handleLikeFilm,
  onDeleteCard,
  isReqError,
  isNotFound,
}) {
  const [shownMovies, setShownMovies] = useState(0)
  const { pathname } = useLocation()

  function getSavedMovie(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  function showDisplayFilm() {
    const display = window.innerWidth
    if (display > 1580) {
      setShownMovies(16) // 16 карточек
    } else if (display > 1180) {
      setShownMovies(12) // 12 карточек
    } else if (display > 767) {
      setShownMovies(8) // 8 карточек
    } else {
      setShownMovies(5) // 5 карточек
    }
  }

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", showDisplayFilm)
    }, 500)
  })

  useEffect(() => {
    showDisplayFilm()
  }, [])

  function showDisplayFilmPlayBtn() {
    const display = window.innerWidth
    if (display > 1180) {
      setShownMovies(shownMovies + HIRES_ITEMS)
    } else if (display > 1180) {
      setShownMovies(shownMovies + DESKTOP_ITEMS)
    } else if (display > 767) {
      setShownMovies(shownMovies + TABLET_ITEMS)
    } else {
      setShownMovies(shownMovies + MOBILE_ITEMS)
    }
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedMovie(savedMovies, card)}
                    cards={cards}
                    card={card}
                    savedMovies={savedMovies}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                  />
                ))}
              </ul>
              <div className="cards__button-container"></div>
            </>
          ) : (
            <>
              <ul className="cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={getSavedMovie(savedMovies, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    savedMovies={savedMovies}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                  />
                ))}
              </ul>
              <div className="cards__button-container">
                {cards.length > shownMovies ? (
                  <button
                    className="cards__button"
                    onClick={showDisplayFilmPlayBtn}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList
