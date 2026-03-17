import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "../api/pokemonApi";
import { Link } from "react-router-dom";
import PokemonSkeleton from "../components/PokemonSkeleton";

function PokemonList() {

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemons(page),
    keepPreviousData: true
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

  if (error) {
    return <p>Error cargando los pokémon</p>;
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

        {filtered.map((pokemon) => {

          const id = pokemon.url.split("/")[6];

          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          return (
            <Link key={pokemon.name} to={`/pokemon/${id}`} className="card">

              <img src={image} alt={pokemon.name} />

              <h3>
                #{id.toString().padStart(3, "0")} {pokemon.name}
              </h3>

            </Link>
          );
        })}

      </div>

      {/* PAGINACIÓN */}

      <div style={{ marginTop: "20px", textAlign: "center" }}>

        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          ⬅ Anterior
        </button>

        <span style={{ margin: "0 15px" }}>
          Página {page}
        </span>

        <button
          onClick={() => setPage((old) => old + 1)}
          disabled={!data?.next}
        >
          Siguiente ➡
        </button>

      </div>

    </div>
  );
}

export default PokemonList;