export const getPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    
    if (!res.ok) {
        throw new Error("Error al obtener los pokemons");
    }

    return res.json();
}