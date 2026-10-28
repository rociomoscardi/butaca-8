// Punto de entrada de la app: carga los estilos y arma la página.
import './estilos/main.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <header>
    <h1>Butaca 8</h1>
  </header>
  <main>
    <p>El proyecto levanta correctamente.</p>
  </main>
`
