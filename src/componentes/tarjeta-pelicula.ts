// Tarjeta de la grilla: póster (o placeholder gris) y título.
// Es un link al detalle de la película (detalle.html?id=123).
import { urlPoster } from '../api/tmdb-helpers'
import type { Pelicula } from '../tipos/pelicula'

export function crearTarjetaPelicula(pelicula: Pelicula): HTMLLIElement {
  const item = document.createElement('li')

  const link = document.createElement('a')
  link.href = `detalle.html?id=${pelicula.id}`
  link.className = 'tarjeta'

  const url = urlPoster(pelicula.posterPath, 'w500')
  if (url) {
    const img = document.createElement('img')
    img.className = 'poster'
    img.src = url
    img.alt = '' // el título ya está escrito debajo
    img.loading = 'lazy'
    link.append(img)
  } else {
    const vacio = document.createElement('span')
    vacio.className = 'poster poster-vacio'
    vacio.textContent = pelicula.titulo
    link.append(vacio)
  }

  const titulo = document.createElement('span')
  titulo.className = 'titulo'
  titulo.textContent = pelicula.titulo
  link.append(titulo)

  item.append(link)
  return item
}
