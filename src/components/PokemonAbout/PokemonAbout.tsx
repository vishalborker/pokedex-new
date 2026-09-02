import type { Pokemon } from '../../types/pokemon';

import { formatHeight, formatWeight } from '../../utils/pokemon';

import './PokemonAbout.scss';

interface PokemonAboutProps {
  pokemon: Pokemon;
}

function PokemonAbout({ pokemon }: PokemonAboutProps) {
  return (
    <section className="pokemon-about">
      <h2>About</h2>

      <div className="pokemon-about__measurements">
        <div className="pokemon-about__item">
          <span>Height</span>
          <strong>{formatHeight(pokemon.height)}</strong>
        </div>

        <div className="pokemon-about__item">
          <span>Weight</span>
          <strong>{formatWeight(pokemon.weight)}</strong>
        </div>

        <div className="pokemon-about__item">
          <span>Base XP</span>
          <strong>{pokemon.base_experience}</strong>
        </div>
      </div>
    </section>
  );
}

export default PokemonAbout;
