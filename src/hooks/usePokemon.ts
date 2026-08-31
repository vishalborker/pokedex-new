import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';

import { getPokemon, getPokemonList } from '../services/pokemonApi';

const PAGE_SIZE = 20;

export const usePokemonList = () => {
  const listQuery = useInfiniteQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: ({ pageParam }) => getPokemonList(PAGE_SIZE, pageParam),
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
