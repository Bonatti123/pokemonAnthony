import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function PokemonDetail() {

  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      )
  });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div className="container">

      <h1>{data.name}</h1>

      <img
        src={data.sprites.other["official-artwork"].front_default}
        width="200"
      />

      <p>Peso: {data.weight}</p>
      <p>Altura: {data.height}</p>

    </div>
  );
}

export default PokemonDetail;