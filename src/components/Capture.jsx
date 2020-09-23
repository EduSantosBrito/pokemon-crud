import React, { useContext, useMemo } from 'react';
import { PokemonContext } from '../contexts/Pokemon';
import Modal from './Modal';
import { TYPES, sanitizePokemon } from '../utils';
import Divider from './Divider';
import pokeball from '../assets/images/pokeball.png';

const Capture = () => {
    const { available, giveUpPokemon, addPokemonToBackpack, isBackpackFull } = useContext(
        PokemonContext,
    );

    const pokemon = useMemo(() => sanitizePokemon(available), [available]);

    return (
        <Modal
            image={{ src: pokemon.image, alt: `Desenho pixelado do pokémon ${pokemon.name}` }}
            open={!!available}
            close={giveUpPokemon}
        >
            <div className="capture">
                <h1 className="capture__name">{pokemon.name}</h1>
                <div className="capture__stats">
                    {pokemon.stats.map(
                        stat =>
                            !stat.icon && (
                                <div key={stat.title} className="capture__stats-item">
                                    <label htmlFor="stat-value">{stat.title}</label>
                                    <p id="stat-value">{stat.value}</p>
                                </div>
                            ),
                    )}
                </div>
                <Divider title="TIPO" />
                <div className="capture__types">
                    {pokemon.types.map(({ slot, type }) => (
                        <div key={slot} className={`capture__types-item type--${type.name}`}>
                            <p>{TYPES[type.name] ?? type.name}</p>
                        </div>
                    ))}
                </div>
                <Divider title="HABILIDADES" />
                <div className="capture__abilities">
                    <p>
                        {pokemon.abilities
                            .map(({ ability }) => ability.name.replaceAll('-', ' '))
                            .join(', ')}
                    </p>
                </div>
                <div
                    className={`capture__button ${
                        isBackpackFull ? 'capture__button--disabled' : ''
                    }`}
                >
                    <button
                        type="button"
                        disabled={isBackpackFull}
                        onClick={() => addPokemonToBackpack()}
                    >
                        <img
                            src={pokeball}
                            alt="Uma pokebola com metade em vermelho e a outra metade em branco"
                        />
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default Capture;
