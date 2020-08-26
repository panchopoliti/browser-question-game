import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PlayersNav } from '../Game';
import { Button } from '../Generic';
import chevronDown from '../../static/Icons/chevron-down-solid.svg';
import chevronUp from '../../static/Icons/chevron-up-solid.svg';
import styles from './css/PlayersNavMobile.module.scss';

export default function PlayersNavMobile ({ players }) {

    const [showPlayersNav, setShowPlayersNav] = useState(false);

    return (
        <div className={styles.container}>
            <div className={(showPlayersNav) ? '' : styles.hide}>
                <PlayersNav players={players}/>
            </div>
            <Button 
                text={(showPlayersNav) ? 'Hide Stats' : 'Show Stats'} 
                className={styles.button} 
                onClick={() => setShowPlayersNav(!showPlayersNav)}
            >
                { !showPlayersNav && 
                    <figure>
                        <img src={chevronDown} alt='Stats Opening' height='12' width='12' />
                    </figure>
                }
                { showPlayersNav &&
                    <figure>
                        <img src={chevronUp} alt='Stats Closing' height='12' width='12' />
                    </figure>   
                }
            </Button>
        </div>
    );
}

PlayersNavMobile.propTypes = {
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