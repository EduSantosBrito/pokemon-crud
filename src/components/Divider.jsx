import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ title }) => (
    <div className="divider">
        <h2>{title}</h2>
    </div>
);

Divider.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Divider;
