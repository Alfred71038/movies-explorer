import React from "react"
import I from "../../images/Alfred71038.jpg"
import "./AboutMe.css"

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__description-block">
          <h3 className="about-me__name">Alfred71038</h3>
          <h4 className="about-me__job">Фронтенд-разработчик, 22 года</h4>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С
            2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-
            разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__github"
            href="https://github.com/Alfred71038"
            target="_blank"
            rel="noreferrer"
          >
            Ссылка на Github
          </a>
        </div>
        <img src={I} alt="Мое фото" className="about-me__image" />
      </div>
    </section>
  )
}

export default AboutMe
