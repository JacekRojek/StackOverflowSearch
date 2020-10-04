import { TYPES } from '../actions/api';

const INITIAL_STATE = {
  isFetching: false,
  results: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SEARCH:
      return { ...state, isFetching: true };
    case TYPES.SEARCH_SUCCESS:
      return { ...state, isFetching: false, results: action.payload };
    case TYPES.SEARCH_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
