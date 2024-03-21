import { useEffect, useState } from 'react';
import styles from './Filter.module.scss';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../store/filter.slice';

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

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    dispatch(updateFilter({ selectedFilter: filter, fromDate, toDate }));
  };

  const handleFromDateChange = (event) => {
    const value = event.target.value;
    setFromDate(value);
    dispatch(updateFilter({ selectedFilter: 'fromDate', fromDate: value, toDate }));
};

const handleToDateChange = (event) => {
    const value = event.target.value;
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
          <span>Today</span>
          <input
            type="radio"
            name="filter"
            checked={selectedFilter === 'today'}
            onChange={() => handleFilterChange('today')}
          />
        </div>
        <div className={styles['filter-elem']}>
          <span>Tomorrow</span>
          <input
            type="radio"
            name="filter"
            checked={selectedFilter === 'tomorrow'}
            onChange={() => handleFilterChange('tomorrow')}
          />
        </div>
        <div className={styles['filter-elem']}>
          <span>Week</span>
          <input
            type="radio"
            name="filter"
            checked={selectedFilter === 'week'}
            onChange={() => handleFilterChange('week')}
          />
        </div>
        <div className={styles['filter-elem']}>
          <span>Month</span>
          <input
            type="radio"
            name="filter"
            checked={selectedFilter === 'month'}
            onChange={() => handleFilterChange('month')}
          />
        </div>
        <div className={styles['filter-range']}>
          <span>from </span>
          <input type="date" value={fromDate} onChange={handleFromDateChange} />
          <span> to </span>
          <input type="date" value={toDate} onChange={handleToDateChange} />
         
        </div>
        <div className={styles['filter-elem']}>
          <span>All</span>
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
