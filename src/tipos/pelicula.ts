// Forma de una película dentro de la app.
// Es nuestra versión simplificada de lo que devuelve TMDB.
export interface Pelicula {
  id: number // id de la película en TMDB
  titulo: string
  anio: number
  sinopsis: string
  elenco: string[]
  generos: string[]
  poster: string | null // URL del póster, o null si no tiene
}
