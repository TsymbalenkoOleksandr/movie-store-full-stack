import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Pag from '../../components/Pagination/Pagination';

import {
  fetchSorted,
  changePage,
  fetchMovies,
  fetchSearch
} from '../../modules/movies';

import './Movies.css';

function mapStateToProps({ movies }) {
  return {
    items: movies.items,
    activePage: movies.activePage,
    search: movies.search,
    sort: movies.sort,
    isLoading: movies.isLoading,
    isLoaded: movies.isLoaded,
    error: movies.error
  }
}

const mapDispatchToProps = {
  fetchSorted,
  changePage,
  fetchMovies,
  fetchSearch
};

/**
 * Render Movies/Main page.
 */
class Movies extends Component {

  constructor() {
    super();
    this.state = {
      showSort: true,
    };
  }

  /**
   * Handle search query and call fetchSearch action or fetchMovies if
   * query is empty, change page to 1.
   * @param  {[type]} e - onChange search input event.
   * showSort - param that show Sort/Unsort buttons or not.
   */
  handleChangeQuery = (e) => {
    this.props.changePage(1);
    if (e.target.value === '') {
      this.setState({showSort: true, search: undefined});
      this.props.fetchMovies();
    } else {
      this.setState({showSort: false, search: e.target.value});
      this.props.fetchSearch(e.target.value);
    }
  };

  /**
   * Handle Sort button, call fetchSorted movies action, change page to 1.
   */
  handleSort = () => {
    this.props.fetchSorted();
    this.props.changePage(1);
  };

  /**
   * Handle Unsort button, call fetchMovies action, change page to 1.
   */
  handleUnsort = () => {
    this.props.fetchMovies();
    this.props.changePage(1);
    
  };

  render() {

    const { items, activePage, changePage, search, sort,
      isLoading, isLoaded, error } = this.props;

    /**
     * Render movies.
     * @param  {array} items - loaded movies.
     * @param  {number} activePage - active page.
     * @return {string} 'Loading' - while deleting.
     * @return {array} - array movies title with link to FullMovie page.
     */
    const renderItems = (items, activePage) => {
      if (isLoading) return 'Loading';
      else {
        // load 10 movies per page, hardcode, sry :(
        const res = items.slice((activePage - 1) * 10, activePage * 10);

        return res.map(item => (
          <p key={item._id} >
            <Link to={`/movie/${item._id}`} >
              {item.title}
            </Link>
          </p>));
      }
    };

    /**
     * Render Sort or Unsort if already sorted buttons.
     */
    const renderSort = () => {
      if (sort) {
        return <button type="button"
          onClick={this.handleUnsort} >Unsort</button>;
      } else {
        return <button type="button"
          onClick={this.handleSort} >Sort A-Z</button>;
      }
    };

    /**
     * Render error.
     * @param  {object} err - error.
     * @return {string} - error message.
     */
    const err = (err) => {
      console.log(err);

      return 'Error, try to reload page. Watch console for details.'
    };

    return (
      <div className="main">
        <div className="search">
          {/*Search input*/}
          <input onChange={this.handleChangeQuery} value={search || ''}
            placeholder='Search...' />
        </div>
        {/*Doesn't render Sort/Unsort buttons if searched movies is fetched*/}
        {this.state.showSort
          ? renderSort()
          : ''}
        {isLoaded && !isLoading
          ? renderItems(items, activePage)
          : err(error)}
        <Pag length={items.length} activePage={activePage}
          changePage={changePage} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);

Movies.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  isLoaded: React.PropTypes.bool.isRequired,
  items: React.PropTypes.array.isRequired,
  fetchSorted: React.PropTypes.func.isRequired,
  changePage: React.PropTypes.func.isRequired,
  fetchMovies: React.PropTypes.func.isRequired,
  fetchSearch: React.PropTypes.func.isRequired,
  activePage: React.PropTypes.number.isRequired,
  sort: React.PropTypes.bool.isRequired
};
