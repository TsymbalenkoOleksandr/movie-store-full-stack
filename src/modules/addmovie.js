import axios from 'axios';
import { convert } from '../utils/utils';

// constants
const ADD_MOVIES = 'ADD_MOVIES';
const ADD_SUCCESS = 'ADD_SUCCESS';
const ADD_FAILTURE = 'ADD_FAILTURE';

// initial state
const initialAdd = {
	isAdding: false,
	isAdded: false,
	error: null
};

// reducer
export default function addmovie(state = initialAdd, action) {
  switch(action.type) {
    case ADD_MOVIES:
    	return { ...state, isAdding: true}

    case ADD_SUCCESS:
    	return { ...state, isAdded: true, isAdding: false }

    case ADD_FAILTURE:
    	return { ...state, error: action.payload, isAdded: false,
    		isAdding: false }

    default:
      return state
  }
}

//actions

/**
 * Action that add movie into db through rest api.
 * @param {object or plain text string} movie - recived movie.
 */
export function addMovie(movie) {
	// if movie is not object, convert it to from plain text string.
	const movies = typeof movie === 'object' ? movie : convert(movie);

	return function(dispatch) {
		dispatch({
			type: ADD_MOVIES
		});

		return axios.post('http://localhost:3001/api/into/movies', movies)
			.then(response => {
				dispatch({
					type: ADD_SUCCESS
				});
			})
			.catch(error => {
				dispatch({
					type: ADD_FAILTURE,
					payload: error
				});
			});
	}
}
