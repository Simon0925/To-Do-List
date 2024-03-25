import styles from './LeftMenu.module.scss';
import Navigation from '../../component/Navigation/Navigation';
import SignOut from '../../component/SignOut/SignOut';


export default  function LeftMenu() {

   

    return(

        <div className={styles['leftMenu-wrap']}>
            <div className={styles['leftMenu-container']} >
                <div className={styles['logo']}>
                    <p className={styles['logo-text']}>To-Do</p>
                </div>
                <div className={styles['nav']}>
                    <Navigation />
                </div>
                <div className={styles['sign-out-btn']}>
                    <div>
                        <SignOut />
                    </div>
                </div>
            </div>            
        </div>
    );
}