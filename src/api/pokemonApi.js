export async function getPokemons(page = 1) {

  const limit = 20;
  const offset = (page - 1) * limit;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  return res.json();
}