// Buscador: input de texto + lista de resultados de TMDB.
// Al hacer clic en un resultado, avisa el id con el callback alElegir.
import { buscarPeliculas } from '../api/tmdb'
import { urlPoster } from '../api/tmdb-helpers'

export function crearBuscador(alElegir: (id: number) => void): HTMLElement {
  const contenedor = document.createElement('div')

  const formulario = document.createElement('form')
  const input = document.createElement('input')
  input.type = 'search'
  input.placeholder = 'Título de la película'
  const boton = document.createElement('button')
  boton.type = 'submit'
  boton.textContent = 'Buscar'
  formulario.append(input, boton)

  const estado = document.createElement('p')
  const resultados = document.createElement('ul')
  resultados.className = 'resultados'

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault()
    const query = input.value.trim()
    if (!query) return

    estado.className = ''
    estado.textContent = 'Buscando...'
    resultados.replaceChildren()

    try {
      const peliculas = await buscarPeliculas(query)
      estado.textContent = peliculas.length === 0 ? 'Sin resultados.' : ''

      for (const pelicula of peliculas) {
        const item = document.createElement('li')
        const botonResultado = document.createElement('button')
        botonResultado.type = 'button'
        botonResultado.append(
          crearMiniatura(urlPoster(pelicula.posterPath, 'w200')),
          `${pelicula.titulo} (${pelicula.anio ?? 's/f'})`,
        )
        botonResultado.addEventListener('click', () => alElegir(pelicula.id))
        item.append(botonResultado)
        resultados.append(item)
      }
    } catch (error) {
      estado.className = 'error'
      estado.textContent = (error as Error).message
    }
  })

  contenedor.append(formulario, estado, resultados)
  return contenedor
}

// Póster chico; si no hay póster, un recuadro vacío del mismo tamaño.
export function crearMiniatura(url: string | null): HTMLElement {
  if (!url) {
    const vacio = document.createElement('span')
    vacio.className = 'miniatura sin-poster'
    return vacio
  }
  const img = document.createElement('img')
  img.className = 'miniatura'
  img.src = url
  img.alt = ''
  return img
}
