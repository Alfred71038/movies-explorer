import React from "react"
import "../AuthForm/AuthForm.css"
import AuthForm from "../AuthForm/AuthForm"
import { EMAIL_REGEX, NAME_REGEX } from "../../utils/config"
import useForm from "../hooks/useForm"

function Register({ onRegister, isLoading }) {
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function handleFormSubmit(event) {
    event.preventDefault()
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      linkText=" Войти"
      link="/signin"
      onSubmit={handleFormSubmit}
      isDisabled={!isFormValid}
      isLoading={isLoading}
    >
      <label className="form__label">
        Имя
        <input
          name="name"
          className="form__input"
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
        <span className="form__input-text">{errors.name}</span>
      </label>
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          required
          placeholder="почта"
          onChange={handleChangeInput}
          pattern={EMAIL_REGEX}
          value={enteredValues.email || ""}
        />
        <span className="form__input-text">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          name="password"
          className="form__input"
          id="password-input"
          type="password"
          required
          minLength="8"
          maxLength="14"
          placeholder="пароль"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
        />
        <span className="form__input-text">{errors.password}</span>
      </label>
    </AuthForm>
  )
}

export default Register
