// Datos de prueba para trabajar la UI sin depender de la API de TMDB.
import type { Pelicula } from '../tipos/pelicula'

export const peliculasMock: Pelicula[] = [
  {
    id: 550,
    titulo: 'El club de la pelea',
    anio: 1999,
    sinopsis: 'Un empleado de oficina insomne y un fabricante de jabón forman un club de pelea clandestino.',
    elenco: ['Edward Norton', 'Brad Pitt', 'Helena Bonham Carter'],
    generos: ['Drama'],
    posterPath: null,
  },
  {
    id: 238,
    titulo: 'El padrino',
    anio: 1972,
    sinopsis: 'El patriarca de una familia de la mafia neoyorquina le cede el control de su imperio a su hijo menor.',
    elenco: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    generos: ['Drama', 'Crimen'],
    posterPath: null,
  },
]
