import { Link } from "react-router-dom";

const typeColors = {
  fire: "from-red-400 to-red-600",
  water: "from-blue-400 to-blue-600",
  grass: "from-green-400 to-green-600",
  electric: "from-yellow-300 to-yellow-500",
  ground: "from-yellow-600 to-yellow-800",
  rock: "from-gray-400 to-gray-600",
  psychic: "from-pink-400 to-pink-600",
  ice: "from-cyan-300 to-cyan-500",
  dragon: "from-indigo-500 to-indigo-700",
  dark: "from-gray-700 to-gray-900",
  fairy: "from-pink-300 to-pink-500",
  normal: "from-gray-200 to-gray-400",
  fighting: "from-orange-600 to-orange-800",
  poison: "from-purple-400 to-purple-600",
  bug: "from-lime-400 to-lime-600",
  flying: "from-sky-300 to-sky-500",
  ghost: "from-indigo-700 to-indigo-900",
  steel: "from-gray-300 to-gray-500",
};

function PokemonCard({ pokemon }) {
  const id = pokemon?.id;
  if (!id) return null;

  const image =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default;

  // obtener tipo principal
  const mainType = pokemon?.types?.[0]?.type?.name || "normal";

  // color dinámico
  const bgGradient = typeColors[mainType] || "from-gray-200 to-gray-400";

  return (
    <Link
  to={`/pokemon/${id}`}
  className={`
    bg-gradient-to-br ${bgGradient}
    rounded-2xl shadow-lg p-4 text-center 
    border-2 border-white/20
    transition-all duration-300 
    hover:scale-105 hover:-translate-y-2 
    hover:shadow-2xl text-white
  `}
>
      <img
        src={image}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto transition-transform duration-300 hover:scale-110"
      />

      <h3 className="mt-2 font-semibold capitalize">
        #{id.toString().padStart(3, "0")} {pokemon.name}
      </h3>

      {/*  Tipos */}
      <div className="flex justify-center gap-2 mt-2">
        {pokemon.types?.map((t) => (
          <span
            key={t.type.name}
            className="px-2 py-1 text-xs bg-white/30 rounded capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>
      
    </Link>
  );
}
export default PokemonCard;