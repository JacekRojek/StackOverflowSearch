import { TYPES } from '../actions/api';

const INITIAL_STATE = {
  isFetching: false,
  results: '',
  questionURI: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SEARCH:
      return { ...state, isFetching: true };
    case TYPES.SEARCH_SUCCESS:
      return { ...state, isFetching: false, results: action.payload };
    case TYPES.SEARCH_FAILURE:
      return { ...state, isFetching: false };
    case TYPES.SELECT_QUESTION:
      return { ...state, questionURI: action.payload };
    default:
      return state;
  }
};
