import type { PokemonStat } from '../../types/pokemon';

import './PokemonStatPreview.scss';

interface PokemonStatPreviewProps {
  stats: PokemonStat[];
}

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  speed: 'SPD',
};

const PREVIEW_STATS = ['hp', 'attack', 'speed'];

function PokemonStatPreview({ stats }: PokemonStatPreviewProps) {
  const previewStats = stats.filter(({ stat }) =>
    PREVIEW_STATS.includes(stat.name),
  );

  if (previewStats.length === 0) {
    return null;
  }

  return (
    <div className="pokemon-stat-preview" aria-label="Base stats preview">
      {previewStats.map(({ stat, base_stat }) => {
        const statLabel = STAT_LABELS[stat.name] ?? stat.name;

        const statPercentage = Math.min((base_stat / 150) * 100, 100);

        return (
          <div key={stat.name} className="pokemon-stat-preview__item">
            <span className="pokemon-stat-preview__label">{statLabel}</span>

            <div className="pokemon-stat-preview__bar" aria-hidden="true">
              <span
                style={{
                  width: `${statPercentage}%`,
                }}
              />
            </div>

            <span className="pokemon-stat-preview__value">{base_stat}</span>
          </div>
        );
      })}
    </div>
  );
}

export default PokemonStatPreview;
