const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getPokemons = async (page = 1) => {
  const limit = 20;
  const offset = (page - 1) * limit;

  // ⏳ 🔥 HACEMOS LENTA LA API (AJUSTA AQUÍ)
  await delay(5000); // 👉 5 segundos (puedes subir a 10000 o 20000)

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!res.ok) throw new Error("Error al obtener lista");

  const data = await res.json();

  // ⏳ también puedes hacer lento el detalle (opcional)
  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      await delay(300); // pequeño delay por cada pokemon

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