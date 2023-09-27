import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navtab-menu">
      <a href="#project" className="navtab-link">
        О проекте
      </a>
      <a href="#techs" className="navtab-link">
        Технологии
      </a>
      <a href="#about-me" className="navtab-link">
        Студент
      </a>
    </nav>
  );
}

export default NavTab;
