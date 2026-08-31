import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePokemonList } from '../../hooks/usePokemon';

import { usePokemonStore } from '../../stores/pokemonStore';

import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PokemonGrid from '../../components/PokemonGrid/PokemonGrid';
import SearchBar from '../../components/SearchBar/SearchBar';

import './HomePage.scss';

const PAGE_SIZE = 20;

function HomePage() {
  const navigate = useNavigate();

  const [offset, setOffset] = useState(0);

  const { data, pokemon, isLoading, isPokemonLoading, isError, refetch } =
    usePokemonList(PAGE_SIZE, offset);

  const favorites = usePokemonStore((state) => state.favorites);

  const toggleFavorite = usePokemonStore((state) => state.toggleFavorite);

  const handleSearch = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  const handleNext = () => {
    if (data?.next) {
      setOffset((current) => current + PAGE_SIZE);
    }
  };

  const handlePrevious = () => {
    setOffset((current) => Math.max(0, current - PAGE_SIZE));
  };

  if (isLoading || isPokemonLoading) {
    return <Loading message="Loading Pokémon..." />;
  }

  if (isError || !data) {
    return <ErrorMessage message="Unable to load Pokémon." onRetry={refetch} />;
  }

  return (
    <main className="home-page">
      <div className="home-page__container">
        <header className="home-page__header">
          <p className="home-page__eyebrow">Pokémon Explorer</p>

          <h1>Pokédex</h1>

          <p>Explore Pokémon from every generation.</p>
        </header>

        <SearchBar onSearch={handleSearch} />

        <PokemonGrid
          pokemon={pokemon}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        <div className="home-page__pagination">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={offset === 0}
          >
            ← Previous
          </button>

          <span>
            Showing {offset + 1}–{Math.min(offset + PAGE_SIZE, data.count)} of{' '}
            {data.count}
          </span>

          <button type="button" onClick={handleNext} disabled={!data.next}>
            Next →
          </button>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
