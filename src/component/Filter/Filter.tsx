import { useEffect, useState } from 'react';
import styles from './Filter.module.scss';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../store/filter.slice';
import InptDate from '../InptDate/InptDate';

export default function Filter() {
  const dispatch = useDispatch();

  const [selectedFilter, setSelectedFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  let [term, setTerm] = useState('')
    useEffect(()=>{

      setTerm(fromDate + toDate)

      console.log(term)

  },[fromDate,toDate])

  const handleFilterChange = (filter:string) => {
    setSelectedFilter(filter);
    dispatch(updateFilter({ selectedFilter: filter, fromDate, toDate }));
  };

 


const handleFromDateChange = (day:number, month:number, year:number) => {
  const dayS = day.toString().padStart(2, '0')
  const monthS = (month +1).toString().padStart(2, '0')
  const yearS = year.toString().padStart(4, '0')
  const value = `${yearS}-${monthS}-${dayS}`
 
  setFromDate(value);
    dispatch(updateFilter({ selectedFilter: 'fromDate', fromDate: value, toDate }));
};

const handleToDateChange = (day:number, month:number, year:number) => {
  const dayS = day.toString().padStart(2, '0')
  const monthS = (month +1).toString().padStart(2, '0')
  const yearS = year.toString().padStart(4, '0')
  const value = `${yearS}-${monthS}-${dayS}`

  setToDate(value);
    dispatch(updateFilter({ selectedFilter: 'toDate', fromDate, toDate: value }));
};

  useEffect(()=>{
    if(fromDate !== ''&& toDate !== '' ){
      console.log('range')
      handleFilterChange('range')
    }else null
    
  },[fromDate,toDate])

 

  useEffect(() => {
    dispatch(updateFilter({ selectedFilter, fromDate, toDate }));
  }, [dispatch, selectedFilter, fromDate, toDate]);

  return (
    <div className={styles['filter-wrap']}>
      <h3>Filter</h3>
      <div className={styles['filter-elements']}>
        <div className={styles['filter-elem']}>
          <span className={styles['filter-span']}>Today</span>
          <input
            type="radio"
            name="filter"
            checked={selectedFilter === 'today'}
            onChange={() => handleFilterChange('today')}
          />
        </div>
        <div className={styles['filter-elem']}>
          <span className={styles['filter-span']}>Tomorrow</span>
          <input
            type="radio"
            name="filter"
            checked={selectedFilter === 'tomorrow'}
            onChange={() => handleFilterChange('tomorrow')}
          />
        </div>
        <div className={styles['filter-elem']}>
          <span className={styles['filter-span']}>Week</span>
          <input
            type="radio"
            name="filter"
            checked={selectedFilter === 'week'}
            onChange={() => handleFilterChange('week')}
          />
        </div>
        <div className={styles['filter-elem']}>
          <span className={styles['filter-span']}>Month</span>
          <input
            type="radio"
            name="filter"
            checked={selectedFilter === 'month'}
            onChange={() => handleFilterChange('month')}
          />
        </div>
        <div className={styles['filter-elem']}>
          <span className={styles['filter-span-renge']} >from </span>
          <InptDate selectedDay={2} selectedMonth={3 - 1} selectedYear={2024} onDateChange={handleFromDateChange}
          />
        </div>
        <div className={styles['filter-elem']}>
          <span className={styles['filter-span-renge']}> to </span>
          <InptDate selectedDay={2} selectedMonth={3 - 1} selectedYear={2024} onDateChange={handleToDateChange}/>
        </div>
        <div className={styles['filter-elem']}>
          <span className={styles['filter-span']}>All</span>
          <input
            type="radio"
            name="filter"
            checked={selectedFilter === 'all'}
            onChange={() => handleFilterChange('all')}
          />
        </div>
      </div>
    </div>
  );
}
