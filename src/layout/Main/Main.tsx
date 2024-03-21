import Add from '../../pages/Add/Add';
import Error from '../../pages/Error/Error';
import Year from '../../pages/Year/Year';
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
                <Route path="/year" element={<Year />} />
                <Route path="*" element={<Error />} />
			</Routes>
			<Outlet />
            </div>
            </main>
        );
}