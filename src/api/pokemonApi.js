// 🔹 Obtener lista paginada
export async function getPokemons(page = 1) {
  const limit = 20;
  const offset = (page - 1) * limit;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) {
    throw new Error("Error al obtener datos");
  }

  return res.json();
}


// 🔹 Obtener Pokémon por tipo (fire, water, etc.)
export async function getPokemonsByType(type) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

  if (!res.ok) {
    throw new Error("Error al obtener tipo");
  }

  const data = await res.json();

  // devolvemos lista limpia
  return data.pokemon.map(p => p.pokemon);
}