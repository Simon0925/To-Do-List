import { useSelector } from 'react-redux';
import Filter from '../../component/Filter/Filter';
import Posts from '../../component/Posts/Posts';
import styles from './AllPosts.module.scss';
import type { RootState } from '../../store/store';


export default function AllPosts() {
    const filterState = useSelector((state: RootState) => state.filter);
    const { selectedFilter, fromDate, toDate } = filterState;
    return (
        <div className={styles['wrap']}>
            <Posts selectedFilter={selectedFilter} fromDate={fromDate} toDate={toDate} />
            <Filter />
        </div>
    );
}
