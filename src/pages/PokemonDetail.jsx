import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PokemonDetailSkeleton from "../components/skeletons/PokemonDetailSkeleton";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// COLORES POR TIPO
const typeColors = {
  fire: "from-red-500 to-red-700",
  water: "from-blue-500 to-blue-700",
  grass: "from-green-500 to-green-700",
  electric: "from-yellow-400 to-yellow-600",
  ground: "from-yellow-600 to-yellow-800",
  rock: "from-gray-500 to-gray-700",
  psychic: "from-pink-500 to-pink-700",
  ice: "from-cyan-400 to-cyan-600",
  dragon: "from-indigo-500 to-indigo-700",
  dark: "from-gray-700 to-gray-900",
  fairy: "from-pink-300 to-pink-500",
  normal: "from-gray-300 to-gray-500",
  fighting: "from-orange-600 to-orange-800",
  poison: "from-purple-500 to-purple-700",
  bug: "from-lime-500 to-lime-700",
  flying: "from-sky-400 to-sky-600",
  ghost: "from-indigo-700 to-indigo-900",
  steel: "from-gray-400 to-gray-600",
};

function PokemonDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      await delay(1200);

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("Error al cargar");

      return res.json();
    },
  });

  if (isLoading) return <PokemonDetailSkeleton />;

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error cargando el Pokémon
      </p>
    );
  }

  if (!data) return null;

  // TIPO PRINCIPAL
  const mainType = data.types?.[0]?.type?.name;

  // GRADIENTE DINÁMICO
  const bgGradient =
    typeColors[mainType] || "from-gray-500 to-gray-700";

  return (
    <div
      className={`min-h-screen flex items-center justify-center 
      bg-gradient-to-br ${bgGradient} 
      dark:from-gray-900 dark:to-black p-4 transition`}
    >

      <div
        className="bg-red-700 dark:bg-gray-900 
        rounded-3xl p-6 shadow-2xl border-8 border-red-900 
        text-center max-w-sm w-full transition"
      >

        {/* BOTÓN VOLVER */}
        <Link
          to="/"
          className="inline-block mb-4 px-4 py-1 bg-yellow-400 text-black rounded-full hover:scale-105 transition"
        >
          ← Volver
        </Link>

        {/* IMAGEN */}
        <img
          src={data.sprites.other["official-artwork"].front_default}
          alt={data.name}
          className="w-40 mx-auto mb-4 transition-transform duration-300 hover:scale-110"
        />

        {/* NOMBRE */}
        <h1 className="text-2xl font-bold capitalize text-white">
          {data.name}
        </h1>

        {/* ID */}
        <p className="text-gray-200">
          #{data.id.toString().padStart(3, "0")}
        </p>

        {/* TIPOS */}
        <div className="flex justify-center gap-2 mt-3">
          {data.types.map((t) => (
            <span
              key={t.type.name}
              className="px-3 py-1 bg-white/30 text-white rounded-full capitalize text-sm"
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* STATS */}
        <div className="mt-4 text-left">
          {data.stats.map((stat) => (
            <p key={stat.stat.name} className="text-white text-sm">
              {stat.stat.name}: {stat.base_stat}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
}

export default PokemonDetail;