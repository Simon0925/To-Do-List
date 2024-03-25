import SearchSvg from '../../UI/SearchSvg/SearchSvg'

import styles from './Posts.module.scss'
import type { AppDispatch, RootState } from '../../store/store'
import { useDispatch as useReduxDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchPosts,deletePost, Post } from '../../store/post.slice';

import TaskWrap from '../TaskWrap/TaskWrap';


interface PostsProps {
    selectedFilter: string;
    fromDate:string;
    toDate:string;
}


export default function Posts ({selectedFilter,fromDate,toDate}:PostsProps){

    const useDispatch = () => useReduxDispatch<AppDispatch>();

    const dispatch = useDispatch();

    const posts = useSelector((state: RootState) => state.post.posts);
    
    const [search , setSearch] = useState('');

    const [result, setResult] = useState(posts);
    
    useEffect(() => {
        setResult(posts);
    }, [posts]);

    useEffect(() => {
        const filteredPosts = posts.filter((word) => word.title.toLowerCase().startsWith(search.trim().toLowerCase()));
        setResult(filteredPosts);
    }, [posts, search]);
    
    useEffect(() => {
        setResult(applyFilters(posts));
    }, [selectedFilter, posts, fromDate, toDate, search]);


    const applyFilters = (posts: Post[]) => {
        let filteredPosts = posts;

        switch (selectedFilter) {
            case 'today':
                filteredPosts = posts.filter(post => post.date === new Date().toISOString().split('T')[0]);
                break;
            case 'tomorrow':
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                filteredPosts = posts.filter(post => post.date === tomorrow.toISOString().split('T')[0]);
                break;
            case 'week':
                const { startOfWeek, endOfWeek } = getWeekRange();
                filteredPosts = posts.filter(post => post.date >= startOfWeek && post.date <= endOfWeek);
                break;
            case 'month':
                const { startOfMonth, endOfMonth } = getMonthRange();
                filteredPosts = posts.filter(post => post.date >= startOfMonth && post.date <= endOfMonth);
                break;
            case 'all':
                filteredPosts = posts.filter(word => word.title.toLowerCase().startsWith(search.trim().toLowerCase()));
                break;
            case 'range':
                console.log('switch:')
                 filteredPosts = filteredPosts.filter(post => post.date >= fromDate && post.date <= toDate);

                break;
            default:
                break;
        }
        if (search && search.trim() !== '') {
            filteredPosts = filteredPosts.filter(word => word.title.toLowerCase().startsWith(search.trim().toLowerCase()));
        }

       
        return filteredPosts;
    };
    
    

    const getWeekRange = () => {
        const currentDate = new Date();
        const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
        const lastDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7));
        return {
            startOfWeek: firstDayOfWeek.toISOString().split('T')[0],
            endOfWeek: lastDayOfWeek.toISOString().split('T')[0]
        };
    };

    const getMonthRange = () => {
        const currentDate = new Date();
        const startOfMonth = currentDate.toISOString().split('T')[0];
        const endOfMonth = new Date(currentDate.getTime() + 31 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        return { startOfMonth, endOfMonth };
    };

    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);

    const handleDelete = (id:string) => {
        dispatch(deletePost(id));
      };


    return(
        <div className={styles['to-do-list-wrap']}>
                    <div className={styles['search-container']}>
                        <span><SearchSvg/></span>
                        <input className={styles['search-inpt']} value={search} onChange={(e) => setSearch(e.target.value) } placeholder='Search task'/>   
                    </div>
                    <div className={styles['task-wrap']}> 
                        {result.map((elem) => (
                            <TaskWrap key={elem.id} title={elem.title} date={elem.date} time={elem.time} onDelete={() =>  handleDelete(elem.id)} id={elem.id} text={elem.note} /> 
                        ))}
                    </div>
                </div>
    )
}