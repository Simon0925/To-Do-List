import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../store/post.slice'; 
import styles from './AddForm.module.scss';
import { AppDispatch } from '../../store/store';
import Button from '../../UI/Button/Button';
import InptDate from '../InptDate/InptDate';

export default function AddForm() {
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState('');
    const [selectedDay, setSelectedDay] = useState<number>(0); 
    const [selectedMonth, setSelectedMonth] = useState<number>(0); 
    const [selectedYear, setSelectedYear] = useState<number>(0); 
    const [time, setTime] = useState('');
    const [note, setNote] = useState('');


    const currentDate = new Date();

    const [currentDay, setCurrentDay] = useState(currentDate.getDate())
    const [currentMonth, setcurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setcurrentYear] = useState(currentDate.getFullYear())


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
    
        const currentDate = new Date();
        const year = selectedYear || currentDate.getFullYear();
        const month = selectedMonth || currentDate.getMonth() + 1; 
        const day = selectedDay || currentDate.getDate();
       
        console.log(year,month,day)
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
        const postData = {
            title, 
            date: formattedDate,
            time,
            note, 
        };
    
     
    
        dispatch(addPost(postData));
        
        setTitle('');
        setSelectedDay(0);
        setSelectedMonth(0);
        setSelectedYear(0);
        setTime('');
        setNote('');
    };
   


    return (
        <form className={styles['add-wrap']} onSubmit={handleSubmit}>
            <div className={styles['add-data']} >
                <div className={styles['inputs-container']}>
                    <label className={styles['title']}>Title</label>
                    <input className={styles['title-inpt']} value={title} onChange={(e) => setTitle(e.target.value) }  placeholder='Enter Title' />
                </div>
                <div className={styles['date-time-wrpa']}>
                    <div className={styles['inputs-container']}>
                        <label className={styles['label']}>Time</label>
                        <input value={time} onChange={(e) => setTime(e.target.value) } type='time'  />
                    </div>
                    <div className={styles['inputs-container']}>
                        <label className={styles['label']}>Date</label>
                        <InptDate
                            selectedDay={currentDay}
                            selectedMonth={currentMonth}
                            selectedYear={currentYear}
                            onDateChange={(day, month, year) => {
                                setSelectedDay(Number(day)); 
                                setSelectedMonth(Number(month)); 
                                setSelectedYear(Number(year)); 
                            }}
                        />
                    </div>
                </div>
                <div className={styles['note-wrap']}>
                    <label className={styles['label']}>Note</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value) } placeholder='Enter note'  />
                </div>
            </div>
            <div className={styles['btn']}>
                <Button text={'Add'} />
            </div>
        </form>
    );
}
    