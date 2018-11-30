import firebase from 'firebase';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  PERFIL_FETCH_SUCCESS,
  AUTH_CHANGED
} from './types';

export const authChanged = ({ prop, value }) => {
  return {
    type: AUTH_CHANGED,
    payload: { prop, value }
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      perfilFetch(user.user.uid, dispatch);
      loginUserSuccess(dispatch, user);
    }).catch(() => loginUserFail(dispatch));
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const perfilFetch = (uid, dispatch) => {
    firebase.database().ref(`/users/${uid}/`)
    .on('value', snapshot => {
      dispatch({ type: PERFIL_FETCH_SUCCESS, payload: snapshot.val() });
    });
};
