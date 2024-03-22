import styles from './LeftMenu.module.scss';
import Navigation from '../../component/Navigation/Navigation';
import Button from '../../UI/Button/Button';

import { useDispatch } from 'react-redux';
import { login } from '../../store/auth.slice';

export default  function LeftMenu() {

    const dispatch = useDispatch();

    function signOut () {
        localStorage.removeItem('accessToken')
        dispatch(login({login:false, id:''}));
    }

    return(

        <div className={styles['leftMenu-wrap']}>
            <div className={styles['logo']}>
                <p>To-Do</p>
            </div>
            <Navigation />
            <div className={styles['sign-out-btn']}>
                <Button text={'Sign out'} click={signOut} />
            </div>
            
        </div>
    );
}