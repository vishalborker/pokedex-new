import type { PokemonStat } from '../../types/pokemon';

import './PokemonStats.scss';

interface PokemonStatsProps {
  stats: PokemonStat[];
  primaryType: string;
}

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD',
};

function PokemonStats({ stats, primaryType }: PokemonStatsProps) {
  return (
    <section
      className={`pokemon-stats-section pokemon-stats-section--${primaryType}`}
    >
      <h2>Base Stats</h2>

      <div className="pokemon-stats">
        {stats.map(({ stat, base_stat }) => {
          const label = STAT_LABELS[stat.name] ?? stat.name;

          const statPercentage = Math.min((base_stat / 150) * 100, 100);

          return (
            <div className="pokemon-stats__row" key={stat.name}>
              <span className="pokemon-stats__label">{label}</span>

              <div className="pokemon-stats__bar" aria-hidden="true">
                <span
                  style={{
                    width: `${statPercentage}%`,
                  }}
                />
              </div>

              <strong className="pokemon-stats__value">{base_stat}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PokemonStats;
