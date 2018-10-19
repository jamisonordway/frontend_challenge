import React from 'react';
import * as request from 'superagent';
import { get } from 'object-path';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import actions from '../redux/actions';
import Pagination from './Pagination';
import InformHeader from './InformHeader';
import SortArrows from './SortArrows';

class UserList extends React.Component {
  static listUsers(users = []) {
    if (users.length === 0) {
      return (<tr><td style={{ border: 'none' }}>&nbsp;</td></tr>);
    }

    return users.map(user => (
      <tr key={user.id} className="bg-gray">
        <td id="UserList-fullname" className="text-size-xxl">{user.full_name}</td>
        <td id="UserList-email">{user.email}</td>
        <td id="UserList-surveyStatus" className="text-size-md">
          <a href={`/informationPage/${user.id}`}>
            <button>VIEW</button>
          </a>
        </td>
        <td id="UserList-surveyDate">{moment(user.survey_date).format('MMMM Do, YYYY')}</td>
      </tr>
    ));
  }

  static createSortArrows(columns = []) {
    return columns.map(c => (
      <th key={c} className="text-size-sm"> {c}
        <SortArrows columnName={c.replace(' ', '_').toLowerCase()} />
      </th>
    ));
  }

  componentDidMount() {
    request
      .get('http://localhost:3000/api/users')
      .set('accept', 'json')
      .end((err, res) => {
        this.props.actions.addUserList(res.body);
      });
  }

  render() {
    return (
      <div>
        <InformHeader />
        <div className="table-responsive pad-top-lg pad-horiz-xxl">
          <table id="UserList-table" className="table">
            <thead>
              <tr>
                {UserList.createSortArrows(this.props.columns)}
              </tr>
            </thead>
            <tbody>
              {UserList.listUsers(this.props.users)}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>
    );
  }
}

UserList.propTypes = {
  actions: PropTypes.shape([]),
  users: PropTypes.array,
  columns: PropTypes.array,
};

UserList.defaultProps = {
  actions: [],
  users: [],
  columns: ['Name', 'Email', 'Survey Status', 'Survey Date'],
};

export default connect(
  state => ({
    metadata: get(state, 'users.meta', {}),
    users: get(state, 'users.data', []),
  }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(UserList);
