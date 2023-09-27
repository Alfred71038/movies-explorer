import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate, useLocation, Navigate } from "react-router-dom"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import InfoTooltip from "../InfoTooltip/InfoTooltip"
import InfoTooltipUpdate from "../infoTooltipUpdate/infoTooltipUpdate"
import * as api from "../../utils/MainApi"
import "./App.css"

import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
import NotFound from "../PageNotFound/PageNotFound"
import Login from "../Login/Login"
import Register from "../Register/Register"
import Profile from "../Profile/Profile"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"

function App() {
  const pathname = useLocation()
  const path = pathname.pathname
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [savedMovies, setSavedMovies] = useState([])
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isInfoToolTipUpdatePopupOpen, setInfoToolTipUpdatePopupOpen] =
    useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    // console.log(jwt)
    if (jwt) {
      api
        .getUser(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies")
            setIsLoggedIn(true)
          }
          navigate(path)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData)
        })
        .catch((err) => {
          console.log(err)
        })

      api
        .getMovies()
        .then((cardsData) => {
          console.log(cardsData)
          setSavedMovies(cardsData.reverse())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn, navigate])

  function registerUser({ name, email, password }) {
    api
      .register(name, email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)

        loginUser({ email, password })
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)

        setIsSuccess(false)
        console.log(err)
      })
  }

  function loginUser({ email, password }) {
    setIsLoading(true)
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setInfoToolTipPopupOpen(true)
          setIsSuccess(true)
          localStorage.setItem("jwt", res.token)
          navigate("/movies", { replace: true })
          setIsLoggedIn(true)
        }
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function editUserInfo(userInfo) {
    //console.log(userInfo)
    setIsLoading(true)
    api
      .updateUserInfo(userInfo)
      .then((data) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(true)
        setCurrentUser(data)
      })
      .catch((err) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(false)

        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function addLikeFilm(card) {
    api
      .createCard(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleUnauthorized(err)
      })
  }

  function removeFilmBaza(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        handleUnauthorized(err)
      })
  }

  function closeByOverlayPopups(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }

  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoToolTipUpdatePopupOpen(false)
  }

  const isOpen = isInfoToolTipPopupOpen || isInfoToolTipUpdatePopupOpen

  useEffect(() => {
    function closeByEscapePopups(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscapePopups)
      return () => {
        document.removeEventListener("keydown", closeByEscapePopups)
      }
    }
  }, [isOpen])

  function handleUnauthorized(err) {
    if (err === "Error: 401") {
      getSignOut()
    }
  }

  const getSignOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("jwt")
    localStorage.removeItem("movies")
    localStorage.removeItem("movieSearch")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("allMovies")
    localStorage.clear()
    navigate("/")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />

            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login onAuthorization={loginUser} isLoading={isLoading} />
                )
              }
            />

            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register onRegister={registerUser} isLoading={isLoading} />
                )
              }
            />

            <Route path={"*"} element={<NotFound />} />

            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  component={Movies}
                  savedMovies={savedMovies}
                  loggedIn={isLoggedIn}
                  handleLikeFilm={addLikeFilm}
                  onDeleteCard={removeFilmBaza}
                />
              }
            />

            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  component={SavedMovies}
                  savedMovies={savedMovies}
                  loggedIn={isLoggedIn}
                  onDeleteCard={removeFilmBaza}
                />
              }
            />

            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  signOut={getSignOut}
                  onUpdateUser={editUserInfo}
                  loggedIn={isLoggedIn}
                  isLoading={isLoading}
                />
              }
            />
          </Routes>

          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            isSuccess={isSuccess}
            onCloseOverlay={closeByOverlayPopups}
            onClose={closeAllPopups}
          />

          <InfoTooltipUpdate
            isOpen={isInfoToolTipUpdatePopupOpen}
            isUpdate={isUpdate}
            onCloseOverlay={closeByOverlayPopups}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
