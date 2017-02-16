import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { openMovie, deleteMovie } from '../../modules/movie';

function mapStateToProps({ movie, deletemovie }) {
  return {
    item: movie.item,
    isDeleting: movie.isDeleting,
    isDeleted: movie.isDeleted,
    delError: movie.error,
    isLoading: movie.isLoading,
    isLoaded: movie.isLoaded,
    loadError: movie.loadError
  }
}

/**
 * Render FullMovie page.
 */
class FullMovie extends Component {

  constructor() {
    super();
    this.state = {
      wtdelete: false
    };
  }

  /**
   * When delete button is clicked set state wtdelete to true.
   */
  handleDelete = () => {
    this.setState({wtdelete: true});
  };

  /**
   * Handle Yes button, call deleteMovie action.
   */
  handleYes = () => {
    this.props.deleteMovie(this.props.item._id);
  };

  /**
   * When No button is clicked set state wtdelete to false.
   */
  handleNo = () => {
    this.setState({wtdelete: false});
  };

  render() {

    const { item, isDeleting, isDeleted, delError,
      isLoading, isLoaded, loadError } = this.props;

    /**
     * Render:
     * @return {object} delError - if got error when deleting.
     * @return {string} 'Deleting' - while deleting.
     * @return buttons: 
     * Delete Movie if wtdelete is false;
     * Yes, No after Delete Movie was clicked.
     */
    const renderDelete = () => {
      if (delError) return JSON.stringify(delError) + ' Try again';
      if (isDeleting) return 'Deleting';
      else return (
        <div>
          {this.state.wtdelete
            ? (<div>
                Are you sure?
                <button type="button"
                  onClick={this.handleYes} >Yes</button>
                <button type="button"
                  onClick={this.handleNo} >No</button>
              </div>)
            : <button type="button"
                onClick={this.handleDelete} >Delete Movie</button>
          }
        </div>
      );
    };

    /**
     * Render:
     * @return {object} loadError - if got error when loading.
     * @return {string} 'Loading' - while deleting.
     * @return movie informatio.
     */
    const renderMovie = (item) => {
      if (isLoading) return 'Loading';
      else return (
        <div>
          <p>{'id: ' + item._id}</p>
          <p>{'Title: ' + item.title}</p>
          <p>{'Year: ' + item.year}</p>
          <p>Format: {item.format}</p>
          {item.stars
            ? <div>Stars: {item.stars.split(', ').map(item => (
                <p key={item} >
                  <Link to={`/star/${item}`} >
                    {item}
                  </Link>
                </p>))}
              </div>
            : null}
        </div>
      );
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
      <div className="fullmovie">
        <Link to={'/'} >
          Home Page
        </Link>
        {isLoaded && !isLoading
          ? renderMovie(item)
          : err(loadError)}
        {isDeleted
          ? (<div>
              <p>Movie has been deleted!</p>
              <Link to={'/'} >
                {'To Home Page'}
              </Link>
            </div>)
          : renderDelete()}
      </div>
    );
  }
}

export default connect(mapStateToProps, {openMovie, deleteMovie})(FullMovie);

FullMovie.propTypes = {
  isLoading: React.PropTypes.bool.isRequired,
  isLoaded: React.PropTypes.bool.isRequired,
  openMovie: React.PropTypes.func.isRequired,
  deleteMovie: React.PropTypes.func.isRequired,
  item: React.PropTypes.object.isRequired,
  isDeleting: React.PropTypes.bool.isRequired,
  isDeleted: React.PropTypes.bool.isRequired
};
