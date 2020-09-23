import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ className, label, onBlur, placeholder, name, value, onChange, disabled }) => (
    <div className={`${className} input__container`}>
        {label && (
            <label htmlFor="text-input" className="input__label">
                {label}
            </label>
        )}
        <input
            onBlur={onBlur}
            disabled={disabled}
            id="text-input"
            className="input"
            type="text"
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
        />
    </div>
);

TextInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    onBlur: PropTypes.func,
};

TextInput.defaultProps = {
    className: '',
    label: null,
    name: null,
    placeholder: null,
    value: undefined,
    onChange: undefined,
    disabled: false,
    onBlur: undefined,
};

export default TextInput;
