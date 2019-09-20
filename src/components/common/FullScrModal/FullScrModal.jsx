import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { compose } from 'recompose';
import { withAlert } from 'react-alert';
// import { withRouter } from 'react-router-dom';
import { MdAccountCircle } from "react-icons/md";
import PropTypes from 'prop-types';
import { catalystApi } from '../../../lib/catalystApi.js';
import { find } from 'lodash';
import './FullScrModal.scss';

class FullScrModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      user: {

      },
      pkg: {
      }
    };

    this.purchasePackage = this.purchasePackage.bind(this);
    this.checkoutPackage = this.checkoutPackage.bind(this);
    this.isPurchased = this.isPurchased.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return props;
  }

  isPurchased() {
    let { user, pkg } = this.state;

    let isJoined = find(pkg.joiners, { _id: user._id });
    return isJoined;
  }

  async purchasePackage() {
    let { user, pkg } = this.state;
    try {
      let purchaseResponse = await catalystApi.purchasePackage({ guestId: user._id, tourPackageId: pkg._id });
      console.log({ purchaseResponse });
      if (purchaseResponse.error) {
        
        alert('Purchase FAILED');
        console.log(purchaseResponse.error);
      } else {
        alert('Purchase success');
      }

    } catch (e) {

      alert('Purchase Invalid');
      console.log(e);
    }
  }

  processCheckout = () => {
    // check if user is verified before proceeding.
    let { user, pkg } = this.state;

    if( !!user.isVerified ){
      this.checkoutPackage();
    }else{
      this.props.alert.error('Account not verified, Check your email inbox/spam.');
    }
  }

  async checkoutPackage() {
    let { user, pkg } = this.state;
    try {
      let response = await catalystApi.checkoutPackage({ guestId: user._id, tourPackageId: pkg._id });
      console.log({ response });
      if (response.error) {
        this.props.alert.info('We are having technical difficulties. Please try again');
        // alert('Checkout FAILED');
        console.log(response.error);
      } else {
        this.props.alert.info('We are redirecting you to our checkout page ...');
        // alert('Checkout Redirecting...');
        console.log({ response });

        setTimeout(() => {
          console.log(`GoToUrl: ${response.checkoutResponse.redirectUrl}`);
          window.location = response.checkoutResponse.redirectUrl;
        }, 5000);
        // return response;
      }

    } catch (e) {
      this.props.alert.info('Checkout is Invalid. Refresh your page.');
      // alert('Checkout Invalid');
      console.log(e);
    }
  }

  remainingSlots() {
    let { pax, purchases } = this.state.pkg;

    if (pax && purchases) {
      return pax - purchases.length;
    }

    return pax || 0;
  }

  departureDate() {
    let { departureDate } = this.state.pkg;

    if (departureDate) {
      let depDate = new Date(departureDate);

      return depDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      // return depDate.format('MM DD, YYYY');
    }

    return "";
  }

  renderJoiners(pkg) {
    let { joiners } = pkg;

    if (joiners && joiners.length) {
      return joiners.map(joiner => {
        return (
          <>
            <div id="joiner-container">
              <div id="joiner-portrait">
                <MdAccountCircle />
              </div>
              {joiner.firstName} {joiner.middleName} {joiner.lastName}
            </div>
          </>
        )
      });
    }

    return (
      <>
        <h3>Awaiting for Joiners</h3>
      </>
    );
  }

  render() {
    let { show, pkg } = this.state;

    return (
      <Modal
        show={show}
        className="full-scr-modal"
        backdrop={true}
        onClose={this.props.closeModal}
        onHide={this.props.closeModal}
      >
        <Modal.Body>

          <button type="button" className="close" onClick={this.props.closeModal}>x</button>

          <div id="package-info-container">



            <div id="left-section">
              <div id="pkg-img-container">
                <h3>
                  <center>Nothing to see here.</center>
                </h3>
              </div>

              <div id="pkg-details-container">
                <div id="pkg-details">

                  <div id="pkg-price">
                    <h5>Price:</h5> <br />
                    <h4>
                      Php {pkg.price}
                    </h4>
                  </div>

                  <div id="pkg-departure">
                    <h5>Departure Date:</h5> <br />
                    <h4>
                      {this.departureDate()}
                    </h4>
                  </div>

                  <div id="pkg-rem-slots">
                    <h5>Remaining Slots:</h5> <br />
                    <h4>
                      {this.remainingSlots()}
                    </h4>
                  </div>

                </div>

                <div id="pkg-name">
                  {pkg.name}
                </div>
                <div id="pkg-description">
                  {pkg.details}
                </div>
              </div>

            </div>
            <div id="right-section">
              <div id="pkg-joiners-container">
                {this.renderJoiners(pkg)}
              </div>

              <div id="pkg-checkout-container">
                {!this.isPurchased() && <Button variant="cata-info" onClick={this.processCheckout}>JOIN</Button>}
                {this.isPurchased() &&
                  <Button variant="cata-success" onClick={
                    () => {
                      this.props.alert.success('You already joined this package')
                    }}
                  >
                    JOINED
              </Button>
                }
              </div>

            </div>

          </div>
        </Modal.Body>

      </Modal>
    );
  }
}

FullScrModal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default compose(withAlert())(FullScrModal);




