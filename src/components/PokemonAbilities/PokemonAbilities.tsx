import type { PokemonAbility } from '../../types/pokemon';

import { formatPokemonName } from '../../utils/pokemon';

import './PokemonAbilities.scss';

interface PokemonAbilitiesProps {
  abilities: PokemonAbility[];
}

function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  if (abilities.length === 0) {
    return null;
  }

  return (
    <section className="pokemon-abilities-section">
      <h2>Abilities</h2>

      <div className="pokemon-abilities">
        {abilities.map(({ ability, is_hidden }) => (
          <div
            key={ability.name}
            className={`pokemon-ability ${
              is_hidden ? 'pokemon-ability--hidden' : ''
            }`}
          >
            <div className="pokemon-ability__icon" aria-hidden="true">
              {is_hidden ? '◉' : '✦'}
            </div>

            <div className="pokemon-ability__content">
              <strong className="pokemon-ability__name">
                {formatPokemonName(ability.name)}
              </strong>

              <span className="pokemon-ability__type">
                {is_hidden ? 'Hidden Ability' : 'Standard Ability'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PokemonAbilities;
