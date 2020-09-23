import React, { useContext, useMemo } from 'react';
import { PokemonContext } from '../contexts/Pokemon';
import { CHARACTER_STAGES, TOOLTIP_STAGES } from '../utils';

const Character = () => {
    const { getPokemon, loading, available, error } = useContext(PokemonContext);

    const characterStage = useMemo(() => {
        if (error) {
            return CHARACTER_STAGES.DEFAULT;
        }
        if (loading) {
            return CHARACTER_STAGES.ON_MOVEMENT;
        }
        if (!loading && available) {
            return CHARACTER_STAGES.STOPPED;
        }
        return CHARACTER_STAGES.DEFAULT;
    }, [available, loading, error]);

    const tooltipStage = useMemo(() => {
        if (error) {
            return TOOLTIP_STAGES.ERROR;
        }
        if (loading) {
            return TOOLTIP_STAGES.SEARCHING;
        }
        if (!loading && available) {
            return TOOLTIP_STAGES.FOUND;
        }
        return TOOLTIP_STAGES.DEFAULT;
    }, [loading, available, error]);

    return (
        <div className="character">
            <img
                className={`character__tooltip ${tooltipStage}`}
                alt="Balão de diálogo com um ícone de pesquisar"
            />
            <button
                className="character__button"
                disabled={loading || available}
                type="button"
                onClick={() => getPokemon()}
            >
                <img
                    className={`character__image ${characterStage}`}
                    alt={`Personagem do jogo Pokémon ${loading ? 'em movimento' : 'de frente'}`}
                />
            </button>
        </div>
    );
};

export default Character;
