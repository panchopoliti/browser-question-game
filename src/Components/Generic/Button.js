import React from 'react';
import PropTypes from 'prop-types';


export default function Button({ onClick, text, children, className }) {
    
    return (
    <button onClick={onClick} className={className}>
        {children}
        {text}
    </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    className: PropTypes.string,
};