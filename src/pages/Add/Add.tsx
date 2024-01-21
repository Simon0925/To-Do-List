import AddForm from '../../component/AddForm/AddForm';
import styles from './Add.module.scss';



export default function Add() {
    return(
        <>
        <h1 className={styles['h1']}>Add so you don`t forget</h1>
        <div className={styles['form']}>
            <AddForm />
        </div>
        </>
    );
}