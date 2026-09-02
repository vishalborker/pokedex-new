import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';

import { usePokemonSearch } from '../../hooks/usePokemon';

import './SearchBar.scss';

interface SearchBarProps {
  onSearch: (value: string) => void;
  initialValue?: string;
}

interface SearchResult {
  name: string;
  id: number;
}

const getPokemonId = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);

  return match ? Number(match[1]) : 0;
};

const SearchBar = ({ onSearch, initialValue = '' }: SearchBarProps) => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = usePokemonSearch();

  const searchResults = useMemo<SearchResult[]>(() => {
    const query = value.trim().toLowerCase();

    if (!query || !data?.results) {
      return [];
    }

    return data.results
      .map((pokemon) => ({
        name: pokemon.name,
        id: getPokemonId(pokemon.url),
      }))
      .filter((pokemon) => {
        const matchesName = pokemon.name.includes(query);
        const matchesId = String(pokemon.id) === query;

        return matchesName || matchesId;
      })
      .slice(0, 8);
  }, [value, data]);

  const showSuggestions = isFocused && value.trim().length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchValue = value.trim().toLowerCase();

    if (!searchValue) {
      return;
    }

    onSearch(searchValue);
    setIsFocused(false);
  };

  const handleSuggestionClick = (name: string) => {
    setValue(name);
    setIsFocused(false);

    onSearch(name);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  let suggestionContent: ReactNode;

  if (isLoading) {
    suggestionContent = (
      <div className="search-bar__status">Searching Pokémon...</div>
    );
  } else if (searchResults.length > 0) {
    suggestionContent = searchResults.map((pokemon) => (
      <button
        key={`${pokemon.id}-${pokemon.name}`}
        type="button"
        className="search-bar__suggestion"
        onClick={() => handleSuggestionClick(pokemon.name)}
      >
        <div className="search-bar__suggestion-image">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt=""
          />
        </div>

        <div className="search-bar__suggestion-info">
          <span className="search-bar__suggestion-name">{pokemon.name}</span>

          <span className="search-bar__suggestion-id">
            #{String(pokemon.id).padStart(3, '0')}
          </span>
        </div>
      </button>
    ));
  } else {
    suggestionContent = (
      <div className="search-bar__status">No Pokémon found</div>
    );
  }

  return (
    <div ref={searchRef} className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-bar__input-wrapper">
          <span className="search-bar__icon" aria-hidden="true">
            🔍
          </span>

          <input
            type="search"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search Pokémon..."
            aria-label="Search Pokémon"
            autoComplete="off"
          />

          {value && (
            <button
              type="button"
              className="search-bar__clear"
              aria-label="Clear search"
              onClick={() => {
                setValue('');
                setIsFocused(false);
              }}
            >
              ×
            </button>
          )}
        </div>

        <button type="submit" className="search-bar__submit">
          Search
        </button>
      </form>

      {showSuggestions && (
        <div className="search-bar__suggestions">{suggestionContent}</div>
      )}
    </div>
  );
};

export default SearchBar;
