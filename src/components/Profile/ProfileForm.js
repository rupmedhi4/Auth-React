import { useRef, useContext, useState } from 'react';
import AuthContext from '../context/AuthContext'; // update the path as per your project
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const enteredNewPassword = newPasswordRef.current.value;

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyApNjmvOyJN8_oWRAM_UJOkqsYEWd1TWGg',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredNewPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || 'Password update failed!');
      }

      alert('Password updated successfully!');

    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} required />
      </div>
      <div className={classes.action}>
        <button disabled={isLoading}>{isLoading ? 'Changing...' : 'Change Password'}</button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default ProfileForm;
