import styles from './AddForm.module.scss';



export default function AddForm() {
    return(
        <>
        <form className={styles['add-wrap']}>
            <div className={styles['add-data']} >
                <div className={styles['note-wrap']}>
                <h1>Note</h1>
                    <textarea placeholder='Enter note'  />
                </div>
                <div className={styles['data-wrap']}>
                <h1>Action Data</h1>
                    <div className={styles["inputs-container"]}>
                        <label>Title</label>
                        <input placeholder='Enter Title' />
                    </div>
                    <div className={styles['inputs-container']}>
                        <label>Time</label>
                        <input type='time'  />
                    </div>
                    <div className={styles['inputs-container']}>
                        <label>Date</label>
                        <input type='date' />
                    </div>
                </div>
            </div>

            <div className={styles['btn']}>
                <button>Add</button>
            </div>
            
        </form>
        </>
    );
}