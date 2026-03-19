import { Link } from "react-router-dom";

function PokemonCard({ pokemon }) {
  const id = pokemon?.id;
  if (!id) return null;

  const image =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default;

  return (
    <Link
      to={`/pokemon/${id}`}
      className="
      bg-white dark:bg-gray-800 
      rounded-2xl shadow-md p-4 text-center 
      transition-all duration-300 
      hover:scale-105 hover:-translate-y-2 
      hover:shadow-2xl
    "
    >
      <img
        src={image}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto transition-transform duration-300 hover:scale-110"
      />

      <h3 className="mt-2 font-semibold capitalize text-gray-800 dark:text-white">
        #{id.toString().padStart(3, "0")} {pokemon.name}
      </h3>
    </Link>
  );
}

export default PokemonCard;