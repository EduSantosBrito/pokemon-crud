import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Divider from './Divider';
import Button from './Button';
import editIcon from '../assets/images/editIcon.png';
import { PokemonContext } from '../contexts/Pokemon';
import { TYPES } from '../utils';

const CustomStats = ({ uid, pokemon, setIsEditing, close }) => {
    const { removePokemonFromBackpack } = useContext(PokemonContext);

    return (
        <div className="custom-stats">
            <div className="custom-stats__name">
                <h1>{pokemon.name}</h1>
                <button
                    className="custom-stats__name--icon"
                    type="button"
                    onClick={() => setIsEditing(true)}
                >
                    <img src={editIcon} alt="Ícone de editar" />
                </button>
            </div>
            <div className="custom-stats__stats">
                {pokemon.stats.map(
                    stat =>
                        !stat.icon && (
                            <div key={stat.title} className="custom-stats__stats-item">
                                <label htmlFor="stat-value">{stat.title}</label>
                                <p id="stat-value">{stat.value}</p>
                            </div>
                        ),
                )}
            </div>
            <Divider title="TIPO" />
            <div className="custom-stats__types">
                {pokemon.types.map(({ slot, type }) => (
                    <div key={slot} className={`custom-stats__types-item type--${type.name}`}>
                        <p>{TYPES[type.name] ?? type.name}</p>
                    </div>
                ))}
            </div>
            <Divider title="HABILIDADES" />
            <div className="custom-stats__abilities">
                <p>
                    {pokemon.abilities
                        .map(({ ability }) => ability.name.replaceAll('-', ' '))
                        .join(', ')}
                </p>
            </div>
            <Divider title="ESTATÍSTICAS" />
            <div className="custom-stats__statistics">
                {pokemon.stats.map(
                    stat =>
                        stat.icon && (
                            <div key={stat.title} className="custom-stats__statistics-item">
                                <img
                                    className="custom-stats__statistics-item--image"
                                    src={stat.icon}
                                    alt={`Ícone referente ao status ${stat.title.toLowerCase()}`}
                                />
                                <p className="custom-stats__statistics-item--title">{stat.title}</p>
                                <p className="custom-stats__statistics-item--value">{stat.value}</p>
                            </div>
                        ),
                )}
            </div>

            <div className="custom-stats__button">
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
    );
};

CustomStats.propTypes = {
    uid: PropTypes.string.isRequired,
    pokemon: PropTypes.shape({
        isCustomPokemon: PropTypes.bool,
        weight: PropTypes.number,
        height: PropTypes.number,
        stats: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                title: PropTypes.string,
            }),
        ),
        types: PropTypes.arrayOf(
            PropTypes.shape({
                slot: PropTypes.number,
                type: PropTypes.shape({ name: PropTypes.string }),
            }),
        ),
        abilities: PropTypes.arrayOf(
            PropTypes.shape({ ability: PropTypes.shape({ name: PropTypes.string }) }),
        ),
        sprites: PropTypes.shape({ front_default: PropTypes.string }),
        name: PropTypes.string,
    }).isRequired,
    setIsEditing: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
};

export default CustomStats;
