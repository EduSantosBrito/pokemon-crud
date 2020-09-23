import React, { useMemo, useContext, useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { STATS, generateId, DROPDOWN_TYPES, TYPES } from '../utils';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import Divider from './Divider';
import Multiselect from './Multiselect';
import Button from './Button';
import shield from '../assets/images/shield.png';
import sword from '../assets/images/sword.png';
import speed from '../assets/images/speed.png';
import { UploadContext } from '../contexts/Upload';

const CustomForm = ({ isCreating, pokemon, onSubmit }) => {
    const { image } = useContext(UploadContext);
    const [imageError, setImageError] = useState(null);

    useEffect(() => {
        if (pokemon.image || image) {
            setImageError(null);
        }
    }, [image, pokemon.image]);

    const schema = useMemo(
        () =>
            yup.object().shape({
                name: yup
                    .string()
                    .min(2, 'O nome do seu pokémon deve ter pelo menos 2 caracteres')
                    .max(15, 'O nome do seu pokémon não pode ter mais de 15 caracteres')
                    .required('Seu pokémon não pode ficar sem nome'),
                hp: yup
                    .number()
                    .min(11, 'A vida do seu pokémon não pode ser menor do que 11')
                    .required('Seu pokémon não pode ficar sem pontos de vida'),
                weight: yup
                    .number()
                    .min(1, 'O peso do seu pokémon não pode ser menor do que 1')
                    .required('Seu pokémon não pode ficar sem peso'),
                height: yup
                    .number()
                    .min(1, 'A altura do seu pokémon não pode ser menor do que 1')
                    .required('Seu pokémon não pode ficar sem altura'),
                defense: yup
                    .number()
                    .min(4, 'A defesa do seu pokémon não pode ser menor do que 4')
                    .required('Seu pokémon não pode ficar sem defesa'),
                attack: yup
                    .number()
                    .min(4, 'O ataque do seu pokémon não pode ser menor do que 4')
                    .required('Seu pokémon não pode ficar sem ataque'),
                specialDefense: yup
                    .number()
                    .min(4, 'A defesa especial do seu pokémon não pode ser menor do que 4')
                    .required('Seu pokémon não pode ficar sem defesa especial'),
                specialAttack: yup
                    .number()
                    .min(4, 'O ataque especial do seu pokémon não pode ser menor do que 4')
                    .required('Seu pokémon não pode ficar sem ataque especial'),
                speed: yup
                    .number()
                    .min(4, 'A velocidade do seu pokémon não pode ser menor do que 4')
                    .required('Seu pokémon não pode ficar sem velocidade'),
                types: yup
                    .array()
                    .of(yup.string())
                    .min(1, 'Seu pokémon deve conter pelo menos um tipo')
                    .max(2, 'Seu pokémon não pode ter mais de 2 tipos'),
                abilities: yup
                    .array()
                    .of(yup.object().shape({ uid: yup.string(), value: yup.string() }))
                    .test(
                        'min-one-ability',
                        'Seu pokémon deve conter pelo menos uma habilidade',
                        value => {
                            const abilities = value.map(item => item.value).filter(item => !!item);
                            return abilities.length;
                        },
                    ),
            }),
        [],
    );

    const generateInitialValues = useMemo(
        () => ({
            name: pokemon.name ?? '',
            hp:
                STATS.HP.unsanitize(
                    pokemon.stats.find(stat => STATS.HP.title === stat.title)?.value,
                ) ?? 0,
            weight:
                STATS.WEIGHT.unsanitize(
                    pokemon.stats.find(stat => stat.title === STATS.WEIGHT.title)?.value,
                ) ?? 0,
            height:
                STATS.HEIGHT.unsanitize(
                    pokemon.stats.find(stat => stat.title === STATS.HEIGHT.title)?.value,
                ) ?? 0,
            types:
                pokemon.types.map(({ type }) => ({
                    text: TYPES[type.name],
                    value: type.name,
                })) ?? [],
            defense: pokemon.stats.find(stat => STATS.DEFENSE.title === stat.title)?.value ?? 0,
            attack: pokemon.stats.find(stat => STATS.ATTACK.title === stat.title)?.value ?? 0,
            specialDefense:
                pokemon.stats.find(stat => STATS.SPECIAL_DEFENSE.title === stat.title)?.value ?? 0,
            specialAttack:
                pokemon.stats.find(stat => STATS.SPECIAL_ATTACK.title === stat.title)?.value ?? 0,
            speed: pokemon.stats.find(stat => STATS.SPEED.title === stat.title)?.value ?? 0,
            abilities: pokemon.abilities.length
                ? [
                      ...pokemon.abilities.map(({ ability }) => ({
                          uid: generateId(),
                          value: ability.name,
                      })),
                      ...(pokemon.abilities.length < 4
                          ? Array.from({ length: 4 - pokemon.abilities.length }).map(() => ({
                                uid: generateId(),
                                value: '',
                            }))
                          : []),
                  ]
                : Array.from({ length: 4 }).map(() => ({
                      uid: generateId(),
                      value: '',
                  })),
        }),
        [pokemon],
    );

    return (
        <div className="custom-form">
            <Formik
                initialValues={generateInitialValues}
                validationSchema={schema}
                validateOnBlur
                onSubmit={values => {
                    if (!pokemon.image && !image) {
                        setImageError('Seu pokémon não pode ficar sem imagem');
                        return;
                    }
                    onSubmit(values);
                }}
            >
                {({
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                    values,
                    setFieldValue,
                    handleBlur,
                    dirty,
                    isValid,
                }) => (
                    <form className="custom-form__form" onSubmit={handleSubmit}>
                        {imageError ? (
                            <span className="custom-form__error">{imageError}</span>
                        ) : null}
                        <div className="custom-form__form-item">
                            <TextInput
                                onBlur={handleBlur}
                                label="Nome"
                                placeholder="Nome"
                                id="name-input"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                            />
                            {errors.name && touched.name ? (
                                <label className="custom-form__error" htmlFor="name-input">
                                    {errors.name}
                                </label>
                            ) : null}
                        </div>
                        <div className="custom-form__form-item">
                            <NumberInput
                                onBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                label="HP"
                                placeholder="HP"
                                id="hp-input"
                                name="hp"
                                value={values.hp}
                                onChange={handleChange}
                            />
                            {errors.hp && touched.hp ? (
                                <label className="custom-form__error" htmlFor="hp-input">
                                    {errors.hp}
                                </label>
                            ) : null}
                        </div>
                        <div className="custom-form__form-item">
                            <NumberInput
                                onBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                label="Peso"
                                placeholder="Peso"
                                id="weight-input"
                                name="weight"
                                value={values.weight}
                                onChange={handleChange}
                                suffix="Kg"
                            />
                            {errors.weight && touched.weight ? (
                                <label className="custom-form__error" htmlFor="weight-input">
                                    {errors.weight}
                                </label>
                            ) : null}
                        </div>
                        <div className="custom-form__form-item">
                            <NumberInput
                                onBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                label="Altura"
                                placeholder="Altura"
                                id="height-input"
                                name="height"
                                value={values.height}
                                onChange={handleChange}
                                suffix="Cm"
                            />
                            {errors.height && touched.height ? (
                                <label className="custom-form__error" htmlFor="height-input">
                                    {errors.height}
                                </label>
                            ) : null}
                        </div>
                        <Divider title="TIPO" />
                        <div className="custom-form__form-item">
                            <Multiselect
                                id="types-input"
                                name="types"
                                placeholder="Selecione o(s) tipo(s)"
                                options={DROPDOWN_TYPES}
                                value={values.types}
                                onChange={setFieldValue}
                            />
                            {errors.types && touched.types ? (
                                <label className="custom-form__error" htmlFor="types-input">
                                    {errors.types}
                                </label>
                            ) : null}
                        </div>
                        <Divider title="HABILIDADES" />
                        {values.abilities.map((ability, index) => (
                            <div key={ability.uid} className="custom-form__form-item">
                                <TextInput
                                    onBlur={handleBlur}
                                    placeholder={`Habilidade ${index + 1}`}
                                    id={`abilities.${index}-input`}
                                    name={`abilities.${index}`}
                                    value={ability.value}
                                    onChange={event =>
                                        setFieldValue(`abilities.${index}`, {
                                            uid: ability.uid,
                                            value: event.target.value,
                                        })
                                    }
                                />
                            </div>
                        ))}
                        {errors.abilities && touched.abilities ? (
                            <label className="custom-form__error" htmlFor="name-input">
                                {errors.abilities}
                            </label>
                        ) : null}
                        <Divider title="ESTATÍSTICAS" />
                        <div className="custom-form__form-item">
                            <NumberInput
                                onBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                label={
                                    <div className="custom-form__form-item-label">
                                        <img src={shield} alt="Ícone de um escudo" />
                                        <span>Defesa</span>
                                    </div>
                                }
                                placeholder="Defesa"
                                id="defense-input"
                                name="defense"
                                value={values.defense}
                                onChange={handleChange}
                            />
                            {errors.defense && touched.defense ? (
                                <label className="custom-form__error" htmlFor="defense-input">
                                    {errors.defense}
                                </label>
                            ) : null}
                        </div>
                        <div className="custom-form__form-item">
                            <NumberInput
                                onBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                label={
                                    <div className="custom-form__form-item-label">
                                        <img src={sword} alt="Ícone de uma espada" />
                                        <span>Ataque</span>
                                    </div>
                                }
                                placeholder="Ataque"
                                id="attack-input"
                                name="attack"
                                value={values.attack}
                                onChange={handleChange}
                            />
                            {errors.attack && touched.attack ? (
                                <label className="custom-form__error" htmlFor="attack-input">
                                    {errors.attack}
                                </label>
                            ) : null}
                        </div>
                        <div className="custom-form__form-item">
                            <NumberInput
                                onBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                label={
                                    <div className="custom-form__form-item-label">
                                        <img src={shield} alt="Ícone de um escudo" />
                                        <span>Defesa Especial</span>
                                    </div>
                                }
                                placeholder="Defesa Especial"
                                id="specialDefense-input"
                                name="specialDefense"
                                value={values.specialDefense}
                                onChange={handleChange}
                            />
                            {errors.specialDefense && touched.specialDefense ? (
                                <label
                                    className="custom-form__error"
                                    htmlFor="specialDefense-input"
                                >
                                    {errors.specialDefense}
                                </label>
                            ) : null}
                        </div>
                        <div className="custom-form__form-item">
                            <NumberInput
                                onBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                label={
                                    <div className="custom-form__form-item-label">
                                        <img src={sword} alt="Ícone de uma espada" />
                                        <span>Ataque Especial</span>
                                    </div>
                                }
                                placeholder="Ataque Especial"
                                id="specialAttack-input"
                                name="specialAttack"
                                value={values.specialAttack}
                                onChange={handleChange}
                            />
                            {errors.specialAttack && touched.specialAttack ? (
                                <label className="custom-form__error" htmlFor="specialAttack-input">
                                    {errors.specialAttack}
                                </label>
                            ) : null}
                        </div>
                        <div className="custom-form__form-item">
                            <NumberInput
                                onBlur={handleBlur}
                                setFieldValue={setFieldValue}
                                label={
                                    <div className="custom-form__form-item-label">
                                        <img src={speed} alt="Ícone de um velocímetro" />
                                        <span>Velocidade</span>
                                    </div>
                                }
                                placeholder="Velocidade"
                                id="speed-input"
                                name="speed"
                                value={values.speed}
                                onChange={handleChange}
                            />
                            {errors.speed && touched.speed ? (
                                <label className="custom-form__error" htmlFor="speed-input">
                                    {errors.speed}
                                </label>
                            ) : null}
                        </div>
                        <Button
                            disabled={!(isValid && dirty)}
                            className="custom-form__button"
                            type="submit"
                            text={`${isCreating ? 'CRIAR' : 'EDITAR'} POKEMON`}
                        />
                    </form>
                )}
            </Formik>
        </div>
    );
};

CustomForm.propTypes = {
    pokemon: PropTypes.shape({
        image: PropTypes.string,
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
    }),
    onSubmit: PropTypes.func.isRequired,
    isCreating: PropTypes.bool.isRequired,
};

CustomForm.defaultProps = {
    pokemon: {
        isCustomPokemon: false,
        weight: 0,
        height: 0,
        name: '',
        stats: [],
        abilities: [],
        sprites: {
            front_default: '',
        },
    },
};

export default CustomForm;
