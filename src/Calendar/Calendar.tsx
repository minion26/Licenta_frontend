import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Calendar.module.css';
import { NavigateAction } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

interface CustomToolbarProps {
    label: string;
    onNavigate: (action: NavigateAction) => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ label, onNavigate }) => {
    return (
        <div className={styles.customToolbar}>
            <button className={styles.customToolbarButton} onClick={() => onNavigate('PREV')}>{"<"}</button>
            <button className={styles.customToolbarButton} onClick={() => onNavigate('TODAY')}>{"Today"}</button>
            <button className={styles.customToolbarButton} onClick={() => onNavigate('NEXT')}>{">"}</button>
            <span className={styles.customToolbarSpan}>{label}</span>
        </div>
    );
};

function MyCalendar() {
    const formats = {
        dayFormat: (date: Date) => moment(date).format('dd'),
    };

    return (
        <div className={styles.calendar}>
            <Calendar
                localizer={localizer}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                style={{height: '100%', width: '100%'}}
                views={['month']}
                components={{
                    toolbar: CustomToolbar,
                }}
                formats={formats}
            />
        </div>
    );
}

export default MyCalendar;