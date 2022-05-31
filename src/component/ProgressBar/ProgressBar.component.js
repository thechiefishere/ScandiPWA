import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.style';

class ProgressBar extends PureComponent {
  static propTypes = {
    // TODO: implement prop-types
    stepMap: PropTypes.object,
    match: PropTypes.shape({
      params: PropTypes.shape({
        step: PropTypes.string,
      }),
    }).isRequired,
  };

  renderBar(step, index = 0) {
    const { stepMap } = this.props;
    const { match } = this.props;
    let isActive = false;
    const pathName = match.url;
    let presentPath = '';
    let indexOfPathInStep = null;

    if (pathName.indexOf('checkout') !== -1) {
      presentPath = pathName.split('/').slice(-1).toString();
    }

    for (let i = 0; i < Object.keys(stepMap).length; i++) {
      const step = stepMap[Object.keys(stepMap)[i]].url;
      if (step.indexOf(presentPath) !== -1) {
        indexOfPathInStep = i;
        break;
      }
    }
    if (indexOfPathInStep !== null && index <= indexOfPathInStep) {
      isActive = true;
    }

    return (
      <div key={index} block='ProgressBar' elem='Container'>
        <div block='ProgressBar' elem='LineAndValue'>
          <div block='ProgressBar' elem='Line' mods={{ isActive }}></div>
          <p block='ProgressBar' elem='Value'>
            {index + 1}
          </p>
        </div>
        <div block='ProgressBar' elem='Step'>
          {step}
        </div>
      </div>
    );
  }

  renderProgressBars() {
    const { stepMap } = this.props;
    return Object.values(stepMap).map(({ url }, index) =>
      this.renderBar.bind(this)(url, index)
    );
  }

  render() {
    return (
      <section block='ProgressBar'>
        {this.renderProgressBars.bind(this)()}
      </section>
    );
  }
}

export default ProgressBar;
