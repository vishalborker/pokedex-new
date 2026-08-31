import type { Pokemon } from '../types/pokemon';

export const formatPokemonName = (name: string): string => {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

export const getPokemonImage = (pokemon: Pokemon): string | null => {
  return (
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default
  );
};

export const formatPokemonNumber = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

export const formatHeight = (height: number): string => {
  return `${(height / 10).toFixed(1)} m`;
};

export const formatWeight = (weight: number): string => {
  return `${(weight / 10).toFixed(1)} kg`;
};
