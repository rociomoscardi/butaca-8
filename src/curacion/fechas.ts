// Devuelve el próximo jueves en formato "AAAA-MM-DD" (hora local).
// Si hoy es jueves, devuelve hoy.
export function proximoJueves(desde: Date = new Date()): string {
  const fecha = new Date(desde)
  const diasHastaJueves = (4 - fecha.getDay() + 7) % 7 // getDay(): 0 = domingo, 4 = jueves
  fecha.setDate(fecha.getDate() + diasHastaJueves)

  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const dia = String(fecha.getDate()).padStart(2, '0')
  return `${anio}-${mes}-${dia}`
}
