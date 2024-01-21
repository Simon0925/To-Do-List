import styles from './Navigation.module.scss';
import {  NavLink } from 'react-router-dom';


export default  function Navigation() {
    return(
        <>
        <div className={styles['nav-wrap']}>
            <nav >
                <NavLink   className={({isActive})=>isActive ? styles['active-link']:styles['nav-bar-link']}  to={'/'} >Add</NavLink>
				<NavLink  className={({isActive})=>isActive ? styles['active-link']:styles['nav-bar-link']} to={'/today'} >Today</NavLink>
				<NavLink  className={({isActive})=>isActive ? styles['active-link']:styles['nav-bar-link']} to={'/week'} >Week</NavLink>
				<NavLink  className={({isActive})=>isActive ? styles['active-link']:styles['nav-bar-link']} to={'/month'} >Month</NavLink>
				<NavLink  className={({isActive})=>isActive ? styles['active-link']:styles['nav-bar-link']} to={'/Year'} >Year</NavLink>
            </nav>
        </div>
        </>
    );
}