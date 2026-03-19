export const getPokemons = async (page = 1) => {
  const limit = 20;
  const offset = (page - 1) * limit;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) throw new Error("Error al obtener lista");

  const data = await res.json();

  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      if (!res.ok) throw new Error("Error en detalle");
      return res.json();
    })
  );

  return {
    ...data,
    results: detailedPokemons,
  };
};