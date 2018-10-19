import React from 'react';
import PropTypes from 'prop-types';
import * as request from 'superagent';
import { get } from 'object-path';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as _ from 'lodash';
import Header from './Header';
import Masthead from './Masthead';
import actions from '../redux/actions';
import { redirectToUserList } from '../utility/errorHandlers';
import Bar from './Bar';
import Tickmark from './Tickmark';

class InformationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: 0,
      tickOffset: 80,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);

    const reExpr = /\d+$/;
    const userIdParamMatch = reExpr.exec(window.location.href);
    let userId = -1;

    if (userIdParamMatch !== null) {
      [userId] = userIdParamMatch;
    }

    if (!Number(userId) > 0) {
      return;
    }

    request
      .get(`http://localhost:3000/api/user_info/${userId}`)
      .set('accept', 'json')
      .end((err, res) => {
        if (err) {
          redirectToUserList();
        }

        this.props.actions.viewSurveyResults(userId, res.body);
      });

    request
      .get(`http://localhost:3000/api/users/${userId}`)
      .set('accept', 'json')
      .end((err, res) => {
        if (err) {
          redirectToUserList();
        }

        this.props.actions.getSpecificUser(userId, res.body);
      });

    // this is hack to resize tickmarks upon DOM render. without setTimeout,
    // the tickmarks are rendered on the page twice.
    setTimeout(() => {
      this.updateDimensions();
    }, 1);

    this.props.actions.setSurveyContext(this.props.surveyContext);
  }

  shouldComponentUpdate(nextProps) {
    return this.state.containerWidth !== document.getElementById('Bar-tickmark-container').offsetWidth
    || this.props.surveyContext !== nextProps.surveyContext;
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  getBodyHeight() {
    return document.body.clientHeight;
  }

  updateDimensions() {
    this.setState({
      containerWidth: document.getElementById('Bar-tickmark-container').offsetWidth,
      tickOffset: document.getElementById('Bar-tickmark-container').offsetWidth / (get(this, 'props.ticks.length', 0) - 0.7),
    });
  }

  createBars(context = '') {
    if (context !== '') {
      return get(this, `props.qualities.${context}.scores`, []).map((q, index) => (<Bar key={q.id} id={index} />));
    }

    return '';
  }

  render() {
    return (
      <div>
        <Header userName={get(this, 'props.userInfo.full_name', '')} />
        <Masthead />
        <div className="pad-horiz-xl">
          <div className="Bar">
            <div className="Bar-title" />
            <div id="Bar-tickmark-container" className="Bar-bullet">
              <svg className="bullet" width="100%" height="75">
                <g transform="translate(14,5)">
                  {this.props.ticks.map((num, i) => (<Tickmark
                    showTicks
                    tickmarkHeight={this.getBodyHeight() * 0.936}
                    translateX={this.state.tickOffset * i}
                    tickNumber={num}
                    key={num}
                  />))}
                </g>
              </svg>
            </div>
          </div>
          {this.createBars(this.props.surveyContext)}
          <div className="Bar">
            <div className="Bar-title" />
            <div id="Bar-tickmark-container" className="Bar-bullet">
              <svg className="bullet" width="100%" height="75">
                <g transform="translate(14,5)">
                  {this.props.ticks.map((n, i) => (<Tickmark
                    translateX={this.state.tickOffset * i}
                    tickNumber={n}
                    key={n}
                  />))}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InformationPage.propTypes = {
  actions: PropTypes.shape({
    viewSurveyResults: PropTypes.func,
    getSpecificUser: PropTypes.func,
    setSurveyContext: PropTypes.func,
  }),
  surveyContext: PropTypes.string,
  ticks: PropTypes.array,
};

InformationPage.defaultProps = {
  actions: [
    { viewSurveyResults: () => {} },
    { getSpecificUser: () => {} },
    { setSurveyContext: () => {} },
  ],
  surveyContext: 'driver',
  ticks: _.range(-50, 60, 10),
};

export default connect(
  state => ({
    ticks: _.range(-50, 60, 10),
    qualities: get(state, 'userSurveyResults.qualities', {}),
    surveyResults: get(state, 'userSurveyResults', {}),
    userId: get(state, 'userSurveyResults.user_id', 0),
    userInfo: get(state, 'userInfo', {}),
    surveyContext: get(state, 'surveyContext', 'driver'),
  }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(InformationPage);

