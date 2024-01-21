import styles from './LeftMenu.module.scss';
import Navigation from '../../component/Navigation/Navigation';

export default  function LeftMenu() {
    return(

        <div className={styles['leftMenu-wrap']}>
            <div className={styles['logo']}>
                <p>To-Do</p>
            </div>
            <Navigation />
        </div>
    );
}