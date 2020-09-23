import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, disabled, type, icon, onClick, className }) => (
    <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={`btn btn--${text ? 'text' : 'icon'} ${className}`}
    >
        {text || icon}
    </button>
);

const checkRequiredProps = ({ icon, text }, _, componentName) => {
    if (!icon && !text) {
        return new Error(
            `One of props 'icon' or 'text' need to be specified in component ${componentName}`,
        );
    }
    if (text) {
        PropTypes.checkPropTypes({ text: PropTypes.string }, { text }, 'prop', componentName);
    }
    if (icon) {
        PropTypes.checkPropTypes({ icon: PropTypes.node }, { icon }, 'prop', componentName);
    }
    return null;
};

Button.propTypes = {
    text: checkRequiredProps,
    icon: checkRequiredProps,
    onClick: PropTypes.func,
    className: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    text: null,
    icon: null,
    onClick: () => {},
    className: '',
    type: 'button',
    disabled: false,
};

export default Button;
