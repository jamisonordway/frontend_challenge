import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'object-path';
import * as request from 'superagent';
import actions from '../redux/actions';

class Pagination extends React.Component {
  static createPageLinks(itemCount = 0, limit = 10, handleMove, currentPage) {
    if (itemCount === 0) return '';

    let totalPages = itemCount / limit;
    const pageLinks = [];
    let i = 0;

    // limit display to 7 page links
    if (totalPages > 7) {
      totalPages = currentPage + 3;
      i = currentPage - 4;
    }

    for (; i < totalPages + 2; i += 1) {
      let label = '';
      let isDisabled = false;
      let isActive = false;
      let nextPage = 1;

      switch (true) {
        case i === currentPage - 4:
          label = 'PREVIOUS';
          isDisabled = currentPage === 1;
          nextPage = currentPage - 1;
          break;
        case i === (totalPages + 1):
          label = 'NEXT';
          isDisabled = currentPage === totalPages;
          nextPage = currentPage + 1;
          break;
        default:
          label = i;
          isActive = currentPage === i;
          nextPage = i;
      }

      const classes = `page-item ${isDisabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`;


      /* eslint-disable */
      if (i > 0 || i === currentPage - 4) {
        pageLinks.push(<li className={classes} key={i}>
          <a className="page-link" href="#" onClick={e => handleMove(e, nextPage)}>{label}</a>
        </li>);
      }
      /* eslint-enable */
    }

    return pageLinks;
  }
  constructor(props) {
    super(props);

    this.moveToPage = this.moveToPage.bind(this);
  }

  moveToPage(e, page) {
    e.preventDefault();
    request
      .get('http://localhost:3000/api/users')
      .query({ page })
      .set('accept', 'json')
      .end((err, res) => {
        this.props.actions.moveToPage(page, res.body);
      });
  }

  render() {
    if (this.props.itemCount < 1) return '';

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {Pagination.createPageLinks(
            this.props.itemCount,
            this.props.limit,
            this.moveToPage,
            this.props.currentPage,
          )}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemCount: PropTypes.number,
  limit: PropTypes.number,
  actions: PropTypes.shape([]),
  currentPage: PropTypes.number,
};

Pagination.defaultProps = {
  itemCount: 0,
  limit: 20,
  actions: [],
  currentPage: 1,
};

export default connect(
  state => ({
    limit: parseInt(get(state, 'users.meta.limit', 20), 10),
    itemCount: get(state, 'users.meta.count', 0),
    currentPage: get(state, 'currentPage', 1),
  }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(Pagination);
