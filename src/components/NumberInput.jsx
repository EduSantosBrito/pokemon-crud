import React from 'react';
import PropTypes from 'prop-types';
import chevron from '../assets/images/chevronDownBlack.png';

const NumberInput = ({
    className,
    label,
    placeholder,
    name,
    suffix,
    value,
    onChange,
    setFieldValue,
    onBlur,
}) => (
    <div className={`${className} input__container`}>
        {label && (
            <label htmlFor="number-input" className="input__label">
                {label}
            </label>
        )}
        <div className="input__number">
            <input
                onBlur={onBlur}
                id="number-input"
                className="input"
                type="number"
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
            />
            {suffix && <p className="input__suffix">{suffix}</p>}
            <div className="input__btns">
                <button
                    type="button"
                    onClick={() => setFieldValue && setFieldValue(name, value + 1)}
                >
                    <img src={chevron} className="input__increase" alt="Mais" />
                </button>
                <button
                    type="button"
                    onClick={() => setFieldValue && setFieldValue(name, value - 1)}
                >
                    <img src={chevron} className="input__decrease" alt="Menos" />
                </button>
            </div>
        </div>
    </div>
);

NumberInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    suffix: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
    setFieldValue: PropTypes.func,
    onBlur: PropTypes.func,
};

NumberInput.defaultProps = {
    className: '',
    label: null,
    suffix: null,
    value: undefined,
    onChange: undefined,
    setFieldValue: undefined,
    onBlur: undefined,
};

export default NumberInput;
