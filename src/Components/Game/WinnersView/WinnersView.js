import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './css/WinnersView.module.scss';
import { Trophy } from '../../Icons';
import { WinnersText, Medals } from './index.js';
import { Confetti } from '../../Animations';
import { TriumphJingle } from '../../Jingles';


export default function WinnersView({ gameWinners, isGameFinished }) {

    const [ startAnimation, setStartAnimation ] = useState(false);

    const { typeOfEndOfGame, winners = []} = gameWinners || {};

    const icon = (typeOfEndOfGame === 'Win') 
        ? <Trophy className={styles.icon} width={100} height={100}/>
        : <Medals medalClassName={styles.icon} numOfWinners={winners.length}/>;
    
    useEffect(() => {

        if (isGameFinished) {
            
            setStartAnimation(true)
            window.setTimeout(() => setStartAnimation(false), 3000);
        }

    }, [isGameFinished])
    
    return (
        <React.Fragment>
            <TriumphJingle play={isGameFinished}/>
            {startAnimation && <Confetti startAnimation={isGameFinished}/>}
            <div className={`${styles.container} ${(gameWinners) ? '' : styles.hide}`}>
                {gameWinners && <WinnersText gameWinners={gameWinners}/> }
                {icon}
            </div>
        </React.Fragment>
    )
}

WinnersView.propTypes = {
    gameWinners: PropTypes.shape({
        typeOfEndOfGame: PropTypes.string,
        winners: PropTypes.array,
    }),
    isGameFinished: PropTypes.bool,
};