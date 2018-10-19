import React from 'react';
import PropTypes from 'prop-types';

class Tickmark extends React.Component {
  TickFormat(number, fill) {
    this.number = number;
    this.fill = fill;
    return this;
  }

  formatTickNumber(n = 0) {
    const darkFill = 'rgba(0,0,0,.60)';
    const lightFill = 'rgba(0,0,0,.30)';

    switch (true) {
      case n === -50 || n === 0:
        return this.TickFormat(n, darkFill);
      case n === 50:
        return this.TickFormat(`+${50}`, darkFill);
      default:
        return this.TickFormat(n, lightFill);
    }
  }

  render() {
    const tick = this.formatTickNumber(this.props.tickNumber);
    return (
      <g className="tick" transform={`translate(${this.props.translateX},0)`}>
        { this.props.showTicks ? <line y1={this.props.tickmarkHeight} y2="55" /> : '' }
        <text textAnchor="middle" dy="1em" y="29.166666666666668" fill={tick.fill}>
          {tick.number}
        </text>
      </g>
    );
  }
}

Tickmark.propTypes = {
  tickNumber: PropTypes.number,
  tickmarkHeight: PropTypes.number,
  showTicks: PropTypes.bool,
  translateX: PropTypes.number,
};

Tickmark.defaultProps = {
  tickNumber: 0,
  tickmarkHeight: 0,
  showTicks: false,
  translateX: 0,
};

export default Tickmark;
