import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { addMovie } from '../../modules/addmovie';

function mapStateToProps({ addmovie }) {
  return {
    isAdding: addmovie.isAdding,
    isAdded: addmovie.isAdded,
    error: addmovie.error
  }
}

/**
 * Render AddMovie page.
 */
class AddMovie extends Component {

  constructor() {
    super();
    this.state = {
      file: undefined,
      title: undefined,
      year: undefined,
      format: undefined,
      stars: undefined,
    };
  }

  /**
   * Submit file button event, read .txt file and call addMovie action.
   * @param  {object} e - submit file button event.
   */
  handleSubmitFile = (e) => {
    e.preventDefault();

    const file = this.state.file
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      this.props.addMovie(reader.result.toString());
    };
  };

  /**
   * Submit manual added movie, call addMovie action.
   * @param  {[type]} e - submit manual added movie button event.
   */
  handleSubmitMovie = (e) => {
    e.preventDefault();

    this.props.addMovie({
      title: this.state.title,
      year: this.state.year,
      format: this.state.format,
      stars: this.state.stars,
    });
  };

  /**
   * Write choosed file to state.
   * @param  {[type]} e - onChange file input event.
   */
  handleFile = (e) => {this.setState({ file: e.target.files[0]})};

  /**
   * Stupid validator.
   * @return {boolean} enable or not enable add movie button.
   */
  handleSubmitButton = () => {
    if (this.state.title !== ''
      && !isNaN(this.state.year)
      && this.state.format
      && this.state.stars !== ''
      && this.state.year >= 1896 // first movie ever made :D
      && this.state.year <= 2030
      && isNaN(this.state.title)
      && isNaN(this.state.stars)) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * File validator.
   * @return {boolean} enable or not enable add file button.
   */
  handleFileButton = () => {
    if (this.state.file) {
      return false;
    } else {
      return true;
    }
  };

  /**
   * Make actorc to uppercase.
   */
  handleActors = (e) => {
    this.setState({
      stars: e.target.value.split(', ').map(item => item.split(' ')
        .map(item => item.charAt(0).toUpperCase() + item.slice(1))
        .join(' ')).join(', ')
    })
  };

  render() {

    const { isAdding, isAdded, error } = this.props;

    /**
     * Render:
     * @return {string} 'Adding' - while adding.
     * @return forms: 
     * Manual adding movie;
     * File adding.
     */
    const add = () => {
      if (isAdding) return 'Adding';
      else return (
        <div>
          <div>
            <p>Fill form to add new movie</p>
            <form className="post-form" onSubmit={this.handleSubmitMovie}>
              <div>
                Title:
                <input
                  onChange={(e) => this.setState({
                    title: e.target.value.charAt(0).toUpperCase()
                      + e.target.value.slice(1)
                  })}
                  type="text"
                  placeholder="Enter title" />
              </div>
              <div>
                Year:
                <input
                  onChange={(e) => this.setState({
                    year: parseInt(e.target.value, 10)
                  })}
                  type="text"
                  placeholder="Enter year 1896-2030" />
              </div>
              <div>
                <select
                  onChange={(e) => this.setState({ format: e.target.value })} >
                  <option disabled selected>Choose format</option>
                  <option>Blu-Ray</option>
                  <option>DVD</option>
                  <option>VHS</option>
                </select>
              </div>
              <div>
                Stars:
                <input
                  onChange={this.handleActors}
                  type="text"
                  placeholder="Enter stars separated by ," />
              </div>
              <button disabled={this.handleSubmitButton()}
                type="submit" >Add Movie</button>
            </form>
          </div>
          <br></br>
          <div>
            <p>Or choose .txt file to load</p>
            <form className="post-form" onSubmit={this.handleSubmitFile}>
              <input
                onChange={this.handleFile}
                type="file" />
              <button disabled={this.handleFileButton()}
                type="submit" >Add File</button>
            </form>
          </div>
        </div>);
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
      <div className="addmovie">
        <Link to={'/'} >
          Home Page
        </Link>
        {add()}
        {isAdded && !isAdding
          ? 'Loaded'
          : err(error)}
      </div>
    );
  }
}

export default connect(mapStateToProps, {addMovie})(AddMovie);

AddMovie.propTypes = {
  isAdding: React.PropTypes.bool.isRequired,
  isAdded: React.PropTypes.bool.isRequired,
  addMovie: React.PropTypes.func.isRequired
};
