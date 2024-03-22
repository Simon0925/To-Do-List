import Add from '../../pages/Add/Add';
import Error from '../../pages/Error/Error';
import Profile from '../../pages/Profile/Profile';
import styles from './Main.module.scss';
import { Routes, Route, Outlet } from 'react-router-dom';
import AllPosts from '../../pages/AllPosts/AllPosts';


export default  function Main (){
    return (
            <main>
            <div className={styles['main-wrap']}>
            <Routes>
                <Route path='/' element={<Add />} />
                <Route path="/posts" element={<AllPosts />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="*" element={<Error />} />
			</Routes>
			<Outlet />
            </div>
            </main>
        );
}