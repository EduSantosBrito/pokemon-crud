import STATS from './pokemon-stats';

const formatCustomPokemon = ({
    weight,
    height,
    hp,
    defense,
    attack,
    specialDefense,
    specialAttack,
    speed,
    types,
    abilities,
    image,
    name,
}) => ({
    isCustomPokemon: true,
    weight,
    height,
    stats: [
        { base_stat: hp, stat: { name: STATS.HP.name } },
        { base_stat: defense, stat: { name: STATS.DEFENSE.name } },
        { base_stat: attack, stat: { name: STATS.ATTACK.name } },
        { base_stat: specialDefense, stat: { name: STATS.SPECIAL_DEFENSE.name } },
        { base_stat: specialAttack, stat: { name: STATS.SPECIAL_ATTACK.name } },
        { base_stat: speed, stat: { name: STATS.SPEED.name } },
    ],
    types: types.map(({ value }, index) => ({ slot: index + 1, type: { name: value } })),
    abilities: abilities
        .map(({ value }) => ({ ability: { name: value } }))
        .filter(({ ability }) => !!ability.name),
    sprites: {
        front_default: image,
    },
    species: {
        name,
    },
});

export default formatCustomPokemon;
