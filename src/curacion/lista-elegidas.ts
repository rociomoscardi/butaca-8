// Lista de películas elegidas para la semana, cada una con botón para sacarla.
import { urlPoster } from '../api/tmdb-helpers'
import type { Pelicula } from '../tipos/pelicula'
import { crearMiniatura } from './buscador'

export function crearListaElegidas(peliculas: Pelicula[], alSacar: (id: number) => void): HTMLElement {
  if (peliculas.length === 0) {
    const vacio = document.createElement('p')
    vacio.textContent = 'Todavía no elegiste películas.'
    return vacio
  }

  const lista = document.createElement('ol')
  lista.className = 'elegidas'

  for (const pelicula of peliculas) {
    const item = document.createElement('li')
    const texto = document.createElement('span')
    texto.textContent = `${pelicula.titulo} (${pelicula.anio ?? 's/f'})`

    const boton = document.createElement('button')
    boton.type = 'button'
    boton.textContent = 'Sacar'
    boton.addEventListener('click', () => alSacar(pelicula.id))

    item.append(crearMiniatura(urlPoster(pelicula.posterPath, 'w200')), texto, boton)
    lista.append(item)
  }
  return lista
}
