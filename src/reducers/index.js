import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import StudentHomeReducer from './StudentHomeReducer';

export default combineReducers({
  auth: AuthReducer,
  studentHome: StudentHomeReducer,
});
