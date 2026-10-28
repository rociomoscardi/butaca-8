// Funciones que llaman a la API de TMDB y convierten sus respuestas a nuestros tipos.
// El token se lee desde .env.local (VITE_TMDB_READ_TOKEN).
import type { Genero, Pelicula } from '../tipos/pelicula'

const URL_BASE = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN

// Resultado resumido de una búsqueda, para elegir la película correcta
// antes de pedir el detalle completo.
export interface ResultadoBusqueda {
  id: number
  titulo: string
  anio: number | null // null si TMDB no tiene fecha de estreno
  posterPath: string | null
}

// Hace un GET a TMDB y devuelve el JSON. Si algo falla, tira un error en español.
async function pedirATmdb(ruta: string, parametros: Record<string, string> = {}): Promise<any> {
  // language=es-AR en todas las llamadas para que los datos vengan en español
  const url = `${URL_BASE}${ruta}?${new URLSearchParams({ language: 'es-AR', ...parametros })}`

  let respuesta: Response
  try {
    respuesta = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
  } catch (error) {
    throw new Error('No se pudo conectar con TMDB: ' + (error as Error).message)
  }

  if (!respuesta.ok) {
    throw new Error(`TMDB respondió con error ${respuesta.status} al pedir ${ruta}: ${respuesta.statusText}`)
  }

  return respuesta.json()
}

// "1999-10-15" → 1999. Si la fecha viene vacía, devuelve null.
function extraerAnio(fecha: string | undefined): number | null {
  if (!fecha) return null
  return Number(fecha.slice(0, 4))
}

export async function buscarPeliculas(query: string): Promise<ResultadoBusqueda[]> {
  const datos = await pedirATmdb('/search/movie', { query })

  return datos.results.map((p: any) => ({
    id: p.id,
    titulo: p.title,
    anio: extraerAnio(p.release_date),
    posterPath: p.poster_path,
  }))
}

export async function obtenerDetallePelicula(id: number): Promise<Pelicula> {
  const datos = await pedirATmdb(`/movie/${id}`, { append_to_response: 'credits' })

  return {
    id: datos.id,
    titulo: datos.title,
    anio: extraerAnio(datos.release_date),
    sinopsis: datos.overview,
    elenco: datos.credits.cast.slice(0, 5).map((actor: any) => actor.name),
    generoIds: datos.genre_ids ?? datos.genres.map((g: any) => g.id),
    posterPath: datos.poster_path,
  }
}

export async function obtenerGeneros(): Promise<Genero[]> {
  const datos = await pedirATmdb('/genre/movie/list')

  return datos.genres.map((g: any) => ({
    id: g.id,
    nombre: g.name,
  }))
}
