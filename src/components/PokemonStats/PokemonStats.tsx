import type { PokemonStat } from '../../types/pokemon';

import './PokemonStats.scss';

interface PokemonStatsProps {
  stats: PokemonStat[];
  primaryType: string;
}

const STAT_CONFIG: Record<
  string,
  {
    label: string;
    icon: string;
  }
> = {
  hp: {
    label: 'HP',
    icon: '♥',
  },
  attack: {
    label: 'ATK',
    icon: '⚔',
  },
  defense: {
    label: 'DEF',
    icon: '🛡',
  },
  'special-attack': {
    label: 'SP.ATK',
    icon: '✦',
  },
  'special-defense': {
    label: 'SP.DEF',
    icon: '◈',
  },
  speed: {
    label: 'SPD',
    icon: '⚡',
  },
};

const getStatRating = (value: number) => {
  if (value >= 100) {
    return 'Excellent';
  }
  if (value >= 70) {
    return 'Good';
  }
  if (value >= 40) {
    return 'Average';
  }
  return 'Low';
};

function PokemonStats({ stats, primaryType }: PokemonStatsProps) {
  const totalStats = stats.reduce(
    (total, { base_stat }) => total + base_stat,
    0,
  );

  return (
    <section
      className={`pokemon-stats-section pokemon-stats-section--${primaryType}`}
    >
      <div className="pokemon-stats-section__header">
        <div>
          <span className="pokemon-stats-section__eyebrow">PERFORMANCE</span>

          <h2>Base Stats</h2>
        </div>

        <div
          className="pokemon-stats-section__total"
          aria-label={`Total base stats: ${totalStats}`}
        >
          <span>Total</span>
          <strong>{totalStats}</strong>
        </div>
      </div>

      <div className="pokemon-stats">
        {stats.map(({ stat, base_stat }, index) => {
          const config = STAT_CONFIG[stat.name] ?? {
            label: stat.name,
            icon: '●',
          };

          const statPercentage = Math.min((base_stat / 150) * 100, 100);
          const rating = getStatRating(base_stat);

          return (
            <div
              className="pokemon-stats__row"
              key={stat.name}
              style={
                {
                  '--stat-index': index,
                } as React.CSSProperties
              }
            >
              <div className="pokemon-stats__identity">
                <span className="pokemon-stats__icon" aria-hidden="true">
                  {config.icon}
                </span>

                <span className="pokemon-stats__label">{config.label}</span>
              </div>

              <div className="pokemon-stats__bar-wrapper">
                <div
                  className="pokemon-stats__bar"
                  role="progressbar"
                  aria-label={`${config.label}: ${base_stat}`}
                  aria-valuenow={base_stat}
                  aria-valuemin={0}
                  aria-valuemax={150}
                >
                  <span
                    style={{
                      width: `${statPercentage}%`,
                    }}
                  />
                </div>
                <span className="pokemon-stats__rating">{rating}</span>
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
