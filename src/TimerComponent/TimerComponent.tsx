import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from './TimerComponent.module.css'
interface TimerComponentProps {
    onTimeUp: () => void;
    time: number;
}

export function TimerComponent({ onTimeUp, time } : TimerComponentProps) {
    const renderTime = ({ remainingTime }: { remainingTime: number }) => {
        if (remainingTime === 0) {
            onTimeUp();
        }

        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        return (
            <div>
                <div className={styles.clock}>{`${hours}:${minutes}:${seconds}`}</div>
            </div>
        );
    };

    return (
        <CountdownCircleTimer
            isPlaying
            duration={time}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[time/2, time/4, time/6, 0]}
        >
            {renderTime}
        </CountdownCircleTimer>
    )
}