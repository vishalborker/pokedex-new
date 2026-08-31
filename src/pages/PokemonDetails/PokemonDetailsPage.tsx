import { Link, useParams } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import EvolutionChain from '../../components/EvolutionChain/EvolutionChain';
import Loading from '../../components/Loading/Loading';
import PokemonTypeBadge from '../../components/PokemonTypeBadge/PokemonTypeBadge';

import { useEvolutionChain } from '../../hooks/useEvolutionChain';
import { usePokemon } from '../../hooks/usePokemon';

import { usePokemonStore } from '../../stores/pokemonStore';

import {
  formatHeight,
  formatPokemonName,
  formatPokemonNumber,
  formatWeight,
  getPokemonImage,
} from '../../utils/pokemon';

import './PokemonDetailsPage.scss';

function PokemonDetailsPage() {
  const { pokemonName } = useParams<{
    pokemonName: string;
  }>();

  const {
    data: pokemon,
    isLoading,
    isError,
    refetch,
  } = usePokemon(pokemonName ?? '');
  const { data: evolutionChain } = useEvolutionChain(pokemon?.name ?? '');

  const isFavorite = usePokemonStore((state) =>
    pokemon ? state.favorites.includes(pokemon.id) : false,
  );

  const toggleFavorite = usePokemonStore((state) => state.toggleFavorite);

  if (isLoading) {
    return <Loading message="Loading Pokémon..." />;
  }

  if (isError || !pokemon) {
    return <ErrorMessage message="Pokémon not found." onRetry={refetch} />;
  }

  const image = getPokemonImage(pokemon);

  return (
    <main className="pokemon-details">
      <div className="pokemon-details__container">
        <Link to="/" className="pokemon-details__back">
          ← Back to Pokédex
        </Link>

        <section className="pokemon-details__hero">
          <div className="pokemon-details__image">
            {image && <img src={image} alt={formatPokemonName(pokemon.name)} />}
          </div>

          <div className="pokemon-details__info">
            <span className="pokemon-details__number">
              {formatPokemonNumber(pokemon.id)}
            </span>

            <h1>{formatPokemonName(pokemon.name)}</h1>

            <div className="pokemon-details__types">
              {pokemon.types.map(({ type }) => (
                <PokemonTypeBadge key={type.name} type={type.name} />
              ))}
            </div>

            <button
              type="button"
              className="pokemon-details__favorite"
              onClick={() => toggleFavorite(pokemon.id)}
            >
              {isFavorite ? '♥ Remove Favorite' : '♡ Add Favorite'}
            </button>
          </div>
        </section>

        <section className="pokemon-details__section">
          <h2>About</h2>

          <div className="pokemon-details__measurements">
            <div>
              <span>Height</span>
              <strong>{formatHeight(pokemon.height)}</strong>
            </div>

            <div>
              <span>Weight</span>
              <strong>{formatWeight(pokemon.weight)}</strong>
            </div>

            <div>
              <span>Base XP</span>
              <strong>{pokemon.base_experience}</strong>
            </div>
          </div>
        </section>

        <section className="pokemon-details__section">
          <h2>Base Stats</h2>

          <div className="pokemon-stats">
            {pokemon.stats.map((stat) => (
              <div className="pokemon-stats__row" key={stat.stat.name}>
                <span>{stat.stat.name.replace('-', ' ')}</span>

                <strong>{stat.base_stat}</strong>

                <div className="pokemon-stats__bar">
                  <div
                    style={{
                      width: `${Math.min(stat.base_stat, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {evolutionChain && <EvolutionChain chain={evolutionChain.chain} />}

        <section className="pokemon-details__section">
          <h2>Abilities</h2>

          <div className="pokemon-details__abilities">
            {pokemon.abilities.map(({ ability, is_hidden }) => (
              <span key={ability.name}>
                {formatPokemonName(ability.name)}

                {is_hidden && ' (Hidden)'}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default PokemonDetailsPage;
