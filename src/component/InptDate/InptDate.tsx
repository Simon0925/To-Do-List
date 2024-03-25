import { useState, useEffect } from 'react';
import styles from './InptDate.module.scss';
import { months } from './data';
import calendarImage from './png/calendar.png';

interface InptDateProps {
    selectedDay: number;
    selectedMonth: number;
    selectedYear: number;
    onDateChange: (day: number, month: number, year: number) => void;
}

const InptDate: React.FC<InptDateProps> = ({
    selectedDay: propSelectedDay,
    selectedMonth: propSelectedMonth,
    selectedYear: propSelectedYear,
    onDateChange,
}) => {
    const currentDate = new Date();
    const [isActive, setIsActive] = useState(false);
    const [localSelectedDay, setLocalSelectedDay] = useState(propSelectedDay || currentDate.getDate());
    const [localSelectedMonth, setLocalSelectedMonth] = useState(
        propSelectedMonth !== undefined ? propSelectedMonth : currentDate.getMonth()
    );
    const [localSelectedYear, setLocalSelectedYear] = useState(propSelectedYear || currentDate.getFullYear());
    const [totalDays, setTotalDays] = useState(0);

    useEffect(() => {
        if (!propSelectedDay && !propSelectedMonth && !propSelectedYear) {
           
            setLocalSelectedDay(currentDate.getDate());
            setLocalSelectedMonth(currentDate.getMonth());
            setLocalSelectedYear(currentDate.getFullYear());
        }
    }, [propSelectedDay, propSelectedMonth, propSelectedYear, currentDate]);

    const toggleDatePicker = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        const isDateContainer = target.closest(`.${styles['dates-container']}`);

        if (!isDateContainer) {
            setIsActive(!isActive);
        }
    };

    const goToPrevMonth = () => {
        let prevMonth = localSelectedMonth - 1;
        let prevYear = localSelectedYear;

        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }

        setLocalSelectedMonth(prevMonth);
        setLocalSelectedYear(prevYear);
    };

    const goToNextMonth = () => {
        let nextMonth = localSelectedMonth + 1;
        let nextYear = localSelectedYear;

        if (nextMonth > 11) {
            nextMonth = 0;
            nextYear++;
        }

        setLocalSelectedMonth(nextMonth);
        setLocalSelectedYear(nextYear);
    };

    useEffect(() => {
        const calculateTotalDays = () => {
            if (localSelectedMonth === 1) {
                setTotalDays(28);
            } else if (localSelectedMonth % 2 === 0) {
                setTotalDays(31);
            } else {
                setTotalDays(30);
            }
        };

        calculateTotalDays();
    }, [localSelectedMonth]);

    const handleDayClick = (day: number) => {
        setLocalSelectedDay(day);
        onDateChange(day, localSelectedMonth, localSelectedYear); 
    };

    useEffect(() => {
        setLocalSelectedDay(propSelectedDay);
        setLocalSelectedMonth(propSelectedMonth);
        setLocalSelectedYear(propSelectedYear);
    }, [propSelectedDay, propSelectedMonth, propSelectedYear]);

    

    return (
        <div>
        <div onClick={toggleDatePicker} className={styles['date-piker-wrapper']}>
            <div className={styles['selected-date']}>
                {localSelectedDay.toString().padStart(2, '0')} / {(localSelectedMonth + 1 ).toString().padStart(2, '0')} / {localSelectedYear}
                <img className={styles['calendar']} src={calendarImage} alt="Calendar" />
            </div>
            <div className={`${styles['dates-container']} ${isActive ? styles['active'] : ''}`}>
                <div className={styles['month']}>
                    <div onClick={goToPrevMonth} className={`${styles['prev-month']} ${styles['arrowsL']}`}>&lt;</div>
                    <div className={styles['month-item']}>{months[localSelectedMonth]} {localSelectedYear}</div>
                    <div onClick={goToNextMonth} className={`${styles['next-month']} ${styles['arrowsR']}`}>&gt;</div>
                </div>
                <div className={styles['days-container']}>
                    {Array.from({ length: totalDays }, (_, index) => index + 1).map(day => (
                        <div key={day} className={styles['day']} style={day === localSelectedDay ? { backgroundColor: 'rgb(88, 87, 87)' } : {}} onClick={() => handleDayClick(day)}>
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
};

export default InptDate;
