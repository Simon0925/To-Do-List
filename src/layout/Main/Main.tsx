import Add from '../../pages/Add/Add';
import Error from '../../pages/Error/Error';
import Month from '../../pages/Month/Month';
import Today from '../../pages/Today/Today';
import Week from '../../pages/Week/Week';
import Year from '../../pages/Year/Year';
import styles from './Main.module.scss';
import { Routes, Route, Outlet } from 'react-router-dom';


export default  function Main (){
    return (
            <main>
            <div className={styles['main-wrap']}>
            <Routes>
                <Route path='/' element={<Add />} />
                <Route path="/contact" element={<Today />} />
                <Route path="/resume" element={<Week />} />
                <Route path="/services" element={<Month />} />
                <Route path="/portfolio" element={<Year />} />
                <Route path="*" element={<Error />} />
			</Routes>
			<Outlet />
            </div>
            </main>
        );
}