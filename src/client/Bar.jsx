import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import { connect } from 'react-redux';
import WarningIcon from '../../public/warningIcon.png';

class Bar extends React.Component {
  shouldComponentUpdate(nextProps) {
    console.log('this.props.surveyContext', this.props.surveyContext, nextProps.surveyContext);
    return this.props.surveyContext !== nextProps.surveyContext;
  }

  stripHtmlTags(str) {
    if (str === null || str === '') {
      return '';
    }

    const strippedStr = str.toString();
    return strippedStr.replace(/<[^>]*>/g, '');
  }

  render() {
    return (
      <div className="Bar pad-horiz-xs">
        <div className="Bar-title text-size-sm txt-blue-dark pad-horiz-sm">
          {this.props.name.toUpperCase()}
          <span className="Bar-title-tooltip bg-blue-dark margin-left-sm pad-xs">{this.stripHtmlTags(this.props.description)}</span>
          {this.props.valid ? '' : <img src={WarningIcon} className="margin-left-xs" alt="warning icon" />}
        </div>
        <div className="Bar-bullet">
          <svg className="bullet" width="100%" height="100%">
            <g>
              <rect className="range s0" width="15%" height="100%" y="0%" x="0" />
              <rect className="range s1" width="15%" height="100" y="0%" x="85%" />
              <circle
                className="fill-blue"
                r="7"
                cy="50%"
                cx={`${Math.abs(this.props.real + 50)}%`}
                fillOpacity="0"
                stroke="teal"
                strokeWidth="3"
              />
              <text
                textAnchor="middle"
                dy="1em"
                y="38%"
                x={`${this.props.real < 0
                  ? Math.abs(this.props.real + 50) - 2
                  : Math.abs(this.props.real + 50) + 2}%`}
                fill="fill-gray"
              >
                {this.props.real}
              </text>
              <circle
                className="fill-blue"
                r="7"
                cy="50%"
                cx={`${Math.abs(this.props.ideal + 50)}%`}
                fillOpacity="0"
                stroke="teal"
                strokeWidth="2"
                strokeDasharray="2, 2"
              />
              <text
                textAnchor="middle"
                dy="1em"
                y="38%"
                x={`${this.props.ideal < 0
                  ? Math.abs(this.props.ideal + 50) - 2
                  : Math.abs(this.props.ideal + 50) + 2}%`}
                fill="fill-gray"
              >
                {this.props.ideal}
              </text>
              <rect
                className="fill-gray"
                width={`${this.props.real < 0
                  ? Math.abs(this.props.real) - 0.675
                  : this.props.real - 0.675}%`}
                height="2"
                x={`${this.props.real < 0
                  ? (50.5 - Math.abs(this.props.real))
                  : 50}%`}
                y="50%"
              />
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

Bar.propTypes = {
  name: PropTypes.string,
  valid: PropTypes.bool,
  real: PropTypes.number,
  ideal: PropTypes.number,
  description: PropTypes.string,
};

Bar.defaultProps = {
  name: '',
  valid: true,
  real: 0,
  ideal: 0,
  description: '',
};

export default connect((state, props) => ({
  surveyContext: get(state, 'surveyContext', 'driver'),
  name: get(state, `userSurveyResults.qualities.${state.surveyContext}.scores.${props.id}.name`, ''),
  valid: get(state, `userSurveyResults.qualities.${state.surveyContext}.scores.${props.id}.valid`, true),
  real: get(state, `userSurveyResults.qualities.${state.surveyContext}.scores.${props.id}.real`, 0),
  ideal: get(state, `userSurveyResults.qualities.${state.surveyContext}.scores.${props.id}.ideal`, 0),
  description: get(state, `userSurveyResults.qualities.${state.surveyContext}.scores.${props.id}.description`, 0),
}))(Bar);

