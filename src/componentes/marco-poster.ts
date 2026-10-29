// Marco de terciopelo con luces doradas alrededor del póster.
// Las luces son 4 tiras con gradiente (una por lado), no un elemento por bombilla.
export function crearMarcoPoster(poster: HTMLElement): HTMLDivElement {
  const marco = document.createElement('div')
  marco.className = 'marco-poster'
  marco.append(poster, crearLuces('luces-h arriba'), crearLuces('luces-h abajo'), crearLuces('luces-v izquierda'), crearLuces('luces-v derecha'))
  return marco
}

function crearLuces(clase: string): HTMLSpanElement {
  const luces = document.createElement('span')
  luces.className = clase
  luces.setAttribute('aria-hidden', 'true')
  return luces
}
