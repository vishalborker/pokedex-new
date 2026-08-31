import { useQueries, useQuery } from '@tanstack/react-query';

import { getPokemon, getPokemonList } from '../services/pokemonApi';

export const usePokemonList = (limit = 20, offset = 0) => {
  const listQuery = useQuery({
    queryKey: ['pokemon', 'list', limit, offset],
    queryFn: () => getPokemonList(limit, offset),
    staleTime: 1000 * 60 * 5,
  });

  const pokemonQueries = useQueries({
    queries:
      listQuery.data?.results.map((pokemon) => ({
        queryKey: ['pokemon', pokemon.name],
        queryFn: () => getPokemon(pokemon.name),
        staleTime: 1000 * 60 * 10,
      })) ?? [],
  });

  const pokemon = pokemonQueries
    .map((query) => query.data)
    .filter((item) => item !== undefined);

  return {
    ...listQuery,
    pokemon,
    isPokemonLoading: pokemonQueries.some((query) => query.isLoading),
  };
};

export const usePokemon = (nameOrId: string | number) => {
  return useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => getPokemon(nameOrId),
    enabled: Boolean(nameOrId),
    staleTime: 1000 * 60 * 10,
  });
};
