import React, { useRef, useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/images/close.png';
import camera from '../assets/images/camera.png';
import plus from '../assets/images/plus.png';
import { isImage } from '../utils';
import { UploadContext } from '../contexts/Upload';

const Modal = ({ image, children, open, close }) => {
    const uploadInputRef = useRef(null);
    const [error, setError] = useState(null);
    const { image: uploadedImage, saveImage, deleteImage } = useContext(UploadContext);

    const handleChange = useCallback(
        event => {
            setError(null);
            const file = event.target.files[0];
            if (file) {
                if (!isImage(file)) {
                    setError('Só é possível fazer upload de imagens');
                    return;
                }
                saveImage(file);
            }
        },
        [saveImage],
    );

    if (!open) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal__content">
                <button
                    className="modal__close"
                    type="button"
                    onClick={() => {
                        deleteImage();
                        close();
                    }}
                >
                    <img src={closeIcon} alt="Fechar" />
                </button>
                <div className="modal__content__children">{children}</div>
                {image?.src || uploadedImage ? (
                    <div className="modal__image">
                        <img
                            src={image.src || uploadedImage}
                            alt={image.alt || 'Imagem relativa ao pokémon'}
                        />
                    </div>
                ) : (
                    <div className="modal__image modal__image--upload">
                        <button type="button" onClick={() => uploadInputRef.current.click()}>
                            <img src={camera} alt="Imagem de uma câmera" />
                            <div>
                                <img src={plus} alt="+" />
                            </div>
                        </button>
                        <input
                            type="file"
                            id="upload-input"
                            ref={uploadInputRef}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                )}
                {error && (
                    <label className="modal__error" htmlFor="upload-input">
                        {error}
                    </label>
                )}
            </div>
        </div>
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    image: PropTypes.shape({ src: PropTypes.string, alt: PropTypes.string }),
};

Modal.defaultProps = {
    image: null,
};

export default Modal;
