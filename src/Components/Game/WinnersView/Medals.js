import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/Medals.module.scss';
import { Medal } from '../../Icons';

export default function Medals({ numOfWinners, medalClassName }) {

    const maxWidth = 200;
    const medals = [];

    for ( let i = 0; i < numOfWinners; i++ ) {
        medals.push(
        <Medal key={i} className={medalClassName} width={maxWidth / numOfWinners}/>
        );
    }

    return (
        <div className={styles.container}>
            { medals }
        </div>
    )

}

Medals.propTypes = {
    numOfWinners: PropTypes.number,
    medalProps: PropTypes.shape({
        className: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        color: PropTypes.string,
    })
}