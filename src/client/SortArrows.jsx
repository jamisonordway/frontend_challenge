import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'object-path';
import actions from '../redux/actions';

class SortArrows extends React.PureComponent {
  static createArrow(name, direction = '', eventHandler) {
    return (
      <button
        id={name}
        className="SortArrows-arrow-btn"
        onClick={e => eventHandler(e, name, direction)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 18 18"
        >
          <path d={direction === 'asc' ? 'M9 6l-4 4h8z' : 'M5 8l4 4 4-4z'} />
        </svg>
      </button>
    );
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, name, direction) {
    e.preventDefault();

    switch (name) {
      case 'name':
        return this.props.actions.sortByName(
          this.props.metadata,
          this.props.users,
          direction,
        );
      case 'email':
        return this.props.actions.sortByEmail(
          this.props.metadata,
          this.props.users,
          direction,
        );
      case 'survey_status':
        return this.props.actions.sortBySurveyStatus(
          this.props.metadata,
          this.props.users,
          direction,
        );
      case 'survey_date':
        return this.props.actions.sortBySurveyDate(
          this.props.metadata,
          this.props.users,
          direction,
        );
      default:
        return this.props.users;
    }
  }

  render() {
    return (
      <div className="SortArrows-arrow-container" >
        {SortArrows.createArrow(this.props.columnName, 'asc', this.handleClick)}
        {SortArrows.createArrow(this.props.columnName, 'desc', this.handleClick)}
      </div>
    );
  }
}

SortArrows.propTypes = {
  columnName: PropTypes.oneOf(['name', 'email', 'survey_status', 'survey_date']),
  actions: PropTypes.shape([{}, {}]),
  users: PropTypes.array,
  metadata: PropTypes.shape({
    count: PropTypes.number,
    limit: PropTypes.number,
    page: PropTypes.number,
    pages: PropTypes.number,
  }),
};

SortArrows.defaultProps = {
  columnName: 'name',
  actions: [],
  users: [],
  metadata: {},
};

export default connect(
  state => ({
    metadata: get(state, 'users.meta', {}),
    users: get(state, 'users.data', []),
  }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(SortArrows);
