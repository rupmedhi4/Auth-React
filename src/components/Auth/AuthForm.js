import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../context/AuthContext';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(null);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    let url;

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApNjmvOyJN8_oWRAM_UJOkqsYEWd1TWGg`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApNjmvOyJN8_oWRAM_UJOkqsYEWd1TWGg`;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || 'Authentication failed!');
      }

      authCtx.login(data.idToken); 
      navigate('/profile'); 
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : isLogin ? 'Login' : 'Create Account'}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-center mt-2">{error}</p>
        )}
      </form>
    </section>
  );
};

export default AuthForm;
