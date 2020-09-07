import React from 'react';
import PropTypes from 'prop-types';
import { Cog } from '../../Icons/';
import { Button } from '../../Generic';
import styles from './css/BelowAnswersContainer.module.scss';
import AnswerStatus from './AnswerStatus';

export default function BelowAnswersContainer({ handleModal, isGameStarted, restartGame, ansStatusProps }) {

    const centerContainer = isGameStarted ? 
        <AnswerStatus {...ansStatusProps}/> : 
        <Button className={styles.startButton} onClick={() => restartGame()} text='Start Again' />;

    return (
        <div className={styles.container}>
            <div className={styles.centerContainer}>
                {centerContainer}
            </div>
            <div className={styles.settingsContainer}>
                <button className={styles.iconBtn} onClick={handleModal}>
                    <Cog height={20} width={20} color='#fff'/>
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