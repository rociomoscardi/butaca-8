// Funciones chicas de ayuda para trabajar con datos de TMDB (no llaman a la API).

// Arma la URL completa del póster a partir del path parcial que da TMDB.
export function urlPoster(path: string | null, ancho: 'w200' | 'w500' = 'w500'): string | null {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${ancho}${path}`
}
