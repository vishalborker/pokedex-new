import { useState } from 'react';

import type { Pokemon } from '../../types/pokemon';

import { usePokemonMove } from '../../hooks/usePokemon';

import { formatPokemonName, getPokemonImage } from '../../utils/pokemon';

import './PokemonMovesPreview.scss';

interface PokemonMovesPreviewProps {
  pokemon: Pokemon;
  opponent: Pokemon;
}

function PokemonMovesPreview({ pokemon, opponent }: PokemonMovesPreviewProps) {
  const [selectedMove, setSelectedMove] = useState(
    pokemon.moves[0]?.move.name ?? '',
  );

  const [isAttacking, setIsAttacking] = useState(false);

  const { data: move, isLoading } = usePokemonMove(selectedMove);

  const attackerImage = getPokemonImage(pokemon);
  const opponentImage = getPokemonImage(opponent);

  const moveType = move?.type.name ?? pokemon.types[0]?.type.name ?? 'normal';

  const visibleMoves = pokemon.moves.slice(0, 12);

  const handlePlayAttack = () => {
    setIsAttacking(false);

    requestAnimationFrame(() => {
      setIsAttacking(true);
    });
  };

  const handleAnimationEnd = () => {
    setIsAttacking(false);
  };

  return (
    <section className={`pokemon-moves pokemon-moves--${moveType}`}>
      <div className="pokemon-moves__header">
        <div>
          <span className="pokemon-moves__eyebrow">BATTLE MOVES</span>

          <h2>Attack Preview</h2>

          <p>Choose a move and see it in action.</p>
        </div>
      </div>

      <div className="pokemon-moves__list">
        {visibleMoves.map(({ move: moveItem }) => {
          const isSelected = selectedMove === moveItem.name;

          return (
            <button
              key={moveItem.name}
              type="button"
              className={`pokemon-moves__move ${
                isSelected ? 'pokemon-moves__move--active' : ''
              }`}
              onClick={() => {
                setSelectedMove(moveItem.name);
                setIsAttacking(false);
              }}
            >
              <span className="pokemon-moves__move-icon" aria-hidden="true">
                ✦
              </span>

              <span className="pokemon-moves__move-name">
                {formatPokemonName(moveItem.name)}
              </span>

              {isSelected && (
                <span
                  className="pokemon-moves__move-indicator"
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        className={`pokemon-moves__arena ${
          isAttacking ? 'pokemon-moves__arena--attacking' : ''
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className="pokemon-moves__fighter pokemon-moves__fighter--attacker">
          {attackerImage && (
            <img
              src={attackerImage}
              alt={formatPokemonName(pokemon.name)}
              width={180}
              height={180}
            />
          )}

          <span>{formatPokemonName(pokemon.name)}</span>
        </div>

        <div className="pokemon-moves__attack">
          <span
            className={`pokemon-moves__attack-effect pokemon-moves__attack-effect--${moveType}`}
            aria-hidden="true"
          />
        </div>

        <div className="pokemon-moves__fighter pokemon-moves__fighter--opponent">
          {opponentImage && (
            <img
              src={opponentImage}
              alt={formatPokemonName(opponent.name)}
              width={180}
              height={180}
            />
          )}

          <span>{formatPokemonName(opponent.name)}</span>
        </div>
      </div>

      <div className="pokemon-moves__details">
        <div className="pokemon-moves__move-info">
          <span className="pokemon-moves__selected-type">{moveType}</span>

          <h3>{isLoading ? 'Loading...' : formatPokemonName(selectedMove)}</h3>
        </div>

        <div className="pokemon-moves__stats">
          <div>
            <span>Power</span>
            <strong>{move?.power ?? '—'}</strong>
          </div>

          <div>
            <span>Accuracy</span>
            <strong>{move?.accuracy ? `${move.accuracy}%` : '—'}</strong>
          </div>

          <div>
            <span>Category</span>
            <strong>{move?.damage_class.name ?? '—'}</strong>
          </div>
        </div>

        <button
          type="button"
          className="pokemon-moves__play"
          onClick={handlePlayAttack}
          disabled={isLoading || !selectedMove}
        >
          ▶ Play Attack
        </button>
      </div>
    </section>
  );
}

export default PokemonMovesPreview;
