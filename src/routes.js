import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App/App';
import StarMovies from './containers/StarMovies/StarMovies';
import Movies from './containers/Movies/Movies';
import AddMovie from './containers/AddMovie/AddMovie';
import FullMovie from './containers/FullMovie/FullMovie';

import { fetchMovies, fetchSearch, fetchSorted } from './modules/movies';
import { openMovie } from './modules/movie';
import { fetchStarMovies } from './modules/starmovies';

/**
 * Function that call fetchMovies/fetchSorted/fetchSearch when Movies component
 * did/will mount.
 */
const onMoviesEnter = ({ dispatch, getState }) => (nextState, replace, next) => {
	if (getState().movies.sort) {
		dispatch(fetchSorted())
	    .then(() => { next(); });
	} else {
		if (getState().movies.search) {
			dispatch(fetchSearch(getState().movies.search))
		    .then(() => { next(); });
		} else {
			dispatch(fetchMovies())
		    .then(() => { next(); });
		}
	}
};

/**
 * Function that call openMovie when Movie component did/will mount.
 */
const onFullMovieEnter = ({ dispatch }) => (nextState, replace, next) => {
	dispatch(openMovie(nextState.params.id))
		.then(() => { next(); })
    .catch((error) => { /* handler */ });
};

/**
 * Function that call fetchStarMovies when StarMovie component did/will mount.
 */
const onStarMoviesEnter = ({ dispatch }) => (nextState, replace, next) => {
	dispatch(fetchStarMovies(nextState.params.star))
		.then(() => { next(); })
    .catch((error) => { /* handler */ });
};

/**
 * Router.
 * App - main component.
 * Movies renders under App by default.
 * Other render under App by paths.
 */
export default (store) => (
	<Router history={hashHistory}>
		<Route path="/" component={App} >
			<IndexRoute component={Movies} onEnter={onMoviesEnter(store)} />
			<Route path="/addmovie" component={AddMovie} />
			<Route path='/movie/:id' component={FullMovie}
				onEnter={onFullMovieEnter(store)} />
			<Route path='/star/:star' component={StarMovies}
				onEnter={onStarMoviesEnter(store)} />
		</Route>
	</Router>
);
