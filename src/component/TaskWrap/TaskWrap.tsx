import {useState } from 'react';
import styles from './TaskWrap.module.scss';
import ArrowSvg from '../../UI/ArrowSvg/ArrowSvg';
import { useDispatch } from 'react-redux';
import { editPost } from '../../store/post.slice';
import { AppDispatch } from '../../store/store';
import Button from '../../UI/Button/Button';

interface TaskWrapProps{
    title:string
    date:string
    time:string
    id:string
    text:string
    onDelete: (id: string) => void; 
}



export default function TaskWrap ({id,title,time,date,onDelete,text}:TaskWrapProps) {

    const [isActive, setIsActive] = useState(false)

    const [dateData, setDateData] = useState(date)

    const [note, setNote] = useState(text)

    const [titleInpt, setTitleInpt] = useState(title)

    const [dataTime, setDataTime] = useState(time)

    const edit = function () {
        setIsActive(!isActive)
    }

    const dispatch = useDispatch<AppDispatch>()

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        dispatch(editPost({
            id,
            title: titleInpt,
            date: dateData,
            time: dataTime,
            note: note,
        }));
    };

    return(
        <>
        <form className={styles[!isActive ? 'to-do-list' : 'to-do-list-open']} >
            <div className={styles['to-do-wrap-content']} >
                <span className={styles[!isActive ?'to-do-list-title' : 'active']}>{title}</span>
                <input className={styles[isActive? 'to-do-list-title-inpt': 'active']} type='text' value={titleInpt} onChange={(e) => setTitleInpt(e.target.value) } />
                <span  className={styles['open-btn']} onClick={edit}><ArrowSvg /></span>
            </div>
            <div className={styles['to-do-data']}>
                <div className={styles['date-time']}>
                    <input type='date'  value={dateData}  onChange={(e) => setDateData(e.target.value) } /> 
                    <input type='time' value={dataTime} onChange={(e) => setDataTime(e.target.value) }/>
                </div>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} />

                <div className={styles['control-btn']}>
                <Button text={'delete'} click={() => onDelete(id)} />
                <Button text={'edit'} click={handleEdit} />
                </div>
            </div>
        </form>
        </>
    )
}