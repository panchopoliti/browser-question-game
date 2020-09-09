import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/QuestionText.module.scss';
import { isLongTextQuestion } from '../../../functions/question-functions.js';
 
export default function QuestionText({ text }) {

    const isLongQuestion = isLongTextQuestion(text);

    const classForShortHeightDevices = (isLongQuestion) ? styles.smallQuestion : '';

    return (
        <div className={`${styles.bubble} ${styles.bubbleBottomLeft}`}>
            <h2 className={`${classForShortHeightDevices} ${styles.text}`}>{text}</h2>
        </div>
    )
}

QuestionText.propTypes = {
    text: PropTypes.string,
}