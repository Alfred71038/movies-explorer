import React from "react"
import "../AuthForm/AuthForm.css"
import AuthForm from "../AuthForm/AuthForm"
import useForm from "../hooks/useForm"
import { EMAIL_REGEX } from "../../utils/config"

function Login({ onAuthorization, isLoading }) {
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()
  function handleFormSubmit(event) {
    event.preventDefault()

    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <AuthForm
      title="Рады видеть!"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      onSubmit={handleFormSubmit}
      isDisabled={!isFormValid}
      isLoading={isLoading}
      noValidate
    >
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
          minLength="8"
          maxLength="14"
          required
          placeholder="пароль"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
        />
        <span className="form__input-text">{errors.password}</span>
      </label>
    </AuthForm>
  )
}

export default Login
