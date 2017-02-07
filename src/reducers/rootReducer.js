import {combineReducers} from "redux";

import movies from "../modules/movies";
import movie from "../modules/movie";
import addmovie from "../modules/addmovie";
import starmovies from "../modules/starmovies";

const rootReducer = combineReducers({
  movies: movies,
  movie: movie,
  addmovie: addmovie,
  starmovies: starmovies
});

export default rootReducer;
