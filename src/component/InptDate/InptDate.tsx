import { useState, useEffect } from 'react';
import styles from './InptDate.module.scss';
import { months } from './data';
import calendarImage from './png/calendar.png';

interface InptDateProps {
    selectedDay: string;
    selectedMonth: string;
    selectedYear: string;
    onDateChange: (day: string, month: string, year: string) => void;
}

export default function InptDate() {

  const currentDate = new Date();
  
  const [isActive, setIsActive] = useState(false);
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [totalDays, setTotalDays] = useState(0);

  const toggleDatePicker = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const isDateContainer = target.closest(`.${styles['dates-container']}`);

    if (!isDateContainer) {
      setIsActive(!isActive);
    }
  };

  const goToPrevMonth = () => {
    let prevMonth = selectedMonth - 1;
    let prevYear = selectedYear;

    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }

    setSelectedMonth(prevMonth);
    setSelectedYear(prevYear);
  };

  const goToNextMonth = () => {
    let nextMonth = selectedMonth + 1;
    let nextYear = selectedYear;

    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    }

    setSelectedMonth(nextMonth);
    setSelectedYear(nextYear);
  };

  useEffect(() => {
    const calculateTotalDays = () => {
      if (selectedMonth === 1) {
        setTotalDays(28);
      } else if (selectedMonth % 2 === 0) {
        setTotalDays(31);
      } else {
        setTotalDays(30);
      }
    };

    calculateTotalDays();
  }, [selectedMonth]);

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  return (
    
      <div onClick={toggleDatePicker} className={styles['date-piker-wrapper']}>
        <div className={styles['selected-date']}>
          {selectedDay.toString().padStart(2, '0')} / {selectedMonth.toString().padStart(2, '0')} / {selectedYear}
          <img className={styles['calendar']}  src={calendarImage} alt="Calendar" />
        </div>
        <div className={`${styles['dates-container']} ${isActive ? styles['active'] : ''}`}>
          <div className={styles['month']}>
            <div onClick={goToPrevMonth} className={`${styles['prev-month']} ${styles['arrowsL']}`}>&lt;</div>
            <div className={styles['month-item']}>{months[selectedMonth]} {selectedYear}</div>
            <div onClick={goToNextMonth} className={`${styles['next-month']} ${styles['arrowsR']}`}>&gt;</div>
          </div>
          <div className={styles['days-container']}>
            {Array.from({ length: totalDays }, (_, index) => index + 1).map(day => (
              <div key={day} className={styles['day']} style={day === selectedDay ? { backgroundColor: 'rgb(88, 87, 87)' } : {}} onClick={() => handleDayClick(day)}>
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
   
  );
}
