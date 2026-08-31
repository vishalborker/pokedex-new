export const POKEMON_TYPES = [
  'all',
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const;

export type PokemonTypeFilter = (typeof POKEMON_TYPES)[number];

export interface PokemonTypeConfig {
  label: string;
  icon: string;
}

export const POKEMON_TYPE_CONFIG: Record<PokemonTypeFilter, PokemonTypeConfig> =
  {
    all: {
      label: 'All',
      icon: '◉',
    },
    normal: {
      label: 'Normal',
      icon: '●',
    },
    fire: {
      label: 'Fire',
      icon: '🔥',
    },
    water: {
      label: 'Water',
      icon: '💧',
    },
    electric: {
      label: 'Electric',
      icon: '⚡',
    },
    grass: {
      label: 'Grass',
      icon: '🌿',
    },
    ice: {
      label: 'Ice',
      icon: '❄️',
    },
    fighting: {
      label: 'Fighting',
      icon: '🥊',
    },
    poison: {
      label: 'Poison',
      icon: '☠️',
    },
    ground: {
      label: 'Ground',
      icon: '🌍',
    },
    flying: {
      label: 'Flying',
      icon: '🪽',
    },
    psychic: {
      label: 'Psychic',
      icon: '🔮',
    },
    bug: {
      label: 'Bug',
      icon: '🐛',
    },
    rock: {
      label: 'Rock',
      icon: '🪨',
    },
    ghost: {
      label: 'Ghost',
      icon: '👻',
    },
    dragon: {
      label: 'Dragon',
      icon: '🐉',
    },
    dark: {
      label: 'Dark',
      icon: '🌑',
    },
    steel: {
      label: 'Steel',
      icon: '⚙️',
    },
    fairy: {
      label: 'Fairy',
      icon: '✨',
    },
  };
