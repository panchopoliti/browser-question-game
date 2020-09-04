import React from 'react';
import PropTypes from 'prop-types';
import { Cog } from '../Icons/';
import { Button } from '../Generic';
import styles from './css/BelowAnswersContainer.module.scss';

export default function BelowAnswersContainer({ handleModal, isGameStarted, restartGame }) {
    return (
        <div className={styles.container}>
            <div className={styles.startAgainContainer}>
                {!isGameStarted && <Button className={styles.startButton} onClick={() => restartGame()} text='Start Again' />}
            </div>
            <div className={styles.settingsContainer}>
                <button className={styles.iconBtn} onClick={handleModal}>
                    <figure>
                        <Cog height={20} width={20} color='#fff'/>
                    </figure>
                </button>
            </div>
        </div>
    );
}

BelowAnswersContainer.propTypes = {
    handleModal: PropTypes.func,
    isGameStarted: PropTypes.bool,
    restartGame: PropTypes.func,
}