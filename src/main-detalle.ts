// Punto de entrada del detalle de película (detalle.html?id=123).
// Todo sale de la semana actual: no se llama a TMDB.
import './estilos/main.css'
import { urlPoster } from './api/tmdb-helpers'
import { semanaActual } from './semana-actual'
import type { Pelicula } from './tipos/pelicula'

const contenedor = document.querySelector<HTMLElement>('#detalle')!

// Number(null) daría 0, por eso se chequea que el parámetro exista.
const parametroId = new URLSearchParams(location.search).get('id')
const pelicula = parametroId ? semanaActual.peliculas.find((p) => p.id === Number(parametroId)) : undefined

if (pelicula) {
  document.title = `${pelicula.titulo} · Butaca 8`
  contenedor.replaceChildren(crearLink('← Volver', 'volver'), crearDetalle(pelicula))
} else {
  const mensaje = document.createElement('div')
  mensaje.className = 'no-encontrada'
  const titulo = document.createElement('h1')
  titulo.textContent = 'Película no encontrada'
  mensaje.append(titulo, crearLink('Volver al inicio'))
  contenedor.replaceChildren(mensaje)
}

function crearDetalle(pelicula: Pelicula): HTMLElement {
  const articulo = document.createElement('article')
  articulo.className = 'detalle'

  const url = urlPoster(pelicula.posterPath, 'w500')
  if (url) {
    const img = document.createElement('img')
    img.className = 'poster'
    img.src = url
    img.alt = `Póster de ${pelicula.titulo}`
    articulo.append(img)
  } else {
    const vacio = document.createElement('span')
    vacio.className = 'poster poster-vacio'
    vacio.textContent = pelicula.titulo
    articulo.append(vacio)
  }

  const info = document.createElement('div')
  info.className = 'detalle-info'

  const titulo = document.createElement('h1')
  titulo.textContent = pelicula.titulo

  const sinopsis = document.createElement('p')
  sinopsis.className = 'sinopsis'
  sinopsis.textContent = pelicula.sinopsis || 'Sin sinopsis.'

  info.append(
    titulo,
    crearDato('Año', pelicula.anio ? String(pelicula.anio) : 'sin fecha'),
    crearDato('Elenco', pelicula.elenco.join(', ') || 'sin datos'),
    crearDato('Géneros', pelicula.generos.join(', ') || 'sin datos'),
    sinopsis,
    crearAcciones(),
  )

  articulo.append(info)
  return articulo
}

// Botones de placeholder: se ven clickeables pero todavía no hacen nada.
function crearAcciones(): HTMLDivElement {
  const acciones = document.createElement('div')
  acciones.className = 'acciones'

  const estrellas = document.createElement('div')
  estrellas.className = 'estrellas'
  estrellas.setAttribute('role', 'group')
  estrellas.setAttribute('aria-label', 'Puntuar')
  for (let i = 1; i <= 5; i++) {
    const estrella = crearBoton('☆', 'estrella')
    estrella.setAttribute('aria-label', `${i} de 5 estrellas`)
    estrellas.append(estrella)
  }

  // Formulario de opinión, siempre visible debajo de las acciones.
  // "Guardar" todavía no hace nada (no hay dónde persistir la opinión).
  const formOpinion = document.createElement('div')
  formOpinion.className = 'form-opinion'

  const textareaOpinion = document.createElement('textarea')
  textareaOpinion.rows = 4
  textareaOpinion.placeholder = '¿Qué te pareció esta película?'
  textareaOpinion.setAttribute('aria-label', 'Tu opinión')

  formOpinion.append(textareaOpinion, crearBoton('Guardar', 'accion'))

  acciones.append(crearBoton('Marcar como vista', 'accion'), estrellas, formOpinion)
  return acciones
}

function crearDato(etiqueta: string, valor: string): HTMLParagraphElement {
  const p = document.createElement('p')
  p.className = 'dato'
  const strong = document.createElement('strong')
  strong.textContent = `${etiqueta}: `
  p.append(strong, valor)
  return p
}

function crearBoton(texto: string, clase: string): HTMLButtonElement {
  const boton = document.createElement('button')
  boton.type = 'button'
  boton.className = clase
  boton.textContent = texto
  return boton
}

function crearLink(texto: string, clase = ''): HTMLAnchorElement {
  const link = document.createElement('a')
  link.href = 'index.html'
  link.className = clase
  link.textContent = texto
  return link
}
