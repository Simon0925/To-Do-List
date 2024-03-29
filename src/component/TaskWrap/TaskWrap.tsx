import styles from './TaskWrap.module.scss';
import arrow from './png/down-arrow.png';
import Button from '../../UI/Button/Button';
import { useState, useEffect } from 'react';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { editPost } from '../../store/post.slice';
import InptDate from '../InptDate/InptDate';
import Time from '../Time/Time';

interface TaskWrapProps {
    title: string;
    date: string;
    time: string;
    id: string;
    text: string;
    onDelete: (id: string) => void;
}

export default function TaskWrap2({ id, title, time, date, onDelete, text }: TaskWrapProps) {
    const [isActive, setIsActive] = useState(false);
    const [dateData, setDateData] = useState<string>(date);
    const [note, setNote] = useState(text);
    const [titleInpt, setTitleInpt] = useState(title);
    const [timeState, setTimeState] = useState<{ hour: string; minute: string }>({ hour: '', minute: '' });

    const toggle = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        setDateData(date);
    }, [date]);

    const dispatch = useDispatch<AppDispatch>();

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(
            editPost({
                id,
                title: titleInpt,
                date: dateData,
                time: timeState.hour + ':' + timeState.minute,
                note: note,
            })
        );
    };

    const handleDateChange = (day: number, month: number, year: number) => {
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month + 1).padStart(2, '0');
        const formattedYear = String(year).padStart(4, '0');
        const formattedDate = `${formattedYear}-${formattedMonth}-${formattedDay}`;
        setDateData(formattedDate);
    };

    useEffect(() => {
        const [hour, minute] = time.split(':');
        setTimeState({ hour, minute });
    }, [time]);
    return (
        <>
            <form className={`${styles['to-do-list']} ${isActive ? styles['active'] : ''}`}>
                <div onClick={toggle} className={styles['header']}>
                    <span className={styles[isActive ? 'to-do-list-title' : 'close']}>{title}</span>
                    <input
                        className={styles[!isActive ? 'to-do-list-title-inpt' : 'open']}
                        type='text'
                        value={titleInpt}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={(e) => {
                            setTitleInpt(e.target.value);
                        }}
                    />
                    <img onClick={toggle} className={styles['arrow']} src={arrow} alt='Toggle' />
                </div>
                <div className={styles['to-do-list-wrap-content']}>
                    <div className={styles['to-do-list-content']}>
                        <div className={styles['to-do-data']}>
                            <div className={styles['date-time']}>
                                <div className={styles['InptDate']}>
                                <InptDate
                                    selectedDay={Number(dateData.split('-')[2])}
                                    selectedMonth={Number(dateData.split('-')[1]) - 1}
                                    selectedYear={Number(dateData.split('-')[0])}
                                    onDateChange={handleDateChange}
                                />
                                </div>
                                <Time
                                    hours={Number(timeState.hour)}
                                    minutes={Number(timeState.minute)}
                                    setTime={(e) => setTimeState({ hour: e.hour.toString(), minute: e.minutes.toString() })}
                                />
                            </div>
                            <textarea placeholder='Enter text' value={note} onChange={(e) => setNote(e.target.value)} />
                            <div className={styles['control-btn']}>
                                <Button text={'delete'} click={() => onDelete(id)} />
                                <Button text={'edit'} click={handleEdit} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
