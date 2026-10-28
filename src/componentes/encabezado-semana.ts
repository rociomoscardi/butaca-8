// Datos de la semana para el encabezado: rango de fechas y, si hay, el tema.
import type { SemanaCartelera } from '../tipos/semana-cartelera'

const formatoDiaMes = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'long' })

export function crearDatosSemana(semana: SemanaCartelera): HTMLElement[] {
  const elementos: HTMLElement[] = []

  const rango = document.createElement('p')
  rango.className = 'rango-fechas'
  rango.textContent = formatearRango(semana.fechaInicio)
  elementos.push(rango)

  if (semana.tema) {
    const tema = document.createElement('p')
    tema.className = 'tema'
    tema.textContent = semana.tema
    elementos.push(tema)
  }

  return elementos
}

// "2026-10-29" → "29 de octubre al 4 de noviembre" (jueves a miércoles).
function formatearRango(fechaInicio: string): string {
  const inicio = fechaLocal(fechaInicio)
  const fin = new Date(inicio)
  fin.setDate(fin.getDate() + 6)
  return `${formatoDiaMes.format(inicio)} al ${formatoDiaMes.format(fin)}`
}

// Convierte "AAAA-MM-DD" a Date en hora local.
// new Date("2026-10-29") la tomaría en UTC y en Argentina mostraría el 28.
function fechaLocal(texto: string): Date {
  const [anio, mes, dia] = texto.split('-').map(Number)
  return new Date(anio, mes - 1, dia) // el mes va de 0 a 11
}
