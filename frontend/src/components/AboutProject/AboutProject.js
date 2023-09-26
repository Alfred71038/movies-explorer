import React from "react";

import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__column">
        <div className="about-project__container">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__container">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__info">
        <p className="about-project__info-green">1 неделя</p>
        <p className="about-project__info-grey">4 недели</p>
        <p className="about-project__info-text">Back-end</p>
        <p className="about-project__info-text">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
