import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.style';

class ProgressBar extends PureComponent {
  static propTypes = {
    // TODO: implement prop-types
    stepMap: PropTypes.object,
  };

  renderBar(step, index = 0) {
    console.log('am in renderBar');
    const { stepMap } = this.props;
    let isActive = false;
    const pathName = location.pathname;
    let presentPath = '';
    let indexOfPathInStep = null;
    console.log('presentPathName', presentPath);

    if (pathName.indexOf('checkout') !== -1) {
      presentPath = pathName.split('/').slice(-1).toString();
    }

    for (let i = 0; i < Object.keys(stepMap).length; i++) {
      const step = Object.keys(stepMap)[i];
      if (step.toLowerCase().indexOf(presentPath) !== -1) {
        indexOfPathInStep = i;
        break;
      }
    }
    if (indexOfPathInStep !== null && index <= indexOfPathInStep) {
      isActive = true;
    }

    console.log('indexOfPathInStep', indexOfPathInStep);
    console.log('index', index);
    console.log('isActive', isActive);

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
    return Object.keys(stepMap).map((step, index) =>
      this.renderBar.bind(this)(step, index)
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
