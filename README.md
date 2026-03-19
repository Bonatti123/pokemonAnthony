# Pokédex App - React + Tailwind

Aplicación web interactiva que consume la API de Pokémon para mostrar una Pokédex con búsqueda, filtros, paginación y vista de detalle.

---

## Tecnologías utilizadas

- React (Vite)
- React Query (@tanstack/react-query)
- React Router DOM
- Tailwind CSS
- Fetch API
- Zod (validación de formularios)

---

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/TU-USUARIO/TU-REPO.git
cd TU-REPO

# Instalar dependencias:
- npm install

Ejecute el proyecto:
npm run dev

## API utilizada
https://pokeapi.co/

https://jsonplaceholder.typicode.com/

## Funcionalidades
 # Busqueda Pokémon
 permite buscar Pokémon por nombre en tienmpo real.

## Filtro por tipo
Filtra Pokémon por tipo.
. Fuego
. Agua
. Planta
. Eléctrico

## Paginación
Navegación entre páginas usando:
. Botón "Anterior"
. Botón ""Siguiente

## Vista de detalle
Cada Pokémon tiene su propia página con información detallada.

## Crear Post
Formulario que permite crear un post usando JSONPlaceholder.

Incluye:
. Validación con Zod
. Manejo de errores
. Envio de datos

## Modo oscuro (Dark Mode)
Botón para cambiar entre:

. Modo claro
. Modo oscuro

## UI moderna
Diseña realizado con Tailwind CSS:

. Grid responsive
. Cards animadas (hover)
. Botones con gradientes
. Efectos visuales (scale,shadow)

## Estructura del proyecto
src/
│
├── api/
│   └── pokemonApi.js
│
├── components/
│   ├── PokemonSkeleton.jsx
│
├── pages/
│   ├── PokemonList.jsx
│   ├── PokemonDetail.jsx
│   ├── CreatePost.jsx
│
├── App.jsx
├── main.jsx
└── index.css

## Hooks utilizados
. useState -> manejo de estado
. useQuery -> manejo de datos (React Query)
.  useParams -> rutas dinámicas

## Mejoras futuras
. Optimizar llamadas a la API
. Agregar más tipos de Pokémon
. Implementar favoritos
. Animación avanzadas
. Deploy en producción

## Deploy (opcional)
 Puedes subir el proyecto a:

 . Vercel
 . Netlify

 ## Autor
 Anthony Bonatti