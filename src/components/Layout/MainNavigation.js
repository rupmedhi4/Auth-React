import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate()

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/auth")
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {authCtx.isLoggedIn ? (
            <>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          ) :
          (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
