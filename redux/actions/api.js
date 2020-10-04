export const TYPES = {
  SEARCH: 'SEARCH',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SEARCH_FAILURE: 'SEARCH_FAILURE',
};

const URL = 'https://api.stackexchange.com/2.2/';

export const getSearchResults = (searchQuery) => async (dispatch) => {
  dispatch({ type: TYPES.SEARCH });
  try {
    const resp = await fetch(`${URL}search?order=desc&sort=activity&intitle=${searchQuery}&site=stackoverflow`);
    const json = await resp.json();
    dispatch({
      type: TYPES.SEARCH_SUCCESS,
      payload: json.items,
    });
  } catch (e) {
    dispatch({
      type: TYPES.SEARCH_FAILURE,
      payload: 'Network Error',
    });
  }
};
