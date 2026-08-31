import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';

import {
  getPokemon,
  getPokemonByType,
  getPokemonList,
} from '../services/pokemonApi';

const PAGE_SIZE = 20;

export const usePokemonList = (selectedType = 'all') => {
  const listQuery = useInfiniteQuery({
    queryKey: ['pokemon', 'list', selectedType],
    queryFn: async ({ pageParam }) => {
      if (selectedType !== 'all') {
        const response = await getPokemonByType(selectedType);

        const start = pageParam;

        const end = start + PAGE_SIZE;

        const results = response.pokemon
          .slice(start, end)
          .map(({ pokemon }) => pokemon);

        return {
          count: response.pokemon.length,
          next: end < response.pokemon.length ? String(end) : null,
          previous: start > 0 ? String(Math.max(0, start - PAGE_SIZE)) : null,
          results,
        };
      }
      return getPokemonList(PAGE_SIZE, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) {
        return undefined;
      }
      return allPages.length * PAGE_SIZE;
    },
    staleTime: 1000 * 60 * 5,
  });

  const pokemonList =
    listQuery.data?.pages.flatMap((page) => page.results) ?? [];

  const pokemonQueries = useQueries({
    queries: pokemonList.map((pokemon) => ({
      queryKey: ['pokemon', pokemon.name],
      queryFn: () => getPokemon(pokemon.name),
      staleTime: 1000 * 60 * 10,
    })),
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
