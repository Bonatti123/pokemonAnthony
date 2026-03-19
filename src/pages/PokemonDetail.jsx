import { useParams } from "react-router-dom";
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

      if (!res.ok) {
        throw new Error("Error al cargar");
      }

      return res.json();
    }
  });

  // LOADING
  if (isLoading) return <PokemonDetailSkeleton />;

  //  ERROR
  if (error) {
    return (
      <p className="text-center text-red-500">
        Error cargando el Pokémon
      </p>
    );
  }

  //  SEGURIDAD
  if (!data) return null;

  // UI COMPLETA
  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-blue-100 to-purple-200 
    dark:from-gray-800 dark:to-gray-900">

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">

        {/* IMAGEN */}
        <img
          src={data.sprites.other["official-artwork"].front_default}
          alt={data.name}
          className="w-40 mx-auto mb-4"
        />

        {/* NOMBRE */}
        <h1 className="text-2xl font-bold capitalize dark:text-white">
          {data.name}
        </h1>

        {/* ID */}
        <p className="dark:text-gray-300">
          #{data.id.toString().padStart(3, "0")}
        </p>

        {/* TIPOS */}
        <p className="mt-2 dark:text-gray-300">
          Tipo: {data.types.map(t => t.type.name).join(", ")}
        </p>

      </div>

    </div>
  );
}

export default PokemonDetail;