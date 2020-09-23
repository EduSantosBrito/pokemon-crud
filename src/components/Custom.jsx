import React, { useState, useMemo, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PokemonContext } from '../contexts/Pokemon';
import { sanitizePokemon, formatCustomPokemon } from '../utils';
import Modal from './Modal';
import { UploadContext } from '../contexts/Upload';
import CustomForm from './CustomForm';
import CustomStats from './CustomStats';

const Custom = ({ uid, isCreating, close }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { backpack, editPokemon, createPokemon } = useContext(PokemonContext);
    const { image } = useContext(UploadContext);

    const pokemon = useMemo(
        () => sanitizePokemon(backpack.find(statsdPokemon => statsdPokemon.uid === uid)),
        [backpack, uid],
    );

    const onSubmit = useCallback(
        values => {
            if (isCreating) {
                createPokemon(formatCustomPokemon({ ...values, image }));
            } else {
                editPokemon({ uid, ...formatCustomPokemon({ ...values, image: pokemon.image }) });
            }
            close();
        },
        [isCreating, close, createPokemon, image, editPokemon, uid, pokemon.image],
    );

    return (
        <Modal
            image={{ src: pokemon.image, alt: `Imagem do pokémon ${pokemon.name}` }}
            open={!!uid || isCreating}
            close={() => {
                setIsEditing(false);
                close();
            }}
        >
            {isCreating || isEditing ? (
                <CustomForm isCreating={isCreating} pokemon={pokemon} onSubmit={onSubmit} />
            ) : (
                <CustomStats
                    uid={uid}
                    pokemon={pokemon}
                    close={close}
                    setIsEditing={setIsEditing}
                />
            )}
        </Modal>
    );
};

Custom.propTypes = {
    uid: PropTypes.string,
    isCreating: PropTypes.bool,
    close: PropTypes.func.isRequired,
};

Custom.defaultProps = {
    uid: null,
    isCreating: false,
};
export default Custom;
