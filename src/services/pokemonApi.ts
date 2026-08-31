import axios from 'axios';

import type {
  EvolutionChainResponse,
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
  PokemonTypeListResponse,
} from '../types/pokemon';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
});

export const getPokemonList = async (
  limit = 20,
  offset = 0,
): Promise<PokemonListResponse> => {
  const response = await api.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`,
  );

  return response.data;
};

export const getPokemon = async (
  nameOrId: string | number,
): Promise<Pokemon> => {
  const response = await api.get<Pokemon>(`/pokemon/${nameOrId}`);

  return response.data;
};

export const getPokemonByType = async (
  type: string,
): Promise<PokemonTypeListResponse> => {
  const response = await api.get<PokemonTypeListResponse>(`/type/${type}`);

  return response.data;
};

export const getEvolutionChain = async (
  id: number,
): Promise<EvolutionChainResponse> => {
  const response = await api.get<EvolutionChainResponse>(
    `/evolution-chain/${id}`,
  );

  return response.data;
};

export const getPokemonSpecies = async (
  nameOrId: string | number,
): Promise<PokemonSpecies> => {
  const response = await api.get<PokemonSpecies>(
    `/pokemon-species/${nameOrId}`,
  );

  return response.data;
};
