import { 
      getRandomInt,
      deleteDuplicates, 
      getIdOfHigherNumberOfArray, 
} from './general-functions.js';
import { listOfQuestions } from '../Questions/questions.js';
import { MILISECONDS_BETWEEN_QUESTIONS, NUMBER_OF_QUESTIONS_PER_PLAYER } from '../constants.js';

export function createPlayers(playersNames, counterOfCorrectAnswers, playerTurn, gameWinners) {

      const players = playersNames.map((player, i) => {
  
        let winner = -1;
        
        if (gameWinners) {
  
          const arrOfIdWinners = gameWinners.winners.map((winner) => winner.id);
          winner = arrOfIdWinners.indexOf(player.id);
        }
    
        return {
          id: player.id,
          name: player.name,
          correct: (counterOfCorrectAnswers.counter[i]) ? counterOfCorrectAnswers.counter[i].correct: 0,
          turn: (playerTurn.id === i),
          winner: (winner === -1) ? false : true,
        };
    
      });
    
      return players;
    
}

export function chooseNextIdQuestion(usedIds = [], difficulty) {
      let nextId;

      const arrayOfIds = getQuestionsIdsByDifficulties(difficulty);

      do {

            const randomNumber = getRandomInt(arrayOfIds.length - 1);
            nextId = arrayOfIds[randomNumber];

      } while (usedIds.includes(nextId));
      
      return nextId;

}

export function handleNextQuestion(
      numOfPlayers,
      setUsedIds,
      afterPlayerAnswered,
      whenGameisFinished,
      setNextQuestion,
      isCorrect = null
) {

      afterPlayerAnswered(isCorrect);

      const getUsedIdsLength = new Promise((resolve) => {
            const getUsedIds = setUsedIds();

            resolve(getUsedIds.length);
      });
      
      getUsedIdsLength.then((getUsedIdsLength) => {

            if (isGameFinished(NUMBER_OF_QUESTIONS_PER_PLAYER, numOfPlayers, getUsedIdsLength)) {

                  return window.setTimeout(() => {

                        whenGameisFinished();
                  }, MILISECONDS_BETWEEN_QUESTIONS); 

            }

            window.setTimeout(() => {

                  setNextQuestion();
            }, MILISECONDS_BETWEEN_QUESTIONS);
            
      });


}

export function isGameFinished(numOfQuestionsPerPlayer, numOfPlayers, numOfDoneQuestions) {
      
      return (numOfQuestionsPerPlayer * numOfPlayers === numOfDoneQuestions);
}

export function getWinners(counterOfCorrectAnswers) {

      const correctAnswers = counterOfCorrectAnswers.map((player) => player.correct);
      const arrOfIds = getIdOfHigherNumberOfArray(correctAnswers);

      const typeOfEndOfGame = (arrOfIds.length === 1) ? 'Win': 'Tie';

      const arrOfWinners = arrOfIds.map((id) => {
            return counterOfCorrectAnswers[id];
      });
      
      return {
            typeOfEndOfGame,
            winners: arrOfWinners,
      }
}

export function getQuestionsIdsByDifficulties(difficulty) {

      return listOfQuestions.filter((question) => question.difficulty === difficulty)
      .map((question) => question.id);

}

export function getDifficulties() {

      const allQuestionDifficulties = listOfQuestions.map((question) => {
            return question.difficulty;
      });

      const arrayOfDifficultes = deleteDuplicates(allQuestionDifficulties);
      arrayOfDifficultes.sort();

      return arrayOfDifficultes;
      
}