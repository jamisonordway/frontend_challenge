import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import actions from '../redux/actions';
import InformationPage from './InformationPage';
import UserList from './UserList';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/informationPage" component={InformationPage} />
          <Route path="/informationPage/1002" component={InformationPage} />
          <Route path="/userList" component={UserList} />
        </Switch>
      </div>
    );
  }
}

export default connect(
  state => ({ users: state.users }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(App);
