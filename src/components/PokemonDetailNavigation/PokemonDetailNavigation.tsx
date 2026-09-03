import { useNavigate } from 'react-router-dom';

import type { Pokemon } from '../../types/pokemon';
import { formatPokemonNumber } from '../../utils/pokemon';

import './PokemonDetailNavigation.scss';

interface PokemonDetailNavigationProps {
  pokemon: Pokemon;
}

function PokemonDetailNavigation({ pokemon }: PokemonDetailNavigationProps) {
  const navigate = useNavigate();

  const previousId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextId = pokemon.id < 1025 ? pokemon.id + 1 : null;

  const previousImage = previousId
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${previousId}.png`
    : null;

  const nextImage = nextId
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${nextId}.png`
    : null;

  const handlePrevious = () => {
    if (previousId) {
      navigate(`/pokemon/${previousId}`);
    }
  };

  const handleNext = () => {
    if (nextId) {
      navigate(`/pokemon/${nextId}`);
    }
  };

  return (
    <nav className="pokemon-detail-navigation" aria-label="Pokémon navigation">
      <button
        type="button"
        className="pokemon-detail-navigation__button pokemon-detail-navigation__button--previous"
        onClick={handlePrevious}
        disabled={!previousId}
        aria-label={
          previousId
            ? `Previous Pokémon: #${formatPokemonNumber(previousId)}`
            : 'No previous Pokémon'
        }
      >
        {previousImage && (
          <img src={previousImage} alt="" width={64} height={64} />
        )}

        <span className="pokemon-detail-navigation__content">
          <span className="pokemon-detail-navigation__direction">
            ← Previous
          </span>

          {previousId && (
            <span className="pokemon-detail-navigation__pokemon">
              <span>#{formatPokemonNumber(previousId)}</span>
            </span>
          )}
        </span>
      </button>

      <button
        type="button"
        className="pokemon-detail-navigation__button pokemon-detail-navigation__button--next"
        onClick={handleNext}
        disabled={!nextId}
        aria-label={
          nextId
            ? `Next Pokémon: #${formatPokemonNumber(nextId)}`
            : 'No next Pokémon'
        }
      >
        <span className="pokemon-detail-navigation__content">
          <span className="pokemon-detail-navigation__direction">Next →</span>

          {nextId && (
            <span className="pokemon-detail-navigation__pokemon">
              <span>#{formatPokemonNumber(nextId)}</span>
            </span>
          )}
        </span>

        {nextImage && <img src={nextImage} alt="" width={64} height={64} />}
      </button>
    </nav>
  );
}

export default PokemonDetailNavigation;
