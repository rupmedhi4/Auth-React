import React, { useState, useEffect, useCallback } from 'react';

const AuthContext = React.createContext();

let logoutTimer;

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);

    logoutTimer = setTimeout(logoutHandler, 30 * 60 * 1000); 
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      logoutTimer = setTimeout(logoutHandler, 30 * 60 * 1000);
    }
  }, [logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
