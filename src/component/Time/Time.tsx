import React from 'react';
import styles from './Time.module.scss';
import clock from './png/clock.png';

interface TimeProps {
    hours: number;
    minutes: number;
    setTime: (time: { hour: number, minutes: number }) => void;
}

const Time: React.FC<TimeProps> = ({ setTime, hours, minutes }) => {
    const hrUp = () => {
        const updatedHour = (hours < 23 ? hours + 1 : 0);
        setTime({ hour: updatedHour, minutes });
    };

    const hrDown = () => {
        const updatedHour = (hours > 0 ? hours - 1 : 23);
        setTime({ hour: updatedHour, minutes });
    };

    const minUp = () => {
        const updatedMinutes = (minutes < 59 ? minutes + 1 : 0);
        setTime({ hour: hours, minutes: updatedMinutes });
    };

    const minDown = () => {
        const updatedMinutes = (minutes > 0 ? minutes - 1 : 59);
        setTime({ hour: hours, minutes: updatedMinutes });
    };

    return (
        <div className={styles['time-picker']}>
            <div className={styles['hour']}>
                <div onClick={hrUp} className={styles['hr-up']}></div>
                <div className={`${styles['hr']} ${styles['inpt']}`}>{hours.toString().padStart(2, '0')}</div>
                <div onClick={hrDown} className={styles['hr-down']}></div>
            </div>

            <div className={styles['separator']}>:</div>

            <div className={styles['minute']}>
                <div onClick={minUp} className={styles['min-up']}></div>
                <div className={`${styles['min']} ${styles['inpt']}`}>{minutes.toString().padStart(2, '0')}</div>
                <div onClick={minDown} className={styles['min-down']}></div>
            </div>

            {/* <div className={styles['png-wrap']}>
                <img alt='clock' src={clock} />
            </div> */}
        </div>
    );
};

export default Time;
