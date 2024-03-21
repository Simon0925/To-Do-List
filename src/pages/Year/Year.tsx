import {  useState } from 'react';
import styles from './Year.module.scss';
import { increment, decrement } from '../../store/counter.slice';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../store/counter.slice'

export default function Year() {

    const amount = useSelector((state: RootState) => state.counter.value);

  const dispatch = useDispatch();
  const [addValue, setAddValue] = useState('');
  const [takeValue, setTakeValue] = useState('');

  const addCash = () => {
    const parsedValue = parseFloat(addValue) || 0;
    dispatch(increment(parsedValue));
    setAddValue('');
  };

  const takeCash = () => {
    const parsedValue = parseFloat(takeValue) || 0;
    dispatch(decrement(parsedValue));
    setTakeValue('');
  };

  return (
    <>
      <div className={styles['wrap']}>
        <span>{amount}</span>
        <input 
          placeholder='enter amount' 
          value={addValue} 
          onChange={(e) => setAddValue(e.target.value)} 
        />
        <button onClick={() => addCash()}>Deposit</button>
        <input 
          placeholder='enter amount' 
          value={takeValue} 
          onChange={(e) => setTakeValue(e.target.value)} 
        />
        <button onClick={() => takeCash()}>Withdraw</button>
      </div>
    </>
  );
}
