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
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const postData = {
        title, 
        date,
        time,
        note, 
    };
    dispatch(addPost(postData));
    
    setTitle('');
    setDate('');
    setTime('');
    setNote('');
};

    return(
        <>
        <form className={styles['add-wrap']} onSubmit={handleSubmit}>
            <div className={styles['add-data']} >
                    <div className={styles["inputs-container"]}>
                        <label>Title</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value) }  placeholder='Enter Title' />
                    </div>
                    <div className={styles['date-time-wrpa']}>
                        <div className={styles['inputs-container']}>
                            <label>Time</label>
                            <input value={time} onChange={(e) => setTime(e.target.value) } type='time'  />
                        </div>
                        <div className={styles['inputs-container']}>
                            <label>Date</label>
                            {/* <input value={date} onChange={(e) => setDate(e.target.value) } type='date' /> */}
                            <InptDate />
                        </div>
                    </div>
                <div className={styles['note-wrap']}>
                <label>Note</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value) } placeholder='Enter note'  />
                </div>
               
            </div>

            <div className={styles['btn']}>
            <Button text={'Add'} />

            </div>
            
        </form>
        </>
    );
}