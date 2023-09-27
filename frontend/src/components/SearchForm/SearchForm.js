import React, { useState, useEffect } from "react"
import "./SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import { useLocation } from "react-router-dom"

function SearchForm({ getSearchMovies, onfilteredFilmMovies, isShortFilm }) {
  const [isQueryError, setIsQueryError] = useState(false)
  const [query, setQuery] = useState("")
  const location = useLocation()

  function handleFormSubmit(e) {
    e.preventDefault()
    if (query.trim().length === 0) {
      setIsQueryError(true)
    } else {
      setIsQueryError(false)
      getSearchMovies(query)
    }
  }

  function getClickInputQuery(e) {
    setQuery(e.target.value)
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch")
      setQuery(localQuery)
    }
  }, [location])

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="query"
          id="search-input"
          placeholder="Фильм"
          className="search__form-input"
          onChange={getClickInputQuery}
          value={query || ""}
        />
        <button type="submit" className="search__form-button"></button>
      </form>

      <FilterCheckbox
        onfilteredFilmMovies={onfilteredFilmMovies}
        isShortFilm={isShortFilm}
      />
      {isQueryError && (
        <span className="search__form-error">Нужно ввести ключевое слово</span>
      )}

      <div className="search__border-bottom"></div>
    </section>
  )
}

export default SearchForm
