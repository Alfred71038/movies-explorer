import React, { useState, useEffect } from "react"
// import "./SavedMovies.css"
import Header from "../Header/Header"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import { filterMovies, filterFilmDuration } from "../../utils/utils"

function SavedMovies({ loggedIn, savedMovies, onDeleteCard }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)

  const [isShortFilm, setisShortFilm] = useState(false)

  const [isNotFound, setIsNotFound] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")

  function getSearchMovies(query) {
    setSearchQuery(query)
  }

  function getShortToggleMovie() {
    setisShortFilm(!isShortFilm)
  }

  useEffect(() => {
    const moviesCardList = filterMovies(savedMovies, searchQuery)
    setFilteredMovies(
      isShortFilm ? filterFilmDuration(moviesCardList) : moviesCardList
    )
  }, [savedMovies, isShortFilm, searchQuery])

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
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
      />
      <MoviesCardList
        cards={filteredMovies}
        isSavedFilms={true}
        savedMovies={savedMovies}
        onDeleteCard={onDeleteCard}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  )
}

export default SavedMovies
