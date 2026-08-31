export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;

  front_female: string | null;
  front_shiny_female: string | null;
  back_female: string | null;
  back_shiny_female: string | null;

  other?: {
    dream_world?: {
      front_default: string | null;
      front_female: string | null;
    };

    home?: {
      front_default: string | null;
      front_shiny: string | null;
      front_female: string | null;
      front_shiny_female: string | null;
    };

    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonTypeListResponse {
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
}

export interface EvolutionChainResponse {
  id: number;
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
  evolution_details: EvolutionDetails[];
}

export interface EvolutionDetails {
  min_level: number | null;
  trigger: {
    name: string;
  };
  item: {
    name: string;
    url: string;
  } | null;
  time_of_day: string;
  known_move: {
    name: string;
    url: string;
  } | null;
  location: {
    name: string;
    url: string;
  } | null;
  min_happiness: number | null;
  min_affection: number | null;
  held_item: {
    name: string;
    url: string;
  } | null;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
}
