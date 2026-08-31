import { Link } from 'react-router-dom';

import type { Pokemon } from '../../types/pokemon';

import {
  formatPokemonName,
  formatPokemonNumber,
  getPokemonImage,
} from '../../utils/pokemon';

import PokemonTypeBadge from '../PokemonTypeBadge/PokemonTypeBadge';

import './PokemonCard.scss';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (pokemonId: number) => void;
}

function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
}: PokemonCardProps) {
  const image = getPokemonImage(pokemon);

  return (
    <article className="pokemon-card">
      <button
        type="button"
        className={`pokemon-card__favorite ${
          isFavorite ? 'pokemon-card__favorite--active' : ''
        }`}
        onClick={() => onToggleFavorite(pokemon.id)}
        aria-label={
          isFavorite
            ? `Remove ${pokemon.name} from favorites`
            : `Add ${pokemon.name} to favorites`
        }
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card__link">
        <div className="pokemon-card__image">
          {image && (
            <img
              src={image}
              alt={formatPokemonName(pokemon.name)}
              loading="lazy"
            />
          )}
        </div>

        <div className="pokemon-card__content">
          <span className="pokemon-card__number">
            {formatPokemonNumber(pokemon.id)}
          </span>

          <h2>{formatPokemonName(pokemon.name)}</h2>

          <div className="pokemon-card__types">
            {pokemon.types.map(({ type }) => (
              <PokemonTypeBadge key={type.name} type={type.name} />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PokemonCard;
