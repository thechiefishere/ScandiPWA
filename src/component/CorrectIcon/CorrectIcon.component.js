import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './CorrectIcon.style';

class CorrectIcon extends PureComponent {
  static propTypes = {
    // TODO: implement prop-types
  };

  render() {
    return (
      <svg
        block='CorrectIcon'
        width='24px'
        height='24px'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <polygon
          fill-rule='evenodd'
          points='9.707 14.293 19 5 20.414 6.414 9.707 17.121 4 11.414 5.414 10'
        />
      </svg>
    );
  }
}

export default CorrectIcon;
