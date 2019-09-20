import React, { Component } from "react";
import { MdDone } from "react-icons/md";
import { Link } from "react-router-dom";
import './CheckoutStatus.scss';

class CheckoutSuccess extends Component {
  componentWillMount() {
    console.log('CheckoutSuccess');
  }
  render() {
    return (
      <div className="checkout-success">
        <div className="checkout-message-panel">
          <h1><MdDone /></h1> <br />
          <h1>Payment Confirmed</h1><br />
          <h3>We wish you a safe and wonderful trip !</h3><br />
          <h3>
            <Link to="/home">Browse for More</Link>
          </h3>
        </div>

      </div>
    );
  }
}

export default CheckoutSuccess;
