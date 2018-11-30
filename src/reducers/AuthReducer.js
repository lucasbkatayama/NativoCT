import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  AUTH_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOGIN_USER_SUCCESS:
      return { ...state,
        password: '',
        erro: '',
        loading: false,
        user: action.payload,
      };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Falha na autenticação.', password: '', loading: false };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    default:
      return state;
  }
};
