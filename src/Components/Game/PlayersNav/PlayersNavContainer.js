import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PlayersNav } from './index.js';
import { Button } from '../../Generic';
import { ChevronUp } from '../../Icons';
import styles from './css/PlayersNavContainer.module.scss';

export default function PlayersNavContainer({ players }) {

    const [showPlayersNav, setShowPlayersNav] = useState(false);

    const rotateChevron = (!showPlayersNav);

    return (
        <div className={styles.container}>
            <div className={styles.mobile}>
                <div className={(showPlayersNav) ? '' : styles.hide}>
                    <PlayersNav players={players}/>
                </div>
                <Button 
                    text={(showPlayersNav) ? 'Hide Stats' : 'Show Stats'} 
                    className={styles.button} 
                    onClick={() => setShowPlayersNav(!showPlayersNav)}
                >
                    <ChevronUp className={(rotateChevron) ? styles.rotateChevron : ''} height={12} width={12} color='#fff'/>
                </Button>
            </div>
            <div className={styles.desktop}>
                <PlayersNav players={players}/>
            </div>
        </div>
    );
}

PlayersNavContainer.propTypes = {
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