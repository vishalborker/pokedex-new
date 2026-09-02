import type { PokemonStat } from '../../types/pokemon';

import './PokemonStats.scss';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <section className="pokemon-stats-section">
      <h2>Base Stats</h2>

      <div className="pokemon-stats">
        {stats.map((stat) => (
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
  );
}

export default PokemonStats;
