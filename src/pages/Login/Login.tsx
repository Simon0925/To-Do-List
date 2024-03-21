import { MouseEvent, useState } from 'react';
import styles from './Login.module.scss';
import Registration from '../../component/Registration/Registration';
import SignIn from '../../component/SignIn/SignIn';


export default function Login () {

    const [isExists, setIsExists] = useState(true)

    const changeForm = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        setIsExists(e => !e)
    }

    return(
        <>
        <div className={styles['login-wrap']}>
            { isExists ?
            <SignIn  changeForm={changeForm} />
            :
            <Registration changeForm={changeForm} />
            }
        </div>
        </>
    )
}