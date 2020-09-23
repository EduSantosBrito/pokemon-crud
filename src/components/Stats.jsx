import React, { useContext, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import { PokemonContext } from '../contexts/Pokemon';
import { sanitizePokemon, TYPES } from '../utils';
import Modal from './Modal';
import Divider from './Divider';
import Button from './Button';
import TextInput from './TextInput';
import editIcon from '../assets/images/editIcon.png';
import checkIcon from '../assets/images/checkIcon.png';
import closeIcon from '../assets/images/closeIcon.png';

const Stats = ({ uid, close }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { backpack, removePokemonFromBackpack, editPokemon } = useContext(PokemonContext);

    const pokemon = useMemo(
        () => sanitizePokemon(backpack.find(statsdPokemon => statsdPokemon.uid === uid)),
        [backpack, uid],
    );

    const schema = useMemo(
        () =>
            yup.object().shape({
                name: yup
                    .string()
                    .min(2, 'O nome do seu pokémon deve ter pelo menos 2 caracteres')
                    .max(15, 'O nome do seu pokémon não pode ter mais de 15 caracteres')
                    .required('Seu pokémon não pode ficar sem nome'),
            }),
        [],
    );

    const handleConfirm = useCallback(
        async values => {
            setIsEditing(false);
            editPokemon({ uid, species: { ...pokemon.species, name: values.name } });
        },
        [editPokemon, pokemon.species, uid],
    );

    const handleCancel = useCallback(() => {
        setIsEditing(false);
    }, []);

    return (
        <Modal
            image={{ src: pokemon.image, alt: `Desenho pixelado do pokémon ${pokemon.name}` }}
            open={!!uid}
            close={() => {
                setIsEditing(false);
                close();
            }}
        >
            <div className="stats">
                {!isEditing ? (
                    <div className="stats__name">
                        <h1>{pokemon.name}</h1>
                        <button
                            className="stats__name--icon"
                            type="button"
                            onClick={() => setIsEditing(true)}
                        >
                            <img src={editIcon} alt="Ícone de editar" />
                        </button>
                    </div>
                ) : (
                    <Formik
                        initialValues={{ name: pokemon.name }}
                        validationSchema={schema}
                        validateOnBlur={false}
                        onSubmit={values => {
                            handleConfirm(values);
                        }}
                    >
                        {({ errors, touched, handleSubmit, handleChange, values }) => (
                            <form className="stats__name--editing" onSubmit={handleSubmit}>
                                <TextInput
                                    id="name-input"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                <button type="submit">
                                    <img src={checkIcon} alt="Ícone de marca de verificação" />
                                </button>
                                <button type="button" onClick={handleCancel}>
                                    <img src={closeIcon} alt="Ícone de fechar" />
                                </button>
                                {errors.name && touched.name ? (
                                    <label className="stats__error" htmlFor="name-input">
                                        {errors.name}
                                    </label>
                                ) : null}
                            </form>
                        )}
                    </Formik>
                )}
                <div className="stats__stats">
                    {pokemon.stats.map(
                        stat =>
                            !stat.icon && (
                                <div key={stat.title} className="stats__stats-item">
                                    <label htmlFor="stat-value">{stat.title}</label>
                                    <p id="stat-value">{stat.value}</p>
                                </div>
                            ),
                    )}
                </div>
                <Divider title="TIPO" />
                <div className="stats__types">
                    {pokemon.types.map(({ slot, type }) => (
                        <div key={slot} className={`stats__types-item type--${type.name}`}>
                            <p>{TYPES[type.name] ?? type.name}</p>
                        </div>
                    ))}
                </div>
                <Divider title="HABILIDADES" />
                <div className="stats__abilities">
                    <p>
                        {pokemon.abilities
                            .map(({ ability }) => ability.name.replaceAll('-', ' '))
                            .join(', ')}
                    </p>
                </div>
                <Divider title="ESTATÍSTICAS" />
                <div className="stats__statistics">
                    {pokemon.stats.map(
                        stat =>
                            stat.icon && (
                                <div key={stat.title} className="stats__statistics-item">
                                    <img
                                        className="stats__statistics-item--image"
                                        src={stat.icon}
                                        alt={`Ícone referente ao status ${stat.title.toLowerCase()}`}
                                    />
                                    <p className="stats__statistics-item--title">{stat.title}</p>
                                    <p className="stats__statistics-item--value">{stat.value}</p>
                                </div>
                            ),
                    )}
                </div>

                <div className="stats__button">
                    <Button
                        text="LIBERAR POKEMON"
                        onClick={() => {
                            removePokemonFromBackpack(uid);
                            setIsEditing(false);
                            close();
                        }}
                    />
                </div>
            </div>
        </Modal>
    );
};

Stats.propTypes = {
    uid: PropTypes.string,
    close: PropTypes.func.isRequired,
};

Stats.defaultProps = {
    uid: null,
};

export default Stats;
