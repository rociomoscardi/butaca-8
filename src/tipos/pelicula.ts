// Forma de una película dentro de la app.
// Es nuestra versión simplificada de lo que devuelve TMDB.
export interface Pelicula {
  id: number // id de la película en TMDB
  titulo: string
  anio: number
  sinopsis: string
  elenco: string[] // solo nombres de actores
  generoIds: number[] // ids de género tal cual los da TMDB, ej. [18, 27]
  posterPath: string | null // path parcial de TMDB, ej. "/abc123.jpg"
}

// Un género de TMDB (ej. { id: 18, nombre: 'Drama' }).
export interface Genero {
  id: number
  nombre: string
}
