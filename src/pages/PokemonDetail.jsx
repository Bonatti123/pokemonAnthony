import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PokemonDetailSkeleton from "../components/skeletons/PokemonDetailSkeleton";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function PokemonDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: async () => {
      await delay(1200); // ⏳ lento para ver skeleton
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("Error");
      return res.json();
    },
  });

  if (isLoading) return <PokemonDetailSkeleton />;

  if (error) {
    return <p className="text-red-500 text-center">Error</p>;
  }

  if (!data) return null;

  // 🎥 GIF
  const gif =
    data.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default;

  // 🖼️ HD
  const official =
    data.sprites?.other?.["official-artwork"]?.front_default;

  // 🔄 fallback
  const fallback = data.sprites?.front_default;

  const image = gif || official || fallback;

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-orange-600 via-red-600 to-red-800 p-4">

      <div className="bg-red-700 rounded-3xl p-6 shadow-2xl text-center max-w-sm w-full">

        <Link
          to="/"
          className="inline-block mb-4 px-4 py-1 bg-yellow-400 text-black rounded-full"
        >
          ← Volver
        </Link>

        <div className="relative w-40 h-40 mx-auto mb-4">

          {/* fondo blur */}
          <img
            src={official || fallback}
            className="absolute inset-0 w-full h-full object-contain opacity-30 blur-sm"
          />

          {/* imagen principal */}
          <img
            src={image}
            alt={data.name}
            className="relative w-full h-full object-contain"
          />

        </div>

        <h1 className="text-2xl font-bold text-white capitalize">
          {data.name}
        </h1>

        <p className="text-gray-200">
          #{data.id.toString().padStart(3, "0")}
        </p>

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

      </div>
    </div>
  );
}

export default PokemonDetail;