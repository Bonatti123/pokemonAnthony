import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "../api/pokemonApi";
import { Link } from "react-router-dom";
import PokemonSkeleton from "../components/PokemonSkeleton";

function PokemonList() {

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data, isLoading } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getPokemons
  });

  if (isLoading) {
    return (
      <div className="grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <PokemonSkeleton key={i} />
        ))}
      </div>
    );
  }

  const filtered = data.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h1 className="title">Pokédex</h1>

      <input
        type="text"
        placeholder="Buscar pokemon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="filter"
      >
        <option value="all">Todos</option>
        <option value="fire">Fuego</option>
        <option value="water">Agua</option>
        <option value="grass">Planta</option>
        <option value="electric">Eléctrico</option>
      </select>

      <div className="grid">

        {filtered.map((pokemon, index) => {

          const id = index + 1;

          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          return (
            <Link key={pokemon.name} to={`/pokemon/${id}`} className="card">

              <img src={image} alt={pokemon.name} />

              <h3>{pokemon.name}</h3>

            </Link>
          );
        })}

      </div>
    </div>
  );
}

export default PokemonList;