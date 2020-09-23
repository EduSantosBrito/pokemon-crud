import STATS from './pokemon-stats';

const sanitizePokemon = pokemon => ({
    image: pokemon?.sprites.front_default ?? null,
    name: pokemon?.species.name ?? null,
    stats: pokemon
        ? [
              {
                  title: STATS.HP.title,
                  value: STATS.HP.sanitize(
                      pokemon?.stats.find(({ stat }) => stat.name === STATS.HP.name).base_stat,
                  ),
              },
              // The height is in Decimeter, so I had to divide by 10 to get Meter value
              {
                  title: STATS.HEIGHT.title,
                  value: STATS.HEIGHT.sanitize(pokemon?.height / 10.0),
              },
              // The weight is in Hectogram, so I had to divide by 10 to get Kilogram value
              {
                  title: STATS.WEIGHT.title,
                  value: STATS.WEIGHT.sanitize(pokemon?.weight / 10.0),
              },
              {
                  title: STATS.DEFENSE.title,
                  icon: STATS.DEFENSE.icon,
                  value: pokemon?.stats.find(({ stat }) => stat.name === STATS.DEFENSE.name)
                      .base_stat,
              },
              {
                  title: STATS.ATTACK.title,
                  icon: STATS.ATTACK.icon,
                  value: pokemon?.stats.find(({ stat }) => stat.name === STATS.ATTACK.name)
                      .base_stat,
              },
              {
                  title: STATS.SPECIAL_DEFENSE.title,
                  icon: STATS.SPECIAL_DEFENSE.icon,
                  value: pokemon?.stats.find(({ stat }) => stat.name === STATS.SPECIAL_DEFENSE.name)
                      .base_stat,
              },
              {
                  title: STATS.SPECIAL_ATTACK.title,
                  icon: STATS.SPECIAL_ATTACK.icon,
                  value: pokemon?.stats.find(({ stat }) => stat.name === STATS.SPECIAL_ATTACK.name)
                      .base_stat,
              },
              {
                  title: STATS.SPEED.title,
                  icon: STATS.SPEED.icon,
                  value: pokemon?.stats.find(({ stat }) => stat.name === STATS.SPEED.name)
                      .base_stat,
              },
          ]
        : [],
    types: pokemon?.types ?? [],
    abilities: pokemon?.abilities ?? [],
});

export default sanitizePokemon;
