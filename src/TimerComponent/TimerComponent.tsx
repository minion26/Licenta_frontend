import { CountdownCircleTimer } from 'react-countdown-circle-timer'
interface TimerComponentProps {
    onTimeUp: () => void;
}

export function TimerComponent({ onTimeUp } : TimerComponentProps) {
    return (
        <CountdownCircleTimer
            isPlaying
            duration={5}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[30, 25, 7, 0]}
        >
            {({ remainingTime }) => {
                if (remainingTime === 0) {
                    onTimeUp();
                }

                return remainingTime;
            }}
        </CountdownCircleTimer>
    )
}