import { useState } from 'react';
import { chooseNextIdQuestion, getWinners } from '../functions/question-functions.js';

export function useCounterOfCorrectAnswers(playersNames) {

    function initializeCounter(playersNames) {

      const playersStatusInGame = [];

      for (let i = 0; i < playersNames.length; i++) {

        const playerStatus = {
          id: playersNames[i].id,
          name: playersNames[i].name,
          correct: 0,
        };

        playersStatusInGame.push(playerStatus);
      }

      return playersStatusInGame;
    }

    const playersStatusInGame = initializeCounter(playersNames);

    const [counter, setCounter] = useState(playersStatusInGame);

    function updateCounter(playerId, statusOfAnswer) {

        if (!statusOfAnswer) return;
          const counterClone = counter.slice();

          counterClone[playerId].correct++;
          setCounter(counterClone);

        return;
    }

    function resetCounter(playersNames) {

      const playersStatusInGame = initializeCounter(playersNames);

      setCounter(playersStatusInGame);

    }

    return {
        counter,
        updateCounter,
        resetCounter,
    }
}

export function useAnswerStatus() {

    const [answerStatus, setStatus] = useState('No Status');
  
    function setAnswerStatus(isCorrect) {
      
      switch (isCorrect) {
        case null:
          return setStatus('Time Over');
        case true:
          return setStatus('Correct');
        case false:
          return setStatus('Incorrect');
        default:
          return setStatus('No Status');
      };
    }
  
    return {
      answerStatus,
      setAnswerStatus,
    }
}

export function usePlayerTurn(initialValue, playersNames) {

    const [ playerNumberTurn, setPlayerNumberTurn] = useState(initialValue);
    
    const playerId = (playerNumberTurn !== -1) ? playersNames[playerNumberTurn].id : playerNumberTurn;
    const playerName = (playerNumberTurn !== -1) ? playersNames[playerNumberTurn].name : '';
  
    function setPlayerTurn (numberOfPlayers, finishedGame = false) {

      if (finishedGame) return setPlayerNumberTurn(-1)
  
      if (playerNumberTurn === numberOfPlayers - 1) {
  
        setPlayerNumberTurn(0) 
        return;
  
      }
  
     return setPlayerNumberTurn(playerNumberTurn + 1);
  
    }

    function restartTurnCounter() {
      return setPlayerNumberTurn(initialValue);
    }
  
    return {
      id: playerId,
      name: playerName,
      setPlayerTurn,
      restartTurnCounter,
    }
}

export function useModalState(initialValue) {

    const [modalState, setModalState] = useState(initialValue);
  
    function handleModal() {
      setModalState(!modalState);
    }
  
    return {
      modalState,
      handleModal,
    };
}

export function useHookWithValueAndHandler(initialValue) {
    const [value, setValue] = useState(initialValue);

    const setValueHandler = (value) => {
      setValue(value);

      return value;
    }

    return {
      value,
      handler: setValueHandler,
    }
}

export function useQuestionIds(initialId) {

  const [ currId, setCurrId] = useState(initialId);
  const [ usedQuestionsIds, setUsedQuestionIds] = useState([]);
  const usedIds = usedQuestionsIds.slice();

  function setCurrentId(difficulty) {
    const currId = chooseNextIdQuestion(usedIds, difficulty);

    setCurrId(currId);
  }
  
  function setUsedIds() {
    usedIds.push(currId);
    setUsedQuestionIds(usedIds);

    return usedIds;
  }

  const resetAlreadyUsedQuestions = () => setUsedQuestionIds([]);

  return {
    current: currId,
    alreadyUsed: usedQuestionsIds,
    setCurrent: setCurrentId,
    setAlreadyUsed: setUsedIds,
    resetAlreadyUsed: resetAlreadyUsedQuestions,
  }
}

export function useGameWinners() {

  const [ gameWinners, setWinners ] = useState(null);

  function setGameWinners(counter) {
    const winners = getWinners(counter);

    setWinners(winners);
  }

  const restartWinnersGame = () => setWinners(null);

  return {
    gameWinners,
    setGameWinners,
    restartWinnersGame,
  }
}