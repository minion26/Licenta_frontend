import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from './TimerComponent.module.css'
import {useEffect, useRef, useState} from "react";
interface TimerComponentProps {
    onTimeUp: () => void;
    initialTime: number;
}

const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

const useTimer = (initialSeconds: number) => {
    const getRemainingTime = () => {
        const storedTime = localStorage.getItem('timer');
        return storedTime ? Number(storedTime) : initialSeconds;
    };

    const [seconds, setSeconds] = useState(getRemainingTime);
    const secondsRef = useRef(seconds);
    secondsRef.current = seconds;

    useInterval(() => {
        setSeconds(prevSeconds => {
            const newSeconds = prevSeconds - 1;
            localStorage.setItem('timer', String(newSeconds));
            return newSeconds;
        });
    }, 2000);


    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('timer', String(secondsRef.current));
        });

        return () => {
            window.removeEventListener('beforeunload', () => {
                localStorage.setItem('timer', String(secondsRef.current));
            });
        };
    }, []);

    return seconds;
};


export function TimerComponent({ onTimeUp, initialTime } : TimerComponentProps) {
    const time = useTimer(initialTime);
    const hasTimeUpBeenCalled = useRef(false);

    const renderTime = ({ remainingTime }: { remainingTime: number }) => {
        if (remainingTime === 0 && !hasTimeUpBeenCalled.current) {
            onTimeUp();
            localStorage.removeItem('timer'); // șterge 'timer' din Local Storage
            hasTimeUpBeenCalled.current = true;
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