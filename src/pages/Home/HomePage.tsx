import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePokemonList } from '../../hooks/usePokemon';
import { usePokemonStore } from '../../stores/pokemonStore';
import type { PokemonTypeFilter } from '../../components/TypeFilter/pokemonTypes';
import TypeFilter from '../../components/TypeFilter/TypeFilter';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import PokemonGrid from '../../components/PokemonGrid/PokemonGrid';
import SearchBar from '../../components/SearchBar/SearchBar';
import Footer from '../../components/Footer/Footer';

import './HomePage.scss';

function HomePage() {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState<PokemonTypeFilter>('all');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    pokemon,
    isLoading,
    isPokemonLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonList(selectedType);

  const favorites = usePokemonStore((state) => state.favorites);

  const toggleFavorite = usePokemonStore((state) => state.toggleFavorite);

  const handleSearch = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '400px',
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // if (isLoading) {
  //   return <Loading message="Loading Pokémon..." />;
  // }

  if (isError) {
    return <ErrorMessage message="Unable to load Pokémon." onRetry={refetch} />;
  }

  return (
    <>
      <main className="home-page">
        <div className="home-page__container">
          <header className="home-page__header">
            <p className="home-page__eyebrow">
              Pokémon Explorer By Vishal Borker
            </p>

            <h1>Pokédex</h1>

            <p className="home-page__description">
              Explore Pokémon from every generation.
            </p>
          </header>

          <SearchBar onSearch={handleSearch} />

          <TypeFilter
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />

          {isLoading ? (
            <Loading message="Loading Pokémon..." />
          ) : (
            <PokemonGrid
              pokemon={pokemon}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {isPokemonLoading && !isFetchingNextPage && (
            <div className="home-page__loading">
              <Loading message="Loading Pokémon..." />
            </div>
          )}

          <div
            ref={loadMoreRef}
            className="home-page__load-more"
            aria-live="polite"
          >
            {isFetchingNextPage && (
              <Loading message="Loading more Pokémon..." />
            )}

            {!hasNextPage && pokemon.length > 0 && (
              <p>You've reached the end of the Pokédex.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
