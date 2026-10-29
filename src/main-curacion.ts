// Punto de entrada de la pantalla de curación (herramienta local, no se publica).
// Guarda la semana en memoria y conecta buscador, vista previa y lista de elegidas.
import './estilos/main.css'
import './estilos/curacion.css'
import { obtenerDetallePelicula, obtenerGeneros, type DetalleTmdb } from './api/tmdb'
import { crearBuscador } from './curacion/buscador'
import { exportarSemana } from './curacion/exportar'
import { proximoJueves } from './curacion/fechas'
import { crearListaElegidas } from './curacion/lista-elegidas'
import { crearVistaPrevia } from './curacion/vista-previa'
import type { Genero, Pelicula } from './tipos/pelicula'
import type { SemanaCartelera } from './tipos/semana-cartelera'

const MAXIMO_PELICULAS = 8

const semana: SemanaCartelera = {
  fechaInicio: proximoJueves(),
  tema: '',
  peliculas: [],
}

// Los géneros se piden una sola vez al cargar la pantalla. Se guarda la promesa
// para que una búsqueda hecha antes de que lleguen espere a esta misma llamada.
const generosPromesa = obtenerGeneros()

const inputFecha = document.querySelector<HTMLInputElement>('#fecha-inicio')!
const inputTema = document.querySelector<HTMLInputElement>('#tema')!
const zonaBusqueda = document.querySelector<HTMLElement>('#busqueda')!
const zonaVistaPrevia = document.querySelector<HTMLDivElement>('#zona-vista-previa')!
const zonaElegidas = document.querySelector<HTMLDivElement>('#zona-elegidas')!
const contador = document.querySelector<HTMLSpanElement>('#contador')!
const botonExportar = document.querySelector<HTMLButtonElement>('#exportar')!

// Datos de la semana
inputFecha.value = semana.fechaInicio
inputFecha.addEventListener('input', () => (semana.fechaInicio = inputFecha.value))
inputTema.addEventListener('input', () => (semana.tema = inputTema.value.trim()))

// Buscador → vista previa
zonaBusqueda.append(crearBuscador(mostrarVistaPrevia))

async function mostrarVistaPrevia(id: number): Promise<void> {
  zonaVistaPrevia.textContent = 'Cargando...'
  try {
    const [detalle, generos] = await Promise.all([obtenerDetallePelicula(id), generosPromesa])
    const pelicula = aPelicula(detalle, generos)
    zonaVistaPrevia.replaceChildren(crearVistaPrevia(pelicula, agregar))
    actualizarBotonAgregar()
  } catch (error) {
    const mensaje = document.createElement('p')
    mensaje.className = 'error'
    mensaje.textContent = (error as Error).message
    zonaVistaPrevia.replaceChildren(mensaje)
  }
}

// Cambia los ids de género por sus nombres. Si un id no está en la lista, se omite.
function aPelicula({ generoIds, ...resto }: DetalleTmdb, generos: Genero[]): Pelicula {
  const nombres = new Map(generos.map((g) => [g.id, g.nombre]))
  return {
    ...resto,
    generos: generoIds.flatMap((id) => nombres.get(id) ?? []),
  }
}

// Lista de elegidas
function agregar(pelicula: Pelicula): void {
  if (!puedeAgregar(pelicula.id)) return
  semana.peliculas.push(pelicula)
  dibujarElegidas()
}

function sacar(id: number): void {
  semana.peliculas = semana.peliculas.filter((p) => p.id !== id)
  dibujarElegidas()
}

function dibujarElegidas(): void {
  zonaElegidas.replaceChildren(crearListaElegidas(semana.peliculas, sacar))
  contador.textContent = String(semana.peliculas.length)
  botonExportar.hidden = semana.peliculas.length === 0
  actualizarBotonAgregar()
}

function puedeAgregar(id: number): boolean {
  const yaEsta = semana.peliculas.some((p) => p.id === id)
  return !yaEsta && semana.peliculas.length < MAXIMO_PELICULAS
}

// Desactiva "Agregar" si la película ya está o si ya hay 8.
function actualizarBotonAgregar(): void {
  const boton = zonaVistaPrevia.querySelector<HTMLButtonElement>('.agregar')
  if (!boton) return

  const id = Number(boton.dataset.id)
  boton.disabled = !puedeAgregar(id)
  if (semana.peliculas.some((p) => p.id === id)) boton.textContent = 'Ya está en esta semana'
  else if (semana.peliculas.length >= MAXIMO_PELICULAS) boton.textContent = 'Ya hay 8 películas'
  else boton.textContent = 'Agregar a esta semana'
}

// Exportar
botonExportar.addEventListener('click', () => exportarSemana(semana))

dibujarElegidas()
