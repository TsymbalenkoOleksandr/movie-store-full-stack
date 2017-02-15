import axios from 'axios';

// constants
const MOVIE_LOADING = 'MOVIE_LOADING';
const MOVIE_SUCCESS = 'MOVIE_SUCCESS';
const MOVIE_FAILURE = 'MOVIE_FAILURE';
const DELETE_MOVIE = 'DELETE_MOVIE';
const DELETE_SUCCESS = 'DELETE_SUCCESS';
const DELETE_FAILTURE = 'DELETE_FAILTURE';

// initial state
const initialMovie = {
	isLoading: false,
	isLoaded: false,
	item: null,
	loadError: null,
  isDeleting: false,
  isDeleted: false,
  delError: null
};

// reducer
export default function movie(state = initialMovie, action) {
  switch(action.type) {
    case MOVIE_LOADING:
     	return { ...state, isLoading: true, isLoaded: false, isDeleted: false }

    case MOVIE_SUCCESS:
     	return { ...state, item: action.payload, isLoaded: true,
        isLoading: false }

    case MOVIE_FAILURE:
    	return { ...state, isLoading: false, isLoaded: false,
        error: action.payload }

    case DELETE_MOVIE:
      return { ...state, isDeleting: true}

    case DELETE_SUCCESS:
      return { ...state, isDeleted: true, isDeleting: false }

    case DELETE_FAILTURE:
      return { ...state, error: action.payload, isDeleted: false,
        isDeleting: false }

    default:
      return state
  }
}

//actions

/**
 * Action that fetch movie from db through rest api by _id.
 * @param {string} id - recived movie _id.
 */
export function openMovie(id) {
	return function(dispatch) {
		dispatch({
			type: MOVIE_LOADING
		});

		return axios.get(`http://localhost:3001/api/from/movies/${id}`)
			.then(response => {
				dispatch({
					type: MOVIE_SUCCESS,
					payload: response.data
				});
			})
			.catch(error => {
				dispatch({
					type: MOVIE_FAILURE,
					payload: error
				});
			});
	}
}

/**
 * Action that delete movie from db through rest api by _id.
 * @param {string} id - recived movie _id.
 */
export function deleteMovie(id) {

  return function(dispatch) {
    dispatch({
      type: DELETE_MOVIE
    });

    return axios.delete(`http://localhost:3001/api/from/movies/${id}`)
      .then(response => {
        dispatch({
          type: DELETE_SUCCESS
        });
      })
      .catch(error => {
        dispatch({
          type: DELETE_FAILTURE,
          payload: error
        });
      });
  }
}
