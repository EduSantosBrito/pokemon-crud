import React from 'react';
import { useHistory } from 'react-router-dom';
import pokemonLogo from '../../assets/images/pokemonLogo.png';
import Button from '../../components/Button';

const HomePage = () => {
    const history = useHistory();

    return (
        <div className="home">
            <img
                className="home__logo"
                src={pokemonLogo}
                alt="Logo do jogo Pokémon nas as cores azul e amarelo"
            />
            <Button className="home__button" onClick={() => history.push('/map')} text="start" />
        </div>
    );
};

export default HomePage;
