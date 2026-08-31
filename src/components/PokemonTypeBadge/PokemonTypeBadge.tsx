import './PokemonTypeBadge.scss';

interface PokemonTypeBadgeProps {
  type: string;
}

function PokemonTypeBadge({ type }: PokemonTypeBadgeProps) {
  return <span className={`pokemon-type pokemon-type--${type}`}>{type}</span>;
}

export default PokemonTypeBadge;
