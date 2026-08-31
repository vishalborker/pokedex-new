import type { EvolutionChainLink } from '../../types/pokemon';

export interface EvolutionStage {
  name: string;
  evolvesFrom: string | null;
  details: {
    minLevel: number | null;
    trigger: string;
    item: string | null;
  };
}

export const flattenEvolutionChain = (
  chain: EvolutionChainLink,
  previous: string | null = null,
): EvolutionStage[] => {
  const result: EvolutionStage[] = [];

  result.push({
    name: chain.species.name,
    evolvesFrom: previous,
    details: {
      minLevel: chain.evolution_details[0]?.min_level ?? null,

      trigger: chain.evolution_details[0]?.trigger.name ?? '',

      item: chain.evolution_details[0]?.item?.name ?? null,
    },
  });

  chain.evolves_to.forEach((evolution) => {
    result.push(...flattenEvolutionChain(evolution, chain.species.name));
  });

  return result;
};
