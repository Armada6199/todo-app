import React, { useEffect, useReducer } from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import { initialState, loginReducer } from '../../hooks/Reducer/loginReducer';

const testUsers = {
  Administrator: {
    password: 'admin',
    name: 'admin',
    token: '12312fdsrfwrfwefc23w4234d',
  },
  Editor: {
    password: 'editor',
    name: 'editor',
    token: '312cewdc231d23d23d23d23',
  },
  Writer: {
    password: 'writer',
    name: 'writer',
    token: 'd32d23er23d23d23d23d',
  },
  User: {
    password: 'user',
    name: 'user',
    token: 'd32d2323432423423fsdf',
  },
};

export const LoginContext = React.createContext();

function LoginProvider(props) {
  const [loginData, dispatch] = useReducer(loginReducer, initialState);

  function can(capability) {
    return loginData.user.capabilities?.includes(capability);
  }

  async function login(username, password) {
    const auth = testUsers[username];
    if (auth && auth.password === password) {
      try {
        validateToken(auth.token);
      } catch (e) {
        setLoginState(false, null, {}, e);
        console.error(e);
      }
    }
  }

  function logout() {
    setLoginState(false, null, {});
  }

  function validateToken(token) {
    try {
      const validUser = jwt_decode(token);
      setLoginState(true, token, validUser);
    } catch (e) {
      setLoginState(false, null, {}, e);
      console.log('Token Validation Error', e);
    }
  }

  function setLoginState(loggedIn, token, user, error) {
    cookie.save('auth', token);
    dispatch({ type: 'changeLoginStatus', payload: loggedIn });
    dispatch({ type: 'changeToken', payload: token });
    dispatch({ type: 'changeUser', payload: user });
    dispatch({ type: 'changeError', payload: error });
  }

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);
  }, []);

  return (
    <LoginContext.Provider value={{ can, login, logout, loginData, dispatch }}>
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
