import type { Pokemon } from '../../types/pokemon';

import PokemonCard from '../PokemonCard/PokemonCard';

import './PokemonGrid.scss';

interface PokemonGridProps {
  pokemon: Pokemon[];
  favorites: number[];
  onToggleFavorite: (pokemonId: number) => void;
}

function PokemonGrid({
  pokemon,
  favorites,
  onToggleFavorite,
}: PokemonGridProps) {
  return (
    <div className="pokemon-grid">
      {pokemon.map((item) => (
        <PokemonCard
          key={item.id}
          pokemon={item}
          isFavorite={favorites.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default PokemonGrid;
