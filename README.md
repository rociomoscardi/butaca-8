# Butaca 8

Cartelera de cine semanal: 8 películas elegidas a mano que se renuevan cada jueves.
Los datos de las películas vienen de la API de TMDB.

Hecho con Vite + TypeScript, HTML semántico y CSS plano.

## Cómo correrlo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # chequea tipos y genera la versión final en dist/
```

## Estructura

```
index.html              Página base. Solo tiene el <div id="app"> donde se monta todo.
public/                 Archivos que se sirven tal cual (favicon, imágenes fijas).
src/
  main.ts               Punto de entrada: carga los estilos y arma la página.
  componentes/          Piezas de UI (ej. tarjeta de película, grilla de la semana).
                        Cada componente es una función que devuelve HTML.
  tipos/                Tipos de TypeScript compartidos (ej. Pelicula).
  api/                  Funciones que hablan con TMDB. Solo esta carpeta toca la API.
  datos/                Datos de prueba (mock) para trabajar sin depender de la API.
  estilos/              Archivos CSS.
.env.example            Plantilla para el token de TMDB (copiar como .env.local).
```

## Sobre el token de TMDB

Como no hay backend, el token va a quedar visible en el navegador para quien
inspeccione la página. Para un proyecto personal está bien; usá un token de
solo lectura y no lo subas a git (el `.env.local` ya está ignorado).
