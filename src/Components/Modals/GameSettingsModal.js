import React from 'react';
import { Modal } from './index.js';
import { Button } from '../Generic';
import PropTypes from 'prop-types';
import { GameSettings } from '../Game/';
import styles from './css/GameSettingsModal.module.scss';

export default function GameSettingsModal({ 
    handleModal,
    fields,
    modalSettings,
    restartGame,
    isGameStarted,
}) {

    const onSuccessButtonHandler = (newState) => {
        handleModal();
        
        if (newState) restartGame(newState);
    }

    return (
        <Modal
            title='Game Settings'
            aria-describedby='gameSettings'
            {... modalSettings}    
        >
            <GameSettings
                containerId='gameSettings'
                isGameStarted={isGameStarted}
                fields={fields}
                successButtonHandler={onSuccessButtonHandler}
                cancelButton={
                    <Button 
                        text={'Cancel'} 
                        className={styles.alert} 
                        onClick={handleModal}
                    /> 
                }
                />
        </Modal>
    )
}

GameSettingsModal.propTypes = {
    fields: PropTypes.array,
    restartGame: PropTypes.func,
    handleModal: PropTypes.func,
    isGameStarted: PropTypes.bool,
    modalSettings: PropTypes.shape({
        modalState: PropTypes.bool.isRequired,
        modalValidation: PropTypes.bool,
        closeModal: PropTypes.func,
        stopKeyEventPropagation: PropTypes.bool,
    }),
}