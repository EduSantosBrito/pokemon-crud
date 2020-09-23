import React from 'react';
import Sidebar from '../../components/Sidebar';
import PokemonProvider from '../../contexts/Pokemon';
import UploadProvider from '../../contexts/Upload';
import Character from '../../components/Character';
import Capture from '../../components/Capture';

const MapPage = () => (
    <PokemonProvider>
        <UploadProvider>
            <div className="map">
                <Sidebar />
                <Character />
                <Capture />
            </div>
        </UploadProvider>
    </PokemonProvider>
);

export default MapPage;
