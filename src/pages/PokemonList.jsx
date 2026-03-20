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

  // 🌙 DARK MODE
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
  };

  // SCROLL
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // QUERY
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => getPokemons(page),
    keepPreviousData: true,
  });

  if (error) {
    return <p className="text-center text-red-500">Error cargando</p>;
  }

  const filtered = (data?.results || []).filter((pokemon) => {
    const matchName = pokemon.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchType =
      typeFilter === "all" ||
      pokemon.types.some((t) => t.type.name === typeFilter);

    return matchName && matchType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-red-800 dark:from-gray-900 dark:to-black p-4">

      {/* 🔴 POKEDEX */}
      <div className="max-w-6xl mx-auto bg-red-700 dark:bg-gray-900 rounded-3xl p-4 shadow-2xl border-8 border-red-900">

        {/* 🔵 LUCES */}
        <div className="flex gap-2 mb-4">
          <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          <div className="w-4 h-4 bg-green-400 rounded-full"></div>
        </div>

        {/* 🖥️ PANTALLA */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">

          {/* 🔥 ESTO YA NO DESAPARECE */}
          <h1 className="text-4xl font-bold text-center mb-6 text-red-600 dark:text-white">
            Pokédex
          </h1>

          {/* BOTONES */}
          <div className="flex justify-between mb-4">

            <Link to="/create">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-full">
                + Crear
              </button>
            </Link>

          </div>

          {/* BUSCADOR */}
          <input
            type="text"
            placeholder="Buscar pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg"
          />

          {/* FILTRO */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg"
          >
            <option value="all">Todos</option>
            <option value="fire">Fuego</option>
            <option value="water">Agua</option>
            <option value="grass">Planta</option>
            <option value="electric">Eléctrico</option>
          </select>

          {/* 🔥 SOLO EL GRID CAMBIA */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <PokemonSkeleton key={i} />
                ))
              : filtered.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))
            }

          </div>

          {/* PAGINACIÓN */}
          <div className="mt-6 flex justify-center gap-4">

            <button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              className="px-4 py-2 bg-yellow-400 rounded-full"
            >
              <FaArrowLeft />
            </button>

            <span className="text-white">Página {page}</span>

            <button
              onClick={() => setPage((old) => old + 1)}
              className="px-4 py-2 bg-yellow-400 rounded-full"
            >
              <FaArrowRight />
            </button>

          </div>

          {/* SWIPER */}
          <div className="mt-6">
            <Swiper spaceBetween={10} slidesPerView={2}>
              {filtered.slice(0, 10).map((pokemon) => (
                <SwiperSlide key={pokemon.id}>
                  <PokemonCard pokemon={pokemon} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PokemonList;