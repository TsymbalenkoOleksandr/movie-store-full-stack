import axios from 'axios';

// constants
const STAR_LOADING = 'STAR_LOADING';
const STAR_SUCCESS = 'STAR_SUCCESS';
const STAR_FAILURE = 'STAR_FAILURE';
const CHANGE_PAGE = 'CHANGE_PAGE';

// initial state
const initialStarMovies = {
	isLoading: false,
	isLoaded: false,
	items: [],
	error: null,
	activePage: 1,
	star: null
};

//reducer
export default function starmovies(state = initialStarMovies, action) {
  switch(action.type) {
    case STAR_LOADING:
     	return { ...state, isLoading: true, isLoaded: false }

    case STAR_SUCCESS:
     	return { ...state, items: action.payload, isLoaded: true,
     		isLoading: false, star: action.star }

    case STAR_FAILURE:
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
 * Action that fetch searched movies from db through rest api by star.
 * @param {string} query - recived movie star.
 */
export function fetchStarMovies(query) {
	return function(dispatch) {
		dispatch({
			type: STAR_LOADING,
		});

		return axios.get(`http://localhost:3001/api/search/stars/${query}`)
			.then(response => {
				dispatch({
					type: STAR_SUCCESS,
					payload: response.data,
					star: query
				});
			})
			.catch(error => {
				dispatch({
					type: STAR_FAILURE,
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
