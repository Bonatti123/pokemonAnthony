import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "../api/pokemonApi";
import { Link } from "react-router-dom";
import PokemonSkeleton from "../components/skeletons/PokemonSkeleton";
import PokemonCard from "../components/PokemonCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MdDarkMode } from "react-icons/md";

function PokemonList() {

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // DARK MODE
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  //  SCROLL AUTOMÁTICO
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Aqui e utilizado React Query para consumir la API.Me permite manejar automaticamente el estado de carga, los errores y los datos.
  const { data, isLoading, error } = useQuery({
  queryKey: ["pokemons", page],
  queryFn: async () => {
    await delay(1000); // 👈 AQUÍ
    return getPokemons(page);
  },
  keepPreviousData: true
});

  //  DETALLES
  const { data: detailedData } = useQuery({
    queryKey: ["pokemonDetails", page],
    enabled: !!data,
    queryFn: async () => {
      const results = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          if (!res.ok) throw new Error("Error");
          return res.json();
        })
      );
      return results;
    }
  });

  // LOADING
  if (isLoading) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <PokemonSkeleton key={i} />
      ))}
    </div>
  );
}

  if (error) return <p>Error cargando</p>;

  // FILTRO
  const filtered = (detailedData || []).filter((pokemon) => {
    const matchName = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchType =
      typeFilter === "all" ||
      pokemon.types.some((t) => t.type.name === typeFilter);

    return matchName && matchType;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition">

      <div className="max-w-6xl mx-auto p-4">

        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600 dark:text-white">
          Pokédex
        </h1>

        {/* BOTONES */}
        <div className="flex justify-center mb-4">

          <button
            onClick={toggleDarkMode}
            className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full 
            bg-black text-white dark:bg-yellow-400 dark:text-black"
          >
            <MdDarkMode />
          </button>

          <Link to="/create">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              + Crear Post
            </button>
          </Link>

        </div>

        {/* BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar pokemon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg 
          bg-white dark:bg-gray-700 dark:text-white"
        />

        {/* FILTRO */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg 
          bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="all">Todos</option>
          <option value="fire">Fuego</option>
          <option value="water">Agua</option>
          <option value="grass">Planta</option>
          <option value="electric">Eléctrico</option>
        </select>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filtered.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>

        {/* PAGINACIÓN */}
        <div className="mt-6 flex justify-center items-center gap-4">

          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            <FaArrowLeft />
          </button>

          <span className="text-gray-800 dark:text-white">
            Página {page}
          </span>

          <button
            onClick={() => setPage((old) => old + 1)}
            disabled={!data?.next}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            <FaArrowRight />
          </button>

        </div>

        {/* SWIPER */}
        <Swiper spaceBetween={10} slidesPerView={2}>
          {filtered.slice(0, 10).map((pokemon) => (
            <SwiperSlide key={pokemon.name}>
              <PokemonCard pokemon={pokemon} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}

export default PokemonList;