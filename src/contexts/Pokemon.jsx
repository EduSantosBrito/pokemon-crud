import React, { createContext, useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { generateId, getRandomId } from '../utils';

export const PokemonContext = createContext({
    backpack: [],
    available: null,
    loading: false,
    error: null,
    isBackpackFull: false,
    remainingBackpackSpace: 0,
    giveUpPokemon: () => {},
    getPokemon: async () => {},
    addPokemonToBackpack: () => {},
    removePokemonFromBackpack: () => {},
    editPokemon: () => {},
    createPokemon: () => {},
});

const MAX_LENGTH_BACKPACK = Number(process.env.REACT_APP_MAX_LENGTH_BACKPACK);

const PokemonProvider = ({ children }) => {
    const [backpack, setBackPack] = useState([]);
    const [available, setAvailable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const isBackpackFull = useMemo(() => backpack.length >= MAX_LENGTH_BACKPACK, [backpack]);
    const remainingBackpackSpace = useMemo(
        () => (isBackpackFull ? 0 : MAX_LENGTH_BACKPACK - backpack.length),
        [backpack, isBackpackFull],
    );

    const addPokemonToBackpack = useCallback(() => {
        if (isBackpackFull) {
            setError('Sua mochila está cheia :(');
            return;
        }
        setBackPack([...backpack, { uid: generateId(), ...available }]);
        setAvailable(null);
    }, [isBackpackFull, backpack, available]);

    const removePokemonFromBackpack = useCallback(
        uid => {
            const newBackpack = backpack.filter(capturedPokemon => capturedPokemon.uid !== uid);
            setBackPack(newBackpack);
        },
        [backpack],
    );

    const editPokemon = useCallback(
        newPokemonData => {
            const pokemon = backpack.find(
                capturedPokemon => capturedPokemon.uid === newPokemonData.uid,
            );
            const newPokemon = { ...pokemon, ...newPokemonData };
            const newBackpack = backpack.filter(
                capturedPokemon => capturedPokemon.uid !== newPokemonData.uid,
            );
            setBackPack([...newBackpack, newPokemon]);
        },
        [backpack],
    );

    const createPokemon = useCallback(
        newPokemonData => {
            if (isBackpackFull) {
                setError('Sua mochila está cheia :(');
                return;
            }
            setBackPack([...backpack, { uid: generateId(), ...newPokemonData }]);
        },
        [backpack, isBackpackFull],
    );

    const getPokemon = useCallback(async () => {
        setError(null);
        const randomId = getRandomId();
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_POKE_API_URL}/${randomId}`);
            const pokemon = await response.json();
            setLoading(false);
            setAvailable(pokemon);
            return pokemon;
        } catch (e) {
            setError(e.message);
            return null;
        }
    }, []);

    const giveUpPokemon = useCallback(() => {
        setAvailable(null);
    }, []);

    const value = useMemo(
        () => ({
            backpack,
            getPokemon,
            available,
            addPokemonToBackpack,
            removePokemonFromBackpack,
            loading,
            error,
            giveUpPokemon,
            isBackpackFull,
            remainingBackpackSpace,
            editPokemon,
            createPokemon,
        }),
        [
            getPokemon,
            available,
            addPokemonToBackpack,
            removePokemonFromBackpack,
            backpack,
            loading,
            error,
            giveUpPokemon,
            isBackpackFull,
            remainingBackpackSpace,
            editPokemon,
            createPokemon,
        ],
    );

    return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};

PokemonProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PokemonProvider;
