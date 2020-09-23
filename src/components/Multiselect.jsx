import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import chevronDownBlack from '../assets/images/chevronDownBlack.png';
import closeIcon from '../assets/images/closeIcon.png';

const Multiselect = ({ id, name, options, placeholder, value: selectedOptions, onChange }) => {
    const [open, setOpen] = useState(false);

    const handleOptionClick = useCallback(
        option => {
            if (selectedOptions.find(selectedOption => selectedOption.value === option.value)) {
                onChange(
                    name,
                    selectedOptions.filter(selectedOption => selectedOption.value !== option.value),
                );
            } else {
                onChange(name, [...selectedOptions, option]);
            }
        },
        [selectedOptions, onChange, name],
    );

    const handleCloseChip = useCallback(
        (event, option) => {
            event.stopPropagation();
            onChange(
                name,
                selectedOptions.filter(selectedOption => selectedOption.value !== option.value),
            );
        },
        [onChange, name, selectedOptions],
    );

    const handleOnKeyDown = useCallback(
        event => {
            if (event.key === 'Spacebar') {
                setOpen(!open);
            }
        },
        [open],
    );

    return (
        <div id={id} name={name} className="multiselect">
            <div className="multiselect__input">
                <div
                    onKeyDown={handleOnKeyDown}
                    tabIndex={0}
                    role="button"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    <div className="multiselect__input--selected">
                        {selectedOptions.length ? (
                            selectedOptions.map(option => (
                                <div className="multiselect__chip" key={option.text}>
                                    <p>{option.text}</p>
                                    <button type="button" onClick={e => handleCloseChip(e, option)}>
                                        <img src={closeIcon} alt="x" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="multiselect__label">{placeholder}</p>
                        )}
                    </div>
                    <div className={`multiselect__icon ${open ? 'open' : ''}`}>
                        <img src={chevronDownBlack} alt="Abrir" />
                    </div>
                </div>
            </div>
            {open && (
                <div className="multiselect__options">
                    {options.map(option => (
                        <button
                            key={option.text}
                            className={`multiselect__options-item ${
                                selectedOptions.find(
                                    selectedOption => selectedOption.value === option.value,
                                )
                                    ? 'selected'
                                    : ''
                            }`}
                            type="button"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

Multiselect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string, value: PropTypes.string }))
        .isRequired,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string, value: PropTypes.string }))
        .isRequired,
    onChange: PropTypes.func.isRequired,
};

Multiselect.defaultProps = {
    placeholder: '',
    id: undefined,
    name: undefined,
};

export default Multiselect;
