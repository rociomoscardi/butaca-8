// Genera el archivo semana-actual.ts con la semana armada y lo descarga.
// El archivo descargado va directo en src/ (por el import './tipos/...').
import type { SemanaCartelera } from '../tipos/semana-cartelera'

export function exportarSemana(semana: SemanaCartelera): void {
  // Si el tema está vacío, no lo incluimos (es opcional).
  const datos: SemanaCartelera = {
    fechaInicio: semana.fechaInicio,
    ...(semana.tema ? { tema: semana.tema } : {}),
    peliculas: semana.peliculas,
  }

  const contenido =
    `import type { SemanaCartelera } from './tipos/semana-cartelera'\n\n` +
    `export const semanaActual: SemanaCartelera = ${JSON.stringify(datos, null, 2)}\n`

  const archivo = new Blob([contenido], { type: 'text/plain' })
  const url = URL.createObjectURL(archivo)

  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = 'semana-actual.ts'
  enlace.click()

  URL.revokeObjectURL(url)
}
