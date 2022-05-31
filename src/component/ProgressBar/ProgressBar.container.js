import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar.component';

export const mapStateToProps = (state) => ({
  // wishlistItems: state.WishlistReducer.productsInWishlist
});

export const mapDispatchToProps = (dispatch) => ({
  // addProduct: options => CartDispatcher.addProductToCart(dispatch, options)
});

export class ProgressBarContainer extends PureComponent {
  static propTypes = {
    // TODO: implement prop-types
    stateMap: PropTypes.object,
    match: PropTypes.shape({
      params: PropTypes.shape({
        step: PropTypes.string,
      }),
    }).isRequired,
  };

  containerFunctions = {
    // getData: this.getData.bind(this)
  };

  containerProps = () => ({
    // isDisabled: this._getIsDisabled()
    stepMap: this.props.stepMap,
    match: this.props.match,
  });

  render() {
    return (
      <ProgressBar
        {...this.props}
        {...this.containerFunctions}
        {...this.containerProps()}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressBarContainer);
