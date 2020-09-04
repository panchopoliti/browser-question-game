import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './css/OptionsInQuestion.module.scss';
import { MILISECONDS_BETWEEN_QUESTIONS } from '../../constants.js';
import { Button } from '../Generic';

export default function OptionsInQuestion({ options, onClick, correctOption, isGameFinished }) {
 
    const [btnClicked, setBtnClicked] = useState(false);
    const [targetBtnText, setTargetBtn] = useState(null);
    const [startRightAnimation, setStartRightAnimation] = useState(false);
    const [startLeftAnimation, setStartLeftAnimation] = useState(true);

    const listOfOptions = options.map((text, i) => {

        const upperCaseText = text.toUpperCase()

        const isTheCorrectOption = (correctOption === i);

        const onButtonClick = (ev) => {

            if (btnClicked || isGameFinished) return;

            setBtnClicked(true);
            setTargetBtn(ev.target.innerText);
            onClick(isTheCorrectOption);
            setAnimations(setStartLeftAnimation, setStartRightAnimation);
            window.setTimeout(() => setBtnClicked(false), MILISECONDS_BETWEEN_QUESTIONS);
        };

        if (startLeftAnimation) {
            window.setTimeout(() => setStartLeftAnimation(false), 300);
        }

        const btnClassName = (btnClicked && isTheCorrectOption) ? styles.correct :
            (btnClicked && !isTheCorrectOption && targetBtnText === upperCaseText) ? styles.incorrect : '';

        const animation = `${(startRightAnimation) ? styles.animateToRight : ''}
            ${(startLeftAnimation) ? styles.animateFromLeft : ''}`;

        return (
            <li key={i} className={styles.option}>
                <Button text={upperCaseText} className={`${styles.button} ${btnClassName} ${animation}`} onClick={onButtonClick}/>
            </li>
        )   
    })

    return (
        <ul className={styles.listContainer}>
            {listOfOptions}
        </ul>
    )
}

function setAnimations(leftAnimationHandler, rightAnimatinoHandler) {
    window.setTimeout(() => {
        rightAnimatinoHandler(true);
    }, MILISECONDS_BETWEEN_QUESTIONS - 1000);

    window.setTimeout(() => {
        rightAnimatinoHandler(false);
        leftAnimationHandler(true);
    }, MILISECONDS_BETWEEN_QUESTIONS);
}
 
OptionsInQuestion.propTypes = {
    onClick: PropTypes.func,
    options: PropTypes.array,
    correctOption: PropTypes.number,
    isGameFinished: PropTypes.bool,
};