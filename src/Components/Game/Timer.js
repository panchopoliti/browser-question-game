import React, { useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import styles from './css/Timer.module.scss';

function StartTimer({ initialValue, handler }) {

    const [time, setTimer] = useState(initialValue);
    const [isTimerInZero, setTimerInZero] = useState(false);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimer(time => {
                const nextSecond = time - 1;

                if (nextSecond === 0){
                    clearInterval(timerId);
                    setTimerInZero(true);
                }

                return nextSecond;
            });
        }, 1000);
        return () => clearInterval(timerId);
      }, [handler]);

    useEffect(() => {

        if (isTimerInZero) {
            setTimerInZero(false);
            return handler()
        }

    }, [isTimerInZero, handler])

    const numberLength = time.toString().length;

    return (
        <div className={styles.timerContainer}>
            <span className={(numberLength === 1) ? styles.oneNumber : styles.twoNumbers} role='timer'>{time}</span>
            <svg>
                <circle r="18" cx="20" cy="20"></circle>
            </svg>
        </div>
    );
}

export default function Timer({ initialValue, startTimer, handlerForTimeOver }) {
    
    return startTimer && <StartTimer initialValue={initialValue} handler={handlerForTimeOver}/>;

}

Timer.propTypes = {
    initialValue: PropTypes.number,
    startTimer: PropTypes.bool,
    handlerForTimeOver: PropTypes.func,
}