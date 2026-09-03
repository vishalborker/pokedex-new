import { useState } from 'react';
import type { Pokemon } from '../../types/pokemon';

import PokemonTypeBadge from '../PokemonTypeBadge/PokemonTypeBadge';

import {
  formatPokemonName,
  formatPokemonNumber,
  getPokemonImage,
} from '../../utils/pokemon';

import './PokemonDetailsHero.scss';
import { useEvolutionChain } from '../../hooks/useEvolutionChain';

interface PokemonDetailsHeroProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (pokemonId: number) => void;
  isDescriptionLoading?: boolean;
}

function PokemonDetailsHero({
  pokemon,
  isFavorite,
  onToggleFavorite,
  isDescriptionLoading = false,
}: PokemonDetailsHeroProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { species } = useEvolutionChain(pokemon.name);
  const description =
    species?.flavor_text_entries
      .find(({ language }) => language.name === 'en')
      ?.flavor_text.replace(/[\n\f]/g, ' ') ?? '';
  const image = getPokemonImage(pokemon);
  const primaryType = pokemon.types[0]?.type.name ?? 'normal';

  const heightInMeters = (pokemon.height / 10).toFixed(1);
  const weightInKg = (pokemon.weight / 10).toFixed(1);

  return (
    <section
      className={`pokemon-details-hero pokemon-details-hero--${primaryType}`}
    >
      <div
        className={`pokemon-details-hero__image ${
          isImageLoaded
            ? 'pokemon-details-hero__image--loaded'
            : 'pokemon-details-hero__image--loading'
        }`}
      >
        {!isImageLoaded && (
          <div
            className="pokemon-details-hero__image-skeleton"
            aria-hidden="true"
          />
        )}

        {image && (
          <img
            className="pokemon-details-hero__artwork"
            src={image}
            alt={formatPokemonName(pokemon.name)}
            width={400}
            height={400}
            onLoad={() => setIsImageLoaded(true)}
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

        {isDescriptionLoading ? (
          <div
            className="pokemon-details-hero__description-skeleton"
            aria-label="Loading Pokémon description"
          >
            <span />
            <span />
            <span />
          </div>
        ) : (
          description && (
            <p className="pokemon-details-hero__description">{description}</p>
          )
        )}

        <div className="pokemon-details-hero__facts">
          <div className="pokemon-details-hero__fact">
            <span className="pokemon-details-hero__fact-label">Height</span>

            <span className="pokemon-details-hero__fact-value">
              {heightInMeters} m
            </span>
          </div>

          <div className="pokemon-details-hero__fact">
            <span className="pokemon-details-hero__fact-label">Weight</span>

            <span className="pokemon-details-hero__fact-value">
              {weightInKg} kg
            </span>
          </div>

          <div className="pokemon-details-hero__fact">
            <span className="pokemon-details-hero__fact-label">Base EXP</span>

            <span className="pokemon-details-hero__fact-value">
              {pokemon.base_experience}
            </span>
          </div>
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
