import { Link } from 'react-router-dom';

import type { EvolutionChainLink } from '../../types/pokemon';

import { usePokemon } from '../../hooks/usePokemon';

import {
  formatPokemonName,
  formatPokemonNumber,
  getPokemonImage,
} from '../../utils/pokemon';

import './EvolutionChain.scss';

interface EvolutionChainProps {
  chain: EvolutionChainLink;
}

interface EvolutionCardProps {
  name: string;
}

interface EvolutionStageProps {
  evolution: EvolutionChainLink;
  isFirst: boolean;
}

/**
 * Displays a single Pokémon inside the evolution chain.
 */
function EvolutionCard({ name }: EvolutionCardProps) {
  const { data: pokemon, isLoading } = usePokemon(name);

  if (isLoading || !pokemon) {
    return (
      <div className="evolution-card evolution-card--loading">
        <div className="evolution-card__image-skeleton" />

        <div className="evolution-card__name-skeleton" />

        <div className="evolution-card__number-skeleton" />
      </div>
    );
  }

  const image = getPokemonImage(pokemon);

  return (
    <Link to={`/pokemon/${pokemon.name}`} className="evolution-card">
      <div className="evolution-card__image">
        {image && (
          <img
            src={image}
            alt={formatPokemonName(pokemon.name)}
            loading="lazy"
          />
        )}
      </div>

      <span className="evolution-card__number">
        {formatPokemonNumber(pokemon.id)}
      </span>

      <span className="evolution-card__name">
        {formatPokemonName(pokemon.name)}
      </span>
    </Link>
  );
}

/**
 * Displays the requirement between two evolution stages.
 */
function EvolutionConnector({ evolution }: { evolution: EvolutionChainLink }) {
  const details = evolution.evolution_details[0];

  if (!details) {
    return (
      <div className="evolution-connector">
        <span className="evolution-connector__line" />

        <span className="evolution-connector__arrow">→</span>
      </div>
    );
  }

  const getRequirement = () => {
    if (details.min_level) {
      return `Level ${details.min_level}`;
    }

    if (details.item?.name) {
      return formatPokemonName(details.item.name);
    }

    if (details.known_move?.name) {
      return formatPokemonName(details.known_move.name);
    }

    if (details.min_happiness) {
      return `Happiness ${details.min_happiness}`;
    }

    if (details.min_affection) {
      return `Affection ${details.min_affection}`;
    }

    if (details.time_of_day) {
      return formatPokemonName(details.time_of_day);
    }

    if (details.trigger?.name) {
      return formatPokemonName(details.trigger.name);
    }

    return 'Evolution';
  };

  return (
    <div className="evolution-connector">
      <div className="evolution-connector__line" />

      <span className="evolution-connector__requirement">
        {getRequirement()}
      </span>

      <span className="evolution-connector__arrow">→</span>
    </div>
  );
}

/**
 * Recursively renders an evolution branch.
 *
 * This allows us to support chains such as:
 *
 * Eevee
 *   ├── Vaporeon
 *   ├── Jolteon
 *   └── Flareon
 */
function EvolutionStage({ evolution, isFirst }: EvolutionStageProps) {
  const hasMultipleEvolutions = evolution.evolves_to.length > 1;

  return (
    <div
      className={`evolution-stage ${isFirst ? 'evolution-stage--root' : ''} ${
        hasMultipleEvolutions ? 'evolution-stage--branching' : ''
      }`}
    >
      {!isFirst && <EvolutionConnector evolution={evolution} />}

      <EvolutionCard name={evolution.species.name} />

      {evolution.evolves_to.length > 0 && (
        <div className="evolution-stage__children">
          {evolution.evolves_to.map((child) => (
            <EvolutionStage
              key={child.species.name}
              evolution={child}
              isFirst={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EvolutionChain({ chain }: EvolutionChainProps) {
  if (!chain) {
    return null;
  }

  return (
    <section className="evolution" aria-labelledby="evolution-title">
      <header className="evolution__header">
        <span className="evolution__eyebrow">Pokémon Journey</span>

        <h2 id="evolution-title" className="evolution__title">
          Evolution Chain
        </h2>

        <p className="evolution__description">
          Discover how this Pokémon evolves.
        </p>
      </header>

      <div className="evolution__content">
        <EvolutionStage evolution={chain} isFirst />
      </div>
    </section>
  );
}

export default EvolutionChain;
