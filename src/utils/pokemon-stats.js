import shield from '../assets/images/shield.png';
import speed from '../assets/images/speed.png';
import sword from '../assets/images/sword.png';
import isString from './is-string';

const sanitizeHP = value => `${value}/${value}`;
const sanitizeHeight = value => `${value} m`;
const unsanitizeHeight = value => (isString(value) ? Number(value.replaceAll(/\D/g, '')) : value);
const sanitizeWeight = value => `${value} kg`;
const unsanitizeWeight = value => (isString(value) ? Number(value.replaceAll(/\D/g, '')) : value);
const unsanitizeHP = value => (isString(value) ? Number(value.split('/')[0]) : value);

const STATS = {
    HP: { title: 'HP', name: 'hp', sanitize: sanitizeHP, unsanitize: unsanitizeHP },
    HEIGHT: { title: 'ALTURA', sanitize: sanitizeHeight, unsanitize: unsanitizeHeight },
    WEIGHT: { title: 'PESO', sanitize: sanitizeWeight, unsanitize: unsanitizeWeight },
    DEFENSE: { title: 'DEFESA', name: 'defense', icon: shield },
    ATTACK: { title: 'ATAQUE', name: 'attack', icon: sword },
    SPECIAL_DEFENSE: { title: 'DEFESA ESPECIAL', name: 'special-defense', icon: shield },
    SPECIAL_ATTACK: { title: 'ATAQUE ESPECIAL', name: 'special-attack', icon: sword },
    SPEED: { title: 'VELOCIDADE', name: 'speed', icon: speed },
};

export default STATS;
