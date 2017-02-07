import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Pag from '../../components/Pagination/Pagination';

import { changePage } from '../../modules/starmovies';

function mapStateToProps({ starmovies }) {
  return {
    items: starmovies.items,
    activePage: starmovies.activePage,
    star: starmovies.star,
    isLoading: starmovies.isLoading,
    isLoaded: starmovies.isLoaded,
    error: starmovies.error
  }
}

/**
 * Render StarMovies page.
 */
class StarMovies extends Component {

  render() {

    const { items, activePage, star, isLoading, isLoaded, error } = this.props;

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
        <p>Movies with {star}</p>
        {isLoaded && !isLoading
          ? renderItems(items, activePage)
          : err(error)}
        <Pag length={items.length} activePage={activePage}
          changePage={changePage} />
      </div>
    );
  }
}

export default connect(mapStateToProps, {changePage})(StarMovies);

StarMovies.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  isLoaded: React.PropTypes.bool.isRequired,
  items: React.PropTypes.array.isRequired,
  changePage: React.PropTypes.func.isRequired
}
