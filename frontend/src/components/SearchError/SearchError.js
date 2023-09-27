import React from "react"
import "./SearchError.css"

function SearchError({ errorText }) {
  return <p className="search__error search__error_margin">{errorText}</p>
}

export default SearchError
