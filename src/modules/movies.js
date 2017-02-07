import axios from 'axios';

// constants
const MOVIES_LOADING = 'MOVIES_LOADING';
const MOVIES_SUCCESS = 'MOVIES_SUCCESS';
const MOVIES_FAILURE = 'MOVIES_FAILURE';
const CHANGE_PAGE = 'CHANGE_PAGE';

// initial state
const initialMovies = {
	isLoading: false,
	isLoaded: false,
	items: [],
	error: null,
	activePage: 1,
	search: undefined,
	sort: false
};

// reducer
export default function movies(state = initialMovies, action) {
  switch(action.type) {
    case MOVIES_LOADING:
     	return { ...state, isLoading: true, isLoaded: false }

    case MOVIES_SUCCESS:
     	return { ...state, items: action.payload, isLoaded: true,
     		isLoading: false, search: action.search, sort: action.sort }

    case MOVIES_FAILURE:
    	return { ...state, isLoading: false, isLoaded: false,
    		error: action.payload }

    case CHANGE_PAGE:
     	return { ...state, activePage: action.activePage }

    default:
      return state
  }
}

//actions

/**
 * Action that fetch movies from db through rest api.
 */
export function fetchMovies() {
	return function(dispatch) {
		dispatch({
			type: MOVIES_LOADING,
		});

		return axios.get('/api/from/movies/')
			.then(response => {
				dispatch({
					type: MOVIES_SUCCESS,
					payload: response.data,
					search: undefined,
					sort: false
				});
			})
			.catch(error => {
				dispatch({
					type: MOVIES_FAILURE,
					payload: error
				});
			});
	}
}

/**
 * Action that fetch searched movies from db through rest api by title.
 * @param {string} query - recived movie title.
 */
export function fetchSearch(query) {
	return function(dispatch) {
		dispatch({
			type: MOVIES_LOADING,
		});

		return axios.get(`/api/search/title/${query}`)
			.then(response => {
				dispatch({
					type: MOVIES_SUCCESS,
					payload: response.data,
					search: query,
					sort: false
				});
			})
			.catch(error => {
				dispatch({
					type: MOVIES_FAILURE,
					payload: error
				});
			});
	}
}

/**
 * Action that fetch sorted movies from db through rest api by title, A-Z.
 */
export function fetchSorted() {
	return function(dispatch) {
		dispatch({
			type: MOVIES_LOADING
		});

		return axios.get('/api/sorted/from/movies')
			.then(response => {
				dispatch({
					type: MOVIES_SUCCESS,
					payload: response.data,
      		sort: true
				});
			})
			.catch(error => {
				dispatch({
					type: MOVIES_FAILURE,
					payload: error
				});
			});
	}
}

/**
 * Action that change page for pagination.
 * @param {number} pagkey - recived page number.
 */
export function changePage(pagkey) {
	return function(dispatch) {
    dispatch({
      type: CHANGE_PAGE,
      activePage: pagkey
    });
	}
}
