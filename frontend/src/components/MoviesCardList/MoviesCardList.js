import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import SearchError from "../SearchError/SearchError"
import Preloader from "../Preloader/Preloader"
import { DESKTOP_ITEMS, TABLET_ITEMS, MOBILE_ITEMS, WITH_DISPLAY_DESKTOP, WITH_DISPLAY_TABLET, COUNT_EG, COUNT_FV, COUNT_TW, } from "../../utils/config"

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
    const display = window.innerWidth;

    if (display >= WITH_DISPLAY_DESKTOP) {
      setShownMovies(COUNT_TW); // 12 карточек
    } else if (display <= WITH_DISPLAY_TABLET) {
      setShownMovies(COUNT_FV); // 5 карточек
    } else {
      setShownMovies(COUNT_EG); // 8 карточек
    }
  }

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", showDisplayFilm)
    }, 500)
    return () => {
      window.removeEventListener("resize", showDisplayFilm)
    }
  })

  useEffect(() => {
    showDisplayFilm()
  }, [])

  function showDisplayFilmPlayBtn() {
    const display = window.innerWidth
    if (display > WITH_DISPLAY_DESKTOP) {
      setShownMovies(shownMovies + DESKTOP_ITEMS)
    }
    else if (display > WITH_DISPLAY_TABLET) {
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
