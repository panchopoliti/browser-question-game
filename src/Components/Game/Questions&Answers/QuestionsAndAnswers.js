import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/QuestionsAndAnswers.module.scss';
import { Timer } from '../index.js'
import { QuestionText, OptionsInQuestion } from './index.js';

export default function QuestionsAndAnswers({ startTimer, handlerForTimeOver, questionText, optionsInQuestionProps}) {
    return (
        <div>
              {startTimer && <Timer handlerForTimeOver={handlerForTimeOver}/>}
              <div className={styles.container}>
                  <QuestionText text={questionText}/>
                  <OptionsInQuestion {...optionsInQuestionProps} />
              </div> 
        </div>
    )
}

QuestionsAndAnswers.propTypes = {
    startTimer: PropTypes.bool,
    handlerForTimeOver: PropTypes.func,
    questionText: PropTypes.string,
    optionsInQuestionProps: PropTypes.shape({
        onClick: PropTypes.func,
        options: PropTypes.array,
        correctOption: PropTypes.number,
        isGameFinished: PropTypes.bool,
    })
}