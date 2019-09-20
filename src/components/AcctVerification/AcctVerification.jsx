import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withAlert } from 'react-alert';
import { Form, Button } from 'react-bootstrap';
import { withAppContext } from '../Context/AppContext.jsx';
import { catalystApi } from '../../lib/catalystApi.js';

import './AcctVerification.scss';

class AcctVerification extends Component {
  constructor(props){
    super(props);

    this.state = {
      veriCode: "",
      validated: false
    };
  }

  handleInput = (e) => {
    const field = e.target.id;
    switch (field) {
      case "veriCode":
        this.setState({ veriCode: e.target.value });
        break;

      default:
        throw new Error('Field is undefined');
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    const isFormValid = form.checkValidity();

    this.setState({ validated: true });
    if (isFormValid) {
      let guestId = this.props.match.params.guestId;
      
      let result = await catalystApi.verifyGuest({ guestId, veriCode: this.state.veriCode });
      console.log({guestId, veriCode: this.state.veriCode});
      console.log({result});

      if( !result || result.error ){
        this.props.alert.error('Verification Code Invalid');
      }
      
      if(!result.isVerified){
        this.props.alert.error('Verification Code Incorrect');
      }else{
        this.props.alert.success('Account Verified! Redirecting shortly...');
        this.props.ctxApp.reSyncUser({guestId});
        setTimeout( ()=>{
          this.props.history.push('/home');
        }, 2000);

      }

     
    }
  }

  render() {
    let { validated, veriCode } = this.state;

    return (
      <>
        <div className="acct-verification">
          <div className="verification-panel">
            <Form
              noValidate
              validated={validated}
              onSubmit={this.handleSubmit}
            >
              <Form.Group controlId="veriCode">
                <Form.Label>Verification Code</Form.Label>
                <Form.Control onChange={this.handleInput} type="text" placeholder="Check your email inbox/spam" value={veriCode} required />
              </Form.Group>

              <Button type="submit" id="verify" variant="cata-info" size="lg" block>Verify</Button>
            </Form>
          </div>
        </div>
      </>
    );
  }
}

export default compose(withRouter, withAppContext, withAlert())(AcctVerification);