import React from 'react';
import { get } from 'object-path';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import actions from '../redux/actions';

class Masthead extends React.PureComponent {
  titleCase(str = '') {
    const tcString = str.toLowerCase();

    return tcString.charAt(0).toUpperCase() + tcString.substring(1);
  }

  render() {
    return (
      <div
        id="Masthead"
        className="bg-blue-dark txt-white pad-top-lg pad-horiz-xl margin-bottom-md"
      >
        <div id="Masthead-textblock" className="margin-bottom-lg">
          <img
            src={this.props.icon}
            className="margin-right-md"
            alt={`${this.props.surveyContextName} icon`}
          />
          <h1>{this.props.surveyContextName}</h1>
          <h2>Leading General Style</h2>
          <h3 className="text-size-xl">Styles are six broad areas of behavioral
          tendencies that give the &quot;big picture&quot; of a person&apos;s behavior.
          </h3>
        </div>
        <div className="dropdown show">
          <a
            className="btn dropdown-toggle txt-white margin-left-md bold bg-gold"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Qualities
          </a>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            {
              /* eslint-disable */
              this.props.qualities.map(q => (<a
                className="dropdown-item"
                href="#"
                key={q}
                onClick={() => {
                  this.props.actions.setSurveyContext(q);
                }}
              >{this.titleCase(q)}
              </a>))
              /* eslint-disable */
            }
          </div>
        </div>
      </div>
    );
  }
}

Masthead.propTypes = {
  surveyContextName: PropTypes.string,
  icon: PropTypes.string,
  qualities: PropTypes.array,
};

Masthead.defaultProps = {
  surveyContextName: '',
  icon: '',
  qualities: [],
};

export default connect(state => ({
  qualities: Object.keys(get(state, 'userSurveyResults.qualities', {})),
  userSurveyResults: get(state, 'userSurveyResults', {}),
  surveyContextName: get(state, `userSurveyResults.qualities.${state.surveyContext}.name`, ''),
  icon: get(state, `userSurveyResults.qualities.${state.surveyContext}.icon`, ''),
}),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) }),
)(Masthead);
