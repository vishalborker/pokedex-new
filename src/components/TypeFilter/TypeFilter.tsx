import './TypeFilter.scss';

import {
  POKEMON_TYPES,
  POKEMON_TYPE_CONFIG,
  type PokemonTypeFilter,
} from './pokemonTypes';

interface TypeFilterProps {
  selectedType: PokemonTypeFilter;
  onTypeChange: (type: PokemonTypeFilter) => void;
}

function TypeFilter({ selectedType, onTypeChange }: TypeFilterProps) {
  return (
    <div className="type-filter" aria-label="Filter Pokémon by type">
      {POKEMON_TYPES.map((type) => {
        const config = POKEMON_TYPE_CONFIG[type];

        const isSelected = selectedType === type;

        return (
          <button
            key={type}
            type="button"
            className={`type-filter__button type-filter__button--${type} ${
              isSelected ? 'type-filter__button--active' : ''
            }`}
            onClick={() => onTypeChange(type)}
            aria-pressed={isSelected}
          >
            <span className="type-filter__icon" aria-hidden="true">
              {config.icon}
            </span>

            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default TypeFilter;
