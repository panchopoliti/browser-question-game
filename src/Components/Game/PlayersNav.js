import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/PlayersNav.module.scss';

export default function PlayersNav({ players }) {

    const nav = players.map((player, i) => {

        return (
            <li key={i} className={styles.navItem}>
                <div className={`${styles[`nameContainer${i + 1}`]} ${styles.nameContainer}`}>
                    <p className={styles.name}>{player.name}</p>
                    <p className={(player.turn) ? styles.yourTurn : styles.hide}>It's your turn</p>
                </div>
                <div className={styles.tooltip}>Correct: {player.correct}</div>
            </li>
        )
    })

    return (
        <ul className={styles.listContainer}>
            {nav}
        </ul>
    )
}

PlayersNav.propTypes = {
    players: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.name,
            correct: PropTypes.number,
            turn: PropTypes.bool,
            winner: PropTypes.bool,
        }),
    ),
}