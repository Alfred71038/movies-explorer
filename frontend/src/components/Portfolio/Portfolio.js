import React from "react";

import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/Alfred71038/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
            <p className="portfolio__icon">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/Alfred71038/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
            <p className="portfolio__icon">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://github.com/Alfred71038/react-mesto-auth"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
            <p className="portfolio__icon">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
