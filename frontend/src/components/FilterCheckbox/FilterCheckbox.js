import React from "react"
import "./FilterCheckbox.css"

function FilterCheckbox({ onfilteredFilmMovies, isShortFilm }) {
  return (
    <section className="filter-checkbox">
      <div className="filter-checkbox__container">
        <label className="filter-checkbox__label">
          <input
            className="filter-checkbox__input"
            type="checkbox"
            id="short-movies"
            onChange={onfilteredFilmMovies}
            checked={isShortFilm}
          />
          <div className="filter-checkbox__slider filter-checkbox__round"></div>
        </label>
        <span className="filter-checkbox__text">Короткометражки</span>
      </div>
    </section>
  )
}

export default FilterCheckbox
