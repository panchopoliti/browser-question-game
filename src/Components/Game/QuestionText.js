import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/QuestionText.module.scss';

export default function QuestionText({ text }) {
    return (
        <div className={`${styles.bubble} ${styles.bubbleBottomLeft}`}>
            <h2 className={styles.text}>{text}</h2>
        </div>
    )
}

QuestionText.propTypes = {
    text: PropTypes.string,
}