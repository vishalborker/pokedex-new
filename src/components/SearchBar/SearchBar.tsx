import { useState, type FormEvent } from 'react';

import './SearchBar.scss';

interface SearchBarProps {
  onSearch: (value: string) => void;
  initialValue?: string;
}

function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchValue = value.trim();

    if (searchValue) {
      onSearch(searchValue.toLowerCase());
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search Pokémon..."
        aria-label="Search Pokémon"
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
