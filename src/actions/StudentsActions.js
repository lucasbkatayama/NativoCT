import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  EXERCISE_CHANGED,
  EXERCISE_CREATE_FAIL,
  EXERCISE_CREATE,
  PERFIL_FETCH_SUCCESS,
  CLASSES_FETCH_SUCCESS
} from './types';

export const exerciseChanged = ({ prop, value }) => {
  return {
    type: EXERCISE_CHANGED,
    payload: { prop, value }
  };
};

export const addExercise = ({ exerciseName, amount, measure, uid }) => {
  return (dispatch) => {
    if (exerciseName === '' || amount === '') {
      dispatch({ type: EXERCISE_CREATE_FAIL });
    } else {
      dispatch({ type: EXERCISE_CHANGED, payload: { prop: 'load', value: true } });
      const today = new Date();
      firebase.database().ref(`/users/${uid}/exercises/${exerciseName}`).update({ measure });
      firebase.database().ref(`/users/${uid}/exercises/${exerciseName}/dates/${today.getTime()}`)
        .update({ amount })
          .then(() => {
            dispatch({ type: EXERCISE_CREATE });
          })
          .catch(() => dispatch({ type: EXERCISE_CREATE_FAIL }));
    }
  };
};

export const addRecord = ({ exerciseName, amount, uid }) => {
  return (dispatch) => {
    if (exerciseName === '' || amount === '') {
      dispatch({ type: EXERCISE_CREATE_FAIL });
    } else {
      dispatch({ type: EXERCISE_CHANGED, payload: { prop: 'load', value: true } });
      const today = new Date();
      firebase.database().ref(`/users/${uid}/exercises/${exerciseName}/dates/${today.getTime()}`)
        .update({ amount })
          .then(() => {
            dispatch({ type: EXERCISE_CREATE });
          })
          .catch(() => dispatch({ type: EXERCISE_CREATE_FAIL }));
    }
  };
};

export const deleteExerciseRecord = ({ exerciseName, uid, user }) => {
  return () => {
    console.log(exerciseName + ' ' + uid + ' ' + user);
    firebase.database()
    .ref(`/users/${user}/exercises/${exerciseName}/dates/${uid}`)
    .remove();
  };
};

export const perfilFetch = (uid) => {
  return (dispatch) => {
    firebase.database().ref(`/users/${uid}/`)
    .on('value', snapshot => {
      dispatch({ type: PERFIL_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const classesFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/classes')
    .on('value', snapshot => {
      dispatch({ type: CLASSES_FETCH_SUCCESS, payload: snapshot.val() });
    });
  };
};

export const markClass = (id, date, hour, students_total, name, availableDays) => {
  return () => {
    const obj1 = {};

    obj1[id] = false;

    firebase.database().ref(`/classes/${date}/hours/${hour}/students/${id}`)
    .update({
      name,
      attendance: false
    });
    firebase.database().ref(`/classes/${date}/hours/${hour}`)
    .update({
      students_total: students_total + 1
    });
    firebase.database().ref(`/users/${id}/trains/${date}`)
    .update({
      hour
    });
    firebase.database().ref(`/users/${id}`)
    .update({
      availableDays: availableDays - 1
    });
    Actions.pop();
  };
};
