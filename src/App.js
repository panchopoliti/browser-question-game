import React, { useState } from 'react';
import { GameSettings } from './Components/Game';
import { useHookWithValueAndHandler } from './Hooks/game-hooks.js';
import { getDifficulties } from './functions/question-functions.js';
import { createFieldIds } from './functions/settings-form-functions.js';
import jaguar from './static/Logos/black-jaguar-100.png';
import Game from './Game.js';
import styles from './css/App.module.scss';

const names = [
    {
        id: 0,
        name: 'Player 1',
    },
    {
        id: 1,
        name: 'Player 2',
    },
    {
        id: 2,
        name: 'Player 3',
    },
    {
        id: 3,
        name: 'Player 4'
    },
];

export default function App() {

    const [ isGameStarted, setStartGame ] = useState(false);
    const [ showInitialSettings, setShowInitialSettings ] = useState(true);
    const numberOfPlayers = useHookWithValueAndHandler(2);
    const playWithTimer = useHookWithValueAndHandler(false);
    const difficulty = useHookWithValueAndHandler('Low');
    const possibleDifficulties = getDifficulties();

    difficulty.possibleDifficulties = possibleDifficulties;

    const fieldsStatesWithIdNames = {
        numberOfPlayers,
        playWithTimer,
        difficulty,
    }; //Id Names matching after several times. Risk to change!

    const fields = createFieldIds(fieldsStatesWithIdNames);
    const fieldsArray = Object.keys(fields).map((key => fields[key]));

    const playersNames = { 
        id: 'playersNames',
        value: names, 
        handler: (numOfPlayers) => names.slice(0, numOfPlayers),
    };

    const onInitialSettingsButtonClick = () => {

        setShowInitialSettings(false);
        setStartGame(true);

    }

    const gameSettingsProps = {
        isGameStarted,
        fields: fieldsArray,
        successButtonHandler: onInitialSettingsButtonClick,
        title: 'Initial Settings',
        isModalBeingDisplayed: false,
    }

    const gameProps = {
        isGameStarted,
        playersNames,
        setStartGame,
        fields: fieldsArray,
    };

    const showApp = (showInitialSettings) ? <GameSettings {...gameSettingsProps}/> : <Game {...gameProps}/>;

    return (
        <React.Fragment>
            <div className={styles.desktop}>
                <h1>Open Dev Tools and resize to Mobile Screen or less than 480px</h1>
                <h4>(Desktop Version coming soon...)</h4>
                <img src={jaguar} alt='Logo'/>
            </div>
            <div className={styles.mobile}>
                {showApp}
            </div>
        </React.Fragment>
    )
}