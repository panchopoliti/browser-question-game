import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  QuestionText, 
  OptionsInQuestion, 
  GameWinnersAndTimer, 
  AnswerStatus, 
  PlayersNav, 
  PlayersNavMobile, 
  BelowAnswersContainer,
  MobileSideNavBar,
} from './Components/Game';
import { GameSettingsModal } from './Components/Modals';
import { chooseNextIdQuestion, isGameFinished, handleNextQuestion, createPlayers } from './functions/question-functions.js';
import { listOfQuestions } from './Questions/questions.js';
import styles from './css/Game.module.scss';
import {
  useModalState,
  useAnswerStatus,
  useQuestionIds,
  usePlayerTurn,
  useCounterOfCorrectAnswers,
  useGameWinners,
} from './Hooks/game-hooks.js';
import { NUMBER_OF_QUESTIONS_PER_PLAYER, SECONDS_PER_QUESTION_WITH_TIMER } from './constants.js';

export default function Game({ fields: settingFields, isGameStarted, setStartGame, playersNames: nameOfPlayers }) {

  const { value: numberOfPlayers, handler: setNumberOfPlayers } = settingFields.find((field) => field.id === 'numberOfPlayers');
  const { value: difficulty } = settingFields.find((field) => field.id === 'difficulty');
  const { value: playWithTimer } = settingFields.find((field) => field.id === 'playWithTimer');
  const { handler: setPlayerNames } = nameOfPlayers;

  const playersNames = setPlayerNames(numberOfPlayers);

  const initialQuestionId = chooseNextIdQuestion([], difficulty);

  const { modalState, handleModal } = useModalState(false);
  const questionsIds = useQuestionIds(initialQuestionId);
  const playerTurn = usePlayerTurn(0, playersNames);
  const counterOfCorrectAnswers = useCounterOfCorrectAnswers(playersNames);
  const { answerStatus, setAnswerStatus } = useAnswerStatus();
  const [ansStatusVisibility, setAnsStatusVisibility] = useState(false)
  const [startTimer, setStartTimer] = useState(playWithTimer);
  const { gameWinners, setGameWinners, restartWinnersGame } = useGameWinners();

  const players = createPlayers(playersNames, counterOfCorrectAnswers, playerTurn, gameWinners);

  function afterPlayerAnswered(isCorrect) {

    if (isCorrect) counterOfCorrectAnswers.updateCounter(playerTurn.id, isCorrect);

    setAnswerStatus(isCorrect);
    setAnsStatusVisibility(true);

    if (playWithTimer) setStartTimer(false);

  }

  function whenGameisFinished() {

    setStartGame(false);
    playerTurn.setPlayerTurn(numberOfPlayers, true);
    setGameWinners(counterOfCorrectAnswers.counter);
    setAnsStatusVisibility(false);

  }

  function setNextQuestion() {

    questionsIds.setCurrent(difficulty);
    setAnsStatusVisibility(false);
    playerTurn.setPlayerTurn(numberOfPlayers);

    if (playWithTimer) setStartTimer(true);

  }

  function restartGame(newState = {
    difficulty,
    playWithTimer,
    numberOfPlayers,
  }) {

    const newPlayers = setPlayerNames(+newState.numberOfPlayers)

    restartWinnersGame();
    counterOfCorrectAnswers.resetCounter(newPlayers);
    questionsIds.resetAlreadyUsed();
    playerTurn.restartTurnCounter();
    setStartTimer(false)
    setNumberOfPlayers(+newState.numberOfPlayers);

    setStartGame(true);
    questionsIds.setCurrent(newState.difficulty);

    setStartTimer(newState.playWithTimer);

  }

  const nextQuestionParams = [
    playersNames.length,
    () => questionsIds.setAlreadyUsed(),
    afterPlayerAnswered,
    whenGameisFinished,
    setNextQuestion,
  ];

  const onOptionClick = (isCorrect) => handleNextQuestion(...nextQuestionParams, isCorrect);

  const handlerForTimeOver = () => handleNextQuestion(...nextQuestionParams);

  const { question: questionText, answers, correct: correctOption } = listOfQuestions[questionsIds.current];

  const modalProps = {
    handleModal,
    restartGame,
    isGameStarted,
    fields: settingFields,
    modalSettings: {
      modalState,
      closeModal: handleModal,
    },
  };

  const timerSettings = {
    initialValue: SECONDS_PER_QUESTION_WITH_TIMER,
    startTimer,
    handlerForTimeOver,
  };

  const isGameOver = isGameFinished(playersNames.length, NUMBER_OF_QUESTIONS_PER_PLAYER, questionsIds.alreadyUsed.length);

  return (
    <div className={styles.mainContainer}>
      <div onClick={handleModal} className={`${styles.overlay} ${(modalState) ? styles.showOverlay : ''}`}></div>
      <main className={styles.gameContainer}>
        <GameSettingsModal {...modalProps} />
        <div className={styles.mobile}>
          <MobileSideNavBar playerTurn={playerTurn}/>
          <PlayersNavMobile players={players}/>
        </div>
        <div className={styles.notMobile}>
          <PlayersNav players={players} />
        </div>
        <GameWinnersAndTimer
          timerSettings={timerSettings}
          gameWinners={gameWinners}
        />
        <div className={styles.questionsAndAnswersContainer}>
            <QuestionText text={questionText} />
            <OptionsInQuestion
              options={answers}
              correctOption={correctOption}
              onClick={onOptionClick}
              isGameFinished={isGameOver}
            />
        </div>
        <AnswerStatus status={answerStatus} visibility={ansStatusVisibility} />
        <BelowAnswersContainer handleModal={handleModal} isGameStarted={isGameStarted} restartGame={restartGame}/>
      </main>
    </div>
  );
}

Game.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      handler: PropTypes.func,
    }),
  ),
  isGameStarted: PropTypes.bool,
  setStartGame: PropTypes.func,
}
