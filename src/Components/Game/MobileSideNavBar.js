import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/MobileSideNavBar.module.scss';

export default function MobileSideNavBar({ playerTurn }) {
    const { name, id } = playerTurn

    return (
        <div className={styles.sideNav}>
            <div className={`${styles.playerNameContainer} ${styles[`playerNameContainer${id + 1}`]}`}>
                <h3 className={styles.playerName}>{name}</h3>
                <h4 className={styles.subtitle}>should play</h4>
            </div>
        </div>
    )
}

MobileSideNavBar.propTypes = {
    playerTurn: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }),
}