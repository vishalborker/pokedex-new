import type { Pokemon } from '../../types/pokemon';

import PokemonTypeBadge from '../PokemonTypeBadge/PokemonTypeBadge';

import {
  formatPokemonName,
  formatPokemonNumber,
  getPokemonImage,
} from '../../utils/pokemon';

import './PokemonDetailsHero.scss';

interface PokemonDetailsHeroProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (pokemonId: number) => void;
}

function PokemonDetailsHero({
  pokemon,
  isFavorite,
  onToggleFavorite,
}: PokemonDetailsHeroProps) {
  const image = getPokemonImage(pokemon);
  const primaryType = pokemon.types[0]?.type.name ?? 'normal';

  return (
    <section
      className={`pokemon-details-hero pokemon-details-hero--${primaryType}`}
    >
      <div className="pokemon-details-hero__image">
        {image && (
          <img
            src={image}
            alt={formatPokemonName(pokemon.name)}
            width={400}
            height={400}
          />
        )}
      </div>

      <div className="pokemon-details-hero__info">
        <span className="pokemon-details-hero__number">
          {formatPokemonNumber(pokemon.id)}
        </span>

        <h1>{formatPokemonName(pokemon.name)}</h1>

        <div className="pokemon-details-hero__types">
          {pokemon.types.map(({ type }) => (
            <PokemonTypeBadge key={type.name} type={type.name} />
          ))}
        </div>

        <button
          type="button"
          className="pokemon-details-hero__favorite"
          onClick={() => onToggleFavorite(pokemon.id)}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '♥ Remove Favorite' : '♡ Add Favorite'}
        </button>
      </div>
    </section>
  );
}

export default PokemonDetailsHero;
