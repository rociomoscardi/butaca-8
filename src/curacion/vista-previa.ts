// Vista previa de una película con título y sinopsis editables.
// El botón "Agregar" devuelve la película con las ediciones aplicadas.
import { urlPoster } from '../api/tmdb-helpers'
import type { Pelicula } from '../tipos/pelicula'

export function crearVistaPrevia(pelicula: Pelicula, alAgregar: (pelicula: Pelicula) => void): HTMLElement {
  const contenedor = document.createElement('article')
  contenedor.className = 'vista-previa'

  const poster = urlPoster(pelicula.posterPath, 'w500')
  if (poster) {
    const img = document.createElement('img')
    img.src = poster
    img.alt = `Póster de ${pelicula.titulo}`
    contenedor.append(img)
  } else {
    contenedor.append(crearParrafo('Sin póster.'))
  }

  const inputTitulo = document.createElement('input')
  inputTitulo.type = 'text'
  inputTitulo.value = pelicula.titulo

  const textareaSinopsis = document.createElement('textarea')
  textareaSinopsis.rows = 6
  textareaSinopsis.value = pelicula.sinopsis

  const boton = document.createElement('button')
  boton.type = 'button'
  boton.className = 'agregar'
  boton.dataset.id = String(pelicula.id)
  boton.textContent = 'Agregar a esta semana'
  boton.addEventListener('click', () => {
    alAgregar({
      ...pelicula,
      titulo: inputTitulo.value.trim(),
      sinopsis: textareaSinopsis.value.trim(),
    })
  })

  contenedor.append(
    crearCampo('Título', inputTitulo),
    crearCampo('Sinopsis', textareaSinopsis),
    crearParrafo(`Año: ${pelicula.anio ?? 'sin fecha'}`),
    crearParrafo(`Elenco: ${pelicula.elenco.join(', ') || 'sin datos'}`),
    crearParrafo(`Géneros: ${pelicula.generos.join(', ') || 'sin datos'}`),
    boton,
  )
  return contenedor
}

function crearCampo(texto: string, control: HTMLElement): HTMLLabelElement {
  const label = document.createElement('label')
  label.append(texto, control)
  return label
}

function crearParrafo(texto: string): HTMLParagraphElement {
  const p = document.createElement('p')
  p.textContent = texto
  return p
}
