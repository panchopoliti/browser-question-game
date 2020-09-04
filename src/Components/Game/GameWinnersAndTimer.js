import React from 'react';
import Timer from './Timer.js'
import PropTypes from 'prop-types';
import styles from './css/GameWinnersAndTimer.module.scss';
import TrophySVG from '../../static/Icons/trophy-solid.svg';

export default function GameWinnersAndTimer({ timerSettings, gameWinners }) {

    const { typeOfEndOfGame, winners} = gameWinners || {};

    const winningText = getWinningText(gameWinners);
    const typeOfWinnerStyle = (typeOfEndOfGame === 'Win') ? `${styles[`onlyWinner-${winners[0].id + 1}`]}` : styles.tie;

    return (
        <React.Fragment>
            <Timer {...timerSettings}/>
            <div className={`${styles.container} ${(gameWinners) ? '' : styles.hide}`}>
                <div className={`${styles.winnersContainers} ${typeOfWinnerStyle}`}>
                    <figure>
                        <img src={TrophySVG} alt='Trophy Logo' height='40' width='40' />
                    </figure>
                    <h2 className={styles.text}>{winningText}</h2>
                </div>
            </div>
        </React.Fragment>
    )
}

GameWinnersAndTimer.propTypes = {
    timerSettings: PropTypes.object,
    gameWinners: PropTypes.shape({
        typeOfEndOfGame: PropTypes.string,
        winners: PropTypes.array,
    }),
};

function getWinningText(gameWinners) {

    if (!gameWinners) return '';

    const { typeOfEndOfGame, winners } = gameWinners;
    let winningText;

    if (typeOfEndOfGame === 'Win') {

        winningText = `The Winner is ${winners[0].name}`;

    } else {

        const winnersClone = winners.slice();

        const lastWinner = winnersClone.pop().name;
        const players = winnersClone.map((player) => player.name).join(', ');

        winningText = `There was a tie between ${players} and ${lastWinner}`;
    }

    return winningText;
}