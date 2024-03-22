import styles from './Navigation.module.scss';
import {  NavLink } from 'react-router-dom';


export default  function Navigation() {
    return(
        <>
        <div className={styles['nav-wrap']}>
            <nav >
                <NavLink   className={({isActive})=>isActive ? styles['active-link']:styles['nav-bar-link']}  to={'/'} >Add</NavLink>
				<NavLink  className={({isActive})=>isActive ? styles['active-link']:styles['nav-bar-link']} to={'/posts'} >Posts</NavLink>
				<NavLink  className={({isActive})=>isActive ? styles['active-link']:styles['nav-bar-link']} to={'/profile'} >Profile</NavLink>
            </nav>
        </div>
        </>
    );
}