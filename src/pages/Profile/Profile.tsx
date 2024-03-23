
import InptDate from '../../component/InptDate/InptDate';
import styles from './Profile.module.scss';


export default function Profile() {

   

  return (
    <>
      <div className={styles['wrap']}>
      Profile
      <input type='date'/> 
      </div>
      <InptDate />
    </>
  );
}
