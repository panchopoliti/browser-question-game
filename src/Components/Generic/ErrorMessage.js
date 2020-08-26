import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/ErrorMessage.module.scss';

export default function ErrorMessage({ text, id, show }) {

    return (
        <div className={styles.container}>
            <label
                className={`${styles.error} ${(show) ? '' : styles.hide}`}
                id={`${id}-error`}
            >
                {text}
            </label>
        </div>
    )
}

ErrorMessage.propTypes = {
    text: PropTypes.string,
    id: PropTypes.string,
    show: PropTypes.bool,
}