import React from "react"
import { Link, NavLink } from "react-router-dom"
import "./Navigation.css"

function Navigation({ handleCloseMobileMenu }) {
  const activeColorLink = ({ isActive }) =>
    isActive ? "navigation__link_active" : "navigation__link"

  return (
    <div className="navigation">
      <div className="navigation__container"></div>
      <div className="navigation__menu">
  <button
          className="navigation__close-button"
          onClick={handleCloseMobileMenu}
        ></button>
        <nav className="navigation__links">
          <NavLink to="/" className={activeColorLink}>
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            onClick={handleCloseMobileMenu}
            className={activeColorLink}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            onClick={handleCloseMobileMenu}
            className={activeColorLink}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>

        <Link
          to="/profile"
          className="navigation__account-button"
          onClick={handleCloseMobileMenu}
        >
          Аккаунт
        </Link>
      </div>
    </div>
  )
}

export default Navigation
