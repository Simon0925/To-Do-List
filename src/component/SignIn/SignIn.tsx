import Button from '../../UI/Button/Button';
import styles from './SignIn.module.scss';
import { FormEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth.slice';



interface SignInProps {
  changeForm: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function SignIn({ changeForm }: SignInProps) {
    
  const dispatch = useDispatch();

  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, email: e.target.value });
    setErrors({ ...errors, email: '' });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, password: e.target.value });
    setErrors({ ...errors, password: '' });
  };

  const checkData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {

        const responseData = await response.json();

        console.log('Error response:', responseData);

        if (response.status === 400 && responseData.error === 'User not found') {
          setErrors({
            ...errors,
            email: responseData.error,
          });
        } else if (response.status === 401 && responseData.error === 'Incorrect email or password') {
          setErrors({
            ...errors,
            password: responseData.error,
          });
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {

        const responseData = await response.json();

        console.log('toke : ',responseData.accessToken)

        localStorage.setItem('accessToken', responseData.accessToken);

        

        dispatch(login({ token: responseData.token , login:true}));



        console.log(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={checkData} className={styles['login-form']}>
        <p>Sign in</p>
        <div className={styles['inputs-wrap']}>
          <div className={styles['input-wrap']}>
            <label>
              <span>Username</span>
              <input value={data.email} onChange={handleEmailChange} placeholder='Username' type="email" name="email" />
            </label>
            <div className={styles['error-message']}>{errors.email}</div>
          </div>
          <div className={styles['input-wrap']}>
            <label>
              <span>Password</span>
              <input value={data.password} onChange={handlePasswordChange} placeholder='Password' type="password" name="password" />
            </label>
            <div className={styles['error-message']}>{errors.password}</div>
          </div>
        </div>
        <div className={styles['btn-wrap']}>
          <Button text={'Sign in'} />
          <Button click={changeForm} text={'Create an account'} />
        </div>
      </form>
    </>
  );
}
