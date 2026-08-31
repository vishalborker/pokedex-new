import { useQuery } from '@tanstack/react-query';

import { getEvolutionChain, getPokemonSpecies } from '../services/pokemonApi';

export const useEvolutionChain = (pokemonName: string) => {
  const speciesQuery = useQuery({
    queryKey: ['pokemon-species', pokemonName],

    queryFn: () => getPokemonSpecies(pokemonName),

    enabled: Boolean(pokemonName),

    staleTime: 1000 * 60 * 60,
  });

  const evolutionChainId = speciesQuery.data?.evolution_chain.url
    .split('/')
    .filter(Boolean)
    .pop();

  const evolutionQuery = useQuery({
    queryKey: ['evolution-chain', evolutionChainId],

    queryFn: () => getEvolutionChain(Number(evolutionChainId)),

    enabled: Boolean(evolutionChainId),

    staleTime: 1000 * 60 * 60,
  });

  return {
    ...evolutionQuery,

    isLoading: speciesQuery.isLoading || evolutionQuery.isLoading,

    isError: speciesQuery.isError || evolutionQuery.isError,
  };
};
