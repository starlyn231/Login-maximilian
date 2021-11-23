import classes from './ProfileForm.module.css';
import React,{useRef} from 'react'

const ProfileForm = () => {
  const newPasswordInpuRef = useRef();



  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
