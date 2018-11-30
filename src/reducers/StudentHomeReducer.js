import {
  EXERCISE_CHANGED,
  PERFIL_FETCH_SUCCESS,
  EXERCISE_CREATE,
  EXERCISE_CREATE_FAIL,
  EXERCISE_FETCH_SUCCESS,
  CLASSES_FETCH_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  exerciseName: '',
  measure: 'm',
  amount: '',
  perfil: {},
  exerciseModal: false,
  exerciseItemModal: false,
  erro: '',
  load: false,
  exercises: {},
  editExerciseModal: false,
  modalDeleteRecord: false,
  updateKey: '',
  exerciseItem: {},
  classes: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EXERCISE_CREATE:
      return {
        ...state,
        exerciseName: '',
        measure: 'm',
        amount: '',
        exerciseModal: false,
        erro: '',
        load: false,
        editExerciseModal: false,
        updateKey: Math.random()
      };
    case EXERCISE_CREATE_FAIL:
      return { ...state, erro: 'Falha ao Criar Exercício', load: false };
    case CLASSES_FETCH_SUCCESS:
      return { ...state, classes: action.payload };
    case PERFIL_FETCH_SUCCESS:
      return { ...state, perfil: action.payload };
    case EXERCISE_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case EXERCISE_FETCH_SUCCESS:
      return { ...state, exerciseItem: action.payload };
    default:
      return state;
  }
};
