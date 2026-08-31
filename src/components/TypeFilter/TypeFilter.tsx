import './TypeFilter.scss';

import { POKEMON_TYPES, type PokemonTypeFilter } from './pokemonTypes';

interface TypeFilterProps {
  selectedType: PokemonTypeFilter;
  onTypeChange: (type: PokemonTypeFilter) => void;
}

function TypeFilter({ selectedType, onTypeChange }: TypeFilterProps) {
  return (
    <div className="type-filter" aria-label="Filter Pokémon by type">
      {POKEMON_TYPES.map((type) => (
        <button
          key={type}
          type="button"
          className={`type-filter__button ${
            selectedType === type ? 'type-filter__button--active' : ''
          }`}
          onClick={() => onTypeChange(type)}
        >
          {type === 'all' ? 'All' : type}
        </button>
      ))}
    </div>
  );
}

export default TypeFilter;
