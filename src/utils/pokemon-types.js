const TYPES = {
    bug: 'inseto',
    dark: 'noturno',
    dragon: 'dragão',
    electric: 'elétrico',
    fairy: 'fada',
    fighting: 'lutador',
    fire: 'fogo',
    flying: 'voador',
    ghost: 'fantasma',
    grass: 'planta',
    ground: 'terra',
    ice: 'gelo',
    normal: 'normal',
    poison: 'venenoso',
    psychic: 'psíquico',
    rock: 'pedra',
    steel: 'metálico',
    water: 'água',
};

export const DROPDOWN_TYPES = Object.entries(TYPES).map(([key, value]) => ({
    text: value,
    value: key,
}));

export default TYPES;
