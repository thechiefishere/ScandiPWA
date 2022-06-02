import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.style';
import CorrectIcon from 'Component/CorrectIcon/CorrectIcon.component';

class ProgressBar extends PureComponent {
  static propTypes = {
    // TODO: implement prop-types
    stepMap: PropTypes.object,
    match: PropTypes.shape({
      params: PropTypes.shape({
        step: PropTypes.string,
      }),
    }).isRequired,
    isMobile: PropTypes.bool.isRequired,
  };

  state = {
    progressLine: 0,
    interval: null,
    pageUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      match: { url },
    } = this.props;
    const { pageUrl } = this.state;
    const { progressLine } = this.state;
    const {
      progressLine: { prevProgressLine },
    } = prevState;

    if (pageUrl !== url) {
      this.setState({ progressLine: 0 });
      this.setState({ pageUrl: url });
    }

    if (progressLine <= 101 && progressLine !== prevProgressLine) {
      const progressBar = document.getElementsByClassName(
        'ProgressBar-Line_isProgressing'
      )[0];
      if (progressBar) {
        const interval = setTimeout(() => {
          progressBar.style.setProperty('--progress-width', progressLine);
          this.setState({ progressLine: progressLine + 1 });
        }, 5);
        if (progressLine === 101) clearTimeout(interval);
      }
    }
  }

  renderLineAndValue(index) {
    const { stepMap } = this.props;
    const { match } = this.props;

    let isActive = false;
    const pathName = match.url;
    let presentPath = '';
    let indexOfPathInStep = null;
    let isProgressing = false;

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
    if (indexOfPathInStep !== null && index < indexOfPathInStep) {
      isActive = true;
    }
    if (indexOfPathInStep !== null && index === indexOfPathInStep) {
      isProgressing = true;
    }

    const text = index < indexOfPathInStep ? <CorrectIcon /> : index + 1;

    return (
      <div block='ProgressBar' elem='LineAndValue'>
        {this.renderProgressLine(isActive, isProgressing)}
        {this.renderValueOrMark(text)}
      </div>
    );
  }

  renderStep(step) {
    return (
      <div block='ProgressBar' elem='Step'>
        {step.substring(1)}
      </div>
    );
  }

  renderValueOrMark(text) {
    return (
      <p block='ProgressBar' elem='Value'>
        {text}
      </p>
    );
  }

  renderProgressLine(isActive, isProgressing) {
    return (
      <div
        block='ProgressBar'
        elem='Line'
        mods={{ isActive, isProgressing }}
      ></div>
    );
  }

  renderBar(step, index = 0) {
    const { isMobile } = this.props;

    if (isMobile) {
      return '';
    }

    return (
      <div key={index} block='ProgressBar' elem='Container'>
        {this.renderLineAndValue(index)}
        {this.renderStep(step)}
      </div>
    );
  }

  renderProgressBars() {
    const { stepMap } = this.props;
    return Object.values(stepMap).map(({ url }, index) =>
      this.renderBar(url, index)
    );
  }

  render() {
    return <section block='ProgressBar'>{this.renderProgressBars()}</section>;
  }
}

export default ProgressBar;
