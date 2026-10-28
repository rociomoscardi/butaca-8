// Punto de entrada del sitio público: muestra la semana actual.
import './estilos/main.css'
import { crearDatosSemana } from './componentes/encabezado-semana'
import { crearTarjetaPelicula } from './componentes/tarjeta-pelicula'
import { semanaActual } from './semana-actual'

const datosSemana = document.querySelector<HTMLDivElement>('#datos-semana')!
const grilla = document.querySelector<HTMLUListElement>('#grilla')!

datosSemana.replaceChildren(...crearDatosSemana(semanaActual))
grilla.replaceChildren(...semanaActual.peliculas.map(crearTarjetaPelicula))
