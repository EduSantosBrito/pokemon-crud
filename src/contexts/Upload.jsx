import React, { createContext, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

export const UploadContext = createContext({
    image: null,
    saveImage: () => {},
    deleteImage: () => {},
});

const UploadProvider = ({ children }) => {
    const [image, setImage] = useState(null);

    const saveImage = useCallback(file => {
        const url = URL.createObjectURL(file);
        setImage(url);
    }, []);

    const deleteImage = useCallback(() => {
        setImage(null);
    }, []);

    const value = useMemo(() => ({ image, saveImage, deleteImage }), [
        image,
        saveImage,
        deleteImage,
    ]);

    return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
};

UploadProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UploadProvider;
