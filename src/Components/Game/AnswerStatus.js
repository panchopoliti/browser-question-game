import React from 'react';
import PropTypes from 'prop-types';
import { pascalCaseToCamelCase } from '../../functions/general-functions.js';
import styles from './css/AnswerStatus.module.scss';

export default function AnswerStatus({ status, visibility }) {

    const answerStatusToCamelCase = pascalCaseToCamelCase(status);
    const answerStatusClassName = `${styles.status}  ${styles[answerStatusToCamelCase]}
        ${(visibility) ? '' : styles.hide}`;

    return (
        <p className={answerStatusClassName} >{status}</p>
    );
}

AnswerStatus.propTypes = {
    status: PropTypes.string,
    visibility: PropTypes.bool,
}