// Tarjeta de la grilla: póster (o placeholder gris) y título.
// Es un botón para que ya quede clickeable; el detalle se conecta más adelante.
import { urlPoster } from '../api/tmdb-helpers'
import type { Pelicula } from '../tipos/pelicula'

export function crearTarjetaPelicula(pelicula: Pelicula): HTMLLIElement {
  const item = document.createElement('li')

  const boton = document.createElement('button')
  boton.type = 'button'
  boton.className = 'tarjeta'

  const url = urlPoster(pelicula.posterPath, 'w500')
  if (url) {
    const img = document.createElement('img')
    img.className = 'poster'
    img.src = url
    img.alt = '' // el título ya está escrito debajo
    img.loading = 'lazy'
    boton.append(img)
  } else {
    const vacio = document.createElement('span')
    vacio.className = 'poster poster-vacio'
    vacio.textContent = pelicula.titulo
    boton.append(vacio)
  }

  const titulo = document.createElement('span')
  titulo.className = 'titulo'
  titulo.textContent = pelicula.titulo
  boton.append(titulo)

  item.append(boton)
  return item
}
