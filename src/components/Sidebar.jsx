import React, { useContext, useState } from 'react';
import Button from './Button';
import plusIcon from '../assets/images/plus.png';
import { PokemonContext } from '../contexts/Pokemon';
import { generateId } from '../utils';
import Stats from './Stats';
import Custom from './Custom';

const Sidebar = () => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [isCustomPokemon, setIsCustomPokemon] = useState(false);
    const { backpack, isBackpackFull, remainingBackpackSpace } = useContext(PokemonContext);

    return (
        <>
            <div className="sidebar">
                {backpack.map(pokemon => (
                    <button
                        type="button"
                        key={pokemon.uid}
                        onClick={() => {
                            setIsCustomPokemon(pokemon.isCustomPokemon);
                            setSelectedPokemon(pokemon.uid);
                        }}
                        className="sidebar__item sidebar__item--filled"
                    >
                        <img
                            src={pokemon.sprites.front_default}
                            alt={`Desenho pixelado do pokémon ${pokemon.species.name}`}
                        />
                    </button>
                ))}
                {!isBackpackFull &&
                    Array.from({ length: remainingBackpackSpace }).map(() => (
                        <div key={generateId()} className="sidebar__item">
                            ?
                        </div>
                    ))}
                {!isBackpackFull && (
                    <Button
                        onClick={() => setIsCustomPokemon(true)}
                        icon={<img src={plusIcon} alt="+" />}
                    />
                )}
            </div>
            {!isCustomPokemon && (
                <Stats uid={selectedPokemon} close={() => setSelectedPokemon(null)} />
            )}
            {isCustomPokemon && (
                <Custom
                    uid={selectedPokemon}
                    isCreating={!selectedPokemon && isCustomPokemon}
                    close={() => {
                        setIsCustomPokemon(false);
                        setSelectedPokemon(null);
                    }}
                />
            )}
        </>
    );
};

export default Sidebar;
