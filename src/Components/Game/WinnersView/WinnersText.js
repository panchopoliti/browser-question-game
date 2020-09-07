import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/WinnersText.module.scss'

export default function WinnersText({ gameWinners = {} }) {

    const { typeOfEndOfGame, winners = [] } = gameWinners || {};

    const className = styles.text;

    const playersWinning = winners.map((winner, i) => {

        const className = `${styles[`text-${winner.id + 1}`]}`;

        const withComma = (winners.length > 2 && i !== winners.length - 1);

        return (
            <React.Fragment key={winner.id}>
                <span className={className}>{winner.name}</span>
                { withComma && <span>,&nbsp;</span>}
            </React.Fragment>
        )
    })

    if (typeOfEndOfGame === 'Win') {

        const onlyWinner = playersWinning[0];

        return <h2 className={className}>The Winner is {onlyWinner}</h2>;            

    } else {

        const lastWinner = playersWinning.pop();
        const restOfPlayers = playersWinning;

        return <h2 className={className}>
            There was a tie between {restOfPlayers} and {lastWinner}
            </h2>;            
    }
}

WinnersText.propTypes = {
    gameWinners: PropTypes.shape({
        typeOfEndOfGame: PropTypes.string,
        winners: PropTypes.array,
    })
}