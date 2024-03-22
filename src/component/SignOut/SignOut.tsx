import Button from '../../UI/Button/Button';
import styles from './SignOut.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth.slice';


export default function SignOut (){
    
    const dispatch = useDispatch();

    function signOut () {
        localStorage.removeItem('accessToken')
        dispatch(login({login:false, id:''}));
    }
    
    return(
        <div className={styles['sign-out-btn']}>
                <Button text={'Sign out'} click={signOut} />
            </div>
    )
}