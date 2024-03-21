import Button from '../../UI/Button/Button';
import styles from './Registration.module.scss';
import { MouseEvent, useState} from 'react'; 
import { addUser,handleInputChange } from './functions'; 


interface RegistrationProps {
    changeForm: (e: MouseEvent<HTMLButtonElement>) => void; 
}

const initialUserData = {
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
};

export default function Registration({ changeForm }: RegistrationProps) {
    const [userData, setUserData] = useState(initialUserData);
    const [errors, setErrors] = useState({ ...initialUserData });

    

    return (
        <>
            <form onSubmit={(e) => addUser(e, userData, setErrors)} className={styles['login-form']}>
                <p>Registration</p>
                <div className={styles['inputs-wrap']}>
                    <div className={styles['input-wrap']}>
                        <label>
                            <span>Full name</span>
                            <input value={userData.name}
                             onChange={(e) => handleInputChange(e, setUserData)} 
                             placeholder='Full name' type="text" name="name" />
                            <div className={styles['error-message']}>{errors.name}</div>
                        </label>
                    </div>
                    <div className={styles['input-wrap']}>
                        <label>
                            <span>Email</span>
                            <input value={userData.email}
                             onChange={(e) => handleInputChange(e, setUserData)}
                             placeholder='Email' type="email" name="email" />
                            <div className={styles['error-message']}>{errors.email}</div>
                        </label>
                    </div>
                    <div className={styles['input-wrap']}>
                        <label>
                            <span>Password</span>
                            <input value={userData.password}
                             onChange={(e) => handleInputChange(e, setUserData)}
                             placeholder='Password' type="password" name="password" />
                            <div className={styles['error-message']}>{errors.password}</div>
                        </label>
                    </div>
                    <div className={styles['input-wrap']}>
                        <label>
                            <span>Repeat password</span>
                            <input value={userData.repeatPassword}
                             onChange={(e) => handleInputChange(e, setUserData)}
                             placeholder='Repeat password' type="password" name="repeatPassword" />
                            <div className={styles['error-message']}>{errors.repeatPassword}</div>
                        </label>
                    </div>
                </div>
                <div className={styles['btn-wrap']}>
                    <Button click={changeForm} text={'Sign in'} />
                    <Button text={'Registration'} />
                </div>
            </form>
        </>
    );
}
