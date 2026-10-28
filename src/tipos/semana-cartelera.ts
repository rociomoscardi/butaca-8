import type { Pelicula } from './pelicula'

// Una semana de la cartelera: arranca un jueves y tiene las películas elegidas.
export interface SemanaCartelera {
  fechaInicio: string // fecha del jueves en que empieza, ej. "2026-10-29"
  tema?: string // opcional, para semanas temáticas (ej. "Terror")
  peliculas: Pelicula[]
}
