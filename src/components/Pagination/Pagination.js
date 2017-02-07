import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

/**
 * Render pagination, optimized to load 10 movies per page
 */
export default class Pag extends Component {

  componentDidMount() {
    this.props.changePage(this.props.activePage);
  }

  handleSelect = (eventKey) => {
    this.props.changePage(eventKey);
  }

  render() {

    const { activePage, length } = this.props;

    const pag = (activePage, length) => {
      if (length > 10) {
        return (
          <Pagination
            prev={activePage === 1 ? false : true}
            next={activePage === Math.ceil((length)/10) ? false : true}
            first={activePage <= 2 ? false : true}
            last={activePage >= Math.ceil((length)/10) - 1 ? false : true}
            ellipsis
            boundaryLinks
            items={Math.ceil((length)/10)}
            maxButtons={5}
            activePage={activePage}
            onSelect={this.handleSelect} />);
      } else return '';
    }

    return (
      <div className="pagination">
        {pag(activePage, length)}
      </div>
    );
  }
}

Pag.propTypes = {
  length: React.PropTypes.number.isRequired,
  activePage: React.PropTypes.number.isRequired,
  changePage: React.PropTypes.func.isRequired
};
