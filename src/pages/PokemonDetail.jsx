import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PokemonDetailSkeleton from "../components/skeletons/PokemonDetailSkeleton";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-orange-600 via-red-600 to-red-800 
    dark:from-gray-900 dark:to-black p-4">

      <div className="bg-red-700 dark:bg-gray-900 
      rounded-3xl p-6 shadow-2xl border-8 border-red-900 
      text-center max-w-sm w-full">

        {/* BOTÓN VOLVER */}
        <Link
          to="/"
          className="inline-block mb-4 px-4 py-1 bg-yellow-400 text-black rounded-full"
        >
          ← Volver
        </Link>

        {/* IMAGEN */}
        <img
          src={data.sprites.other["official-artwork"].front_default}
          alt={data.name}
          className="w-40 mx-auto mb-4"
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