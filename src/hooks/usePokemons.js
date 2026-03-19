import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "../api/pokemonApi";

export const usePokemons = (page = 1) => {
  return useQuery({
    queryKey: ['pokemons', page],  
    queryFn: () => getPokemons(page),  
    keepPreviousData: true,           
  });
};