import { Link, useParams } from 'react-router-dom';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import EvolutionChain from '../../components/EvolutionChain/EvolutionChain';
import Loading from '../../components/Loading/Loading';
import PokemonAbilities from '../../components/PokemonAbilities/PokemonAbilities';
import PokemonDetailsHero from '../../components/PokemonDetailsHero/PokemonDetailsHero';

import { useEvolutionChain } from '../../hooks/useEvolutionChain';
import { usePokemon } from '../../hooks/usePokemon';

import { usePokemonStore } from '../../stores/pokemonStore';

import './PokemonDetailsPage.scss';
import PokemonAbout from '../../components/PokemonAbout/PokemonAbout';
import PokemonStats from '../../components/PokemonStats/PokemonStats';
import PokemonDetailNavigation from '../../components/PokemonDetailNavigation/PokemonDetailNavigation';

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

  return (
    <main className="pokemon-details">
      <div className="pokemon-details__container">
        <Link to="/" className="pokemon-details__back">
          ← Back to Pokédex
        </Link>
        <PokemonDetailNavigation pokemon={pokemon} />
        <PokemonDetailsHero
          pokemon={pokemon}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
        <PokemonAbout pokemon={pokemon} />
        <PokemonStats
          stats={pokemon.stats}
          primaryType={pokemon.types[0]?.type.name ?? 'normal'}
        />
        {evolutionChain && <EvolutionChain chain={evolutionChain.chain} />}
        <PokemonAbilities abilities={pokemon.abilities} />
      </div>
    </main>
  );
}

export default PokemonDetailsPage;
