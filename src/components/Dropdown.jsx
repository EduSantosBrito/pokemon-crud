import React from 'react';
import PropTypes from 'prop-types';
import chevron from '../assets/images/chevronDownBlack.png';

const Dropdown = ({ options, value, onChange, name, placeholder }) => (
    <div className="dropdown__container">
        <img src={chevron} className="dropdown__icon" alt="Chevron" />
        <select name={name} onChange={onChange} value={value} className="dropdown">
            <option className="dropdown__option" value="">
                {placeholder}
            </option>
            {options &&
                options.map(option => (
                    <option key={option.value} className="dropdown__option" value={option.value}>
                        {option.text}
                    </option>
                ))}
        </select>
    </div>
);

Dropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({ text: PropTypes.string, value: PropTypes.string }),
    ),
    name: PropTypes.string,
    value: PropTypes.shape({ text: PropTypes.string, value: PropTypes.string }),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
    options: [],
    value: null,
    name: null,
    onChange: undefined,
    placeholder: '',
};

export default Dropdown;
