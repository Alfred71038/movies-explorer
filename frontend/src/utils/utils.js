import { MAX_SHOW_FILM_TIME } from "./config"

export function durationFilmConverter(duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}ч${minutes}м`
}

export function filterMovies(movies, query) {
  const moviesQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim()
    const movieEn = String(movie.nameEN).toLowerCase().trim()
    const userQuery = query.toLowerCase().trim()
    return (
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    )
  })
  return moviesQuery
}

export function filterFilmDuration(movies) {
  return movies.filter((movie) => movie.duration < MAX_SHOW_FILM_TIME)
}

export const handleSendingResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}
