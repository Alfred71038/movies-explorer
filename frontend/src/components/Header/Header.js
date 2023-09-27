import React from "react"
import { Link, NavLink } from "react-router-dom"
import "./Header.css"

import logo from "../../images/header-logo.svg"
import mobileMenu from "../../images/icon-menu.svg"
import Navigation from "../Navigation/Navigation"

function Header({ loggedIn }) {
  const [isClicked, setIsClicked] = React.useState(false)
  const activeColorLink = ({ isActive }) =>
    isActive ? "header__button_active" : "header__button"

  function handleOpenMobileMenu() {
    setIsClicked(true)
  }

  function handleCloseMobileMenu() {
    setIsClicked(false)
  }

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <Link to="/" className="form__logo">
            <img src={logo} alt="Логотип" />
          </Link>
          <div className="header__links">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-green">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className="header header__dark">
          <Link to="/" className="form__logo">
            <img src={logo} alt="Логотип" />
          </Link>
          <div className="header__links header__links_films">
            <NavLink to="/movies" className={activeColorLink}>
              Фильмы
            </NavLink>

            <NavLink to="/saved-movies" className={activeColorLink}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__links">
            <Link to="/profile" className="header__account-btn">
              Аккаунт
            </Link>
            <button
              className="header__mobile-btn"
              onClick={handleOpenMobileMenu}
            >
              <img src={mobileMenu} alt="Кнопка мобильного меню" />
            </button>
          </div>
          {isClicked ? (
            <Navigation handleCloseMobileMenu={handleCloseMobileMenu} />
          ) : (
            ""
          )}
        </header>
      )}
    </>
  )
}

export default Header
