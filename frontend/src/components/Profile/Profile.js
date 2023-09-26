import React, { useEffect, useContext, useState } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import "./Profile.css"
import Header from "../Header/Header"
import useForm from "../hooks/useForm"
import { EMAIL_REGEX, NAME_REGEX } from "../../utils/config"

function Profile({ isLoading, signOut, onUpdateUser, loggedIn }) {
  // Получение контекста
  const currentUser = useContext(CurrentUserContext)

  const { enteredValues, errors, handleChangeInput, isFormValid, resetForm } =
    useForm()

  const [isLastValues, setIsLastValues] = useState(false)

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser)
    }
  }, [currentUser, resetForm])

  function handleFormSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    })
  }

  useEffect(() => {
    if (
      currentUser.name === enteredValues.name &&
      currentUser.email === enteredValues.email
    ) {
      setIsLastValues(true)
    } else {
      setIsLastValues(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredValues])

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h3 className="profile__title">Привет, {currentUser.name}!</h3>
        <form
          id="form"
          className="profile__form"
          onSubmit={handleFormSubmit}
          noValidate
        >
          <label className="profile__label">
            Имя
            <input
              name="name"
              className="profile__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              required
              placeholder="имя"
              onChange={handleChangeInput}
              value={enteredValues.name || ""}
              pattern={NAME_REGEX}
            />
            <span className="profile__form-text">{errors.name}</span>
          </label>

          <div className="profile__border"></div>
          <label className="profile__label">
            E-mail
            <input
              name="email"
              className="profile__input"
              id="email-input"
              type="email"
              required
              placeholder="почта"
              onChange={handleChangeInput}
              pattern={EMAIL_REGEX}
              value={enteredValues.email || ""}
            />
            <span className="profile__form-text">{errors.email}</span>
          </label>
          <button
            type="submit"
            disabled={!isFormValid ? true : false}
            className={
              !isFormValid || isLoading || isLastValues
                ? "profile__button-save form__button-save_inactive"
                : "profile__button-save"
            }
          >
            Редактировать
          </button>
          <button type="button" className="profile__link" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  )
}

export default Profile
