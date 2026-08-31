import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PokemonStore {
  favorites: number[];
  toggleFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
}

export const usePokemonStore = create<PokemonStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (pokemonId) => {
        set((state) => {
          const exists = state.favorites.includes(pokemonId);

          return {
            favorites: exists
              ? state.favorites.filter((id) => id !== pokemonId)
              : [...state.favorites, pokemonId],
          };
        });
      },

      isFavorite: (pokemonId) => get().favorites.includes(pokemonId),
    }),
    {
      name: 'pokedex-favorites',
    },
  ),
);
