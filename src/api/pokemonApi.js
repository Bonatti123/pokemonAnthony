const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getPokemons = async (page = 1) => {
  const limit = 20;
  const offset = (page - 1) * limit;

  await delay(4000); // controla tiempo del loader
  
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) throw new Error("Error");

  const data = await res.json();

  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );

  return {
    ...data,
    results: detailedPokemons,
  };
};