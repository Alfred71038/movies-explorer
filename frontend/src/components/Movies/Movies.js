import React, { useState, useEffect } from "react"
import "./Movies.css"
import Header from "../Header/Header"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import Footer from "../Footer/Footer"
import { filterMovies, filterFilmDuration } from "../../utils/utils"
import * as movies from "../../utils/MoviesApi"

function Movies({ loggedIn, handleLikeFilm, onDeleteCard, savedMovies }) {
  const [isLoading, setIsLoading] = useState(false)
  const [initialCardsMovies, setInitialCardsMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [isReqError, setisReqError] = useState(false)
  const [isShortFilm, setisShortFilm] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  function getShortToggleMovie() {
    setisShortFilm(!isShortFilm)
    if (!isShortFilm) {
      if (filterFilmDuration(initialCardsMovies).length === 0) {
        setFilteredMovies(filterFilmDuration(initialCardsMovies))
      } else {
        setFilteredMovies(filterFilmDuration(initialCardsMovies))
      }
    } else {
      setFilteredMovies(initialCardsMovies)
    }
    localStorage.setItem("shortMovies", !isShortFilm)
  }

  function editFilteredMovies(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short)
    setInitialCardsMovies(moviesCardList)
    setFilteredMovies(
      short ? filterFilmDuration(moviesCardList) : moviesCardList
    )
    localStorage.setItem("movies", JSON.stringify(moviesCardList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  function getSearchMovies(query) {
    localStorage.setItem("movieSearch", query)
    localStorage.setItem("shortMovies", isShortFilm)

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      editFilteredMovies(movies, query, isShortFilm)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsData) => {
          editFilteredMovies(cardsData, query, isShortFilm)
          setisReqError(false)
          console.log(cardsData)
        })
        .catch((err) => {
          setisReqError(true)
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setisShortFilm(true)
    } else {
      setisShortFilm(false)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCardsMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterFilmDuration(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true)
      } else {
        setIsNotFound(false)
      }
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        getSearchMovies={getSearchMovies}
        onfilteredFilmMovies={getShortToggleMovie}
        isShortFilm={isShortFilm}
      />
      <MoviesCardList
        cards={filteredMovies}
        isLoading={isLoading}
        isSavedFilms={false}
        savedMovies={savedMovies}
        handleLikeFilm={handleLikeFilm}
        onDeleteCard={onDeleteCard}
        isReqError={isReqError}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  )
}

export default Movies
