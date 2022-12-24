import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  SET_AUTH_REDIRECT_PATH,
  AUTH_LOGOUT,
  AUTH_INITIATE_LOGOUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_USER,
  AUTH_CHECK_STATE
} from './types';

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (token:any, userId:any) => {
  return {
    type: AUTH_SUCCESS,
    idToken: token,
    userId
  };
};

export const authFail = (error:any) => {
  return {
    type: AUTH_FAIL,
    error
  };
};

export const logout = () => {
  return {
    type: AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime:any) => {
  return {
    type: AUTH_CHECK_TIMEOUT,
    expirationTime
  };
};

export const auth = (email:any, password:any, isSignup:any) => {
  return {
    type: AUTH_USER,
    email,
    password,
    isSignup
  };
};

export const setAuthRedirectPath = (path:any) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  return {
    type: AUTH_CHECK_STATE
  };
};
