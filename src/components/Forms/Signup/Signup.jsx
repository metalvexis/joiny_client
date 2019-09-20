import React, { Component } from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { withAppContext } from '../../Context/AppContext.jsx';
import { withAlert } from 'react-alert';

import { catalystApi } from '../../../lib/catalystApi.js';

import './Signup.scss';
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {

      },
      firstName: "", lastName: "",
      email: "", primePassword: "", verifyPassword: "",
      validated: false
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    const field = e.target.id;
    switch (field) {
      case "firstName":
        this.setState({ firstName: e.target.value });
        break;
      case "lastName":
        this.setState({ lastName: e.target.value });
        break;
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "primePassword":
        this.setState({ primePassword: e.target.value });
        break;
      case "verifyPassword":
        this.setState({ verifyPassword: e.target.value });
        break;
      default:
        throw new Error('Field is undefined');
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    const isFormValid = form.checkValidity();
    if (isFormValid) {
      console.log(`Registering User`);

      const { firstName, lastName, email, primePassword, verifyPassword } = this.state;

      if (primePassword === verifyPassword) {

        const response = await catalystApi.createAccount({ firstName, lastName, email, password: primePassword });

        console.log({ response });
        
        if (response.error) {
          switch (response.error) {
            case 'EMAIL_EXISTS':
              this.props.alert.error(`Email already registered.`);
              break;
          
            default:
              alert(response.error);
              break;
          }
          
        } else {
          this.props.ctxApp.login({ username: email, password: primePassword });
          
          setTimeout(()=>this.props.history.push('/home'),200);
          
          this.props.alert.success(`Account Created!\nCheck your email ( ${email} ) for your verification code.`);
          // alert('Account Created');
        }
      } else {
        this.props.alert.error(`Password did not match`);
        // alert(`Password did not match`);
      }

    } else {
      this.props.alert.error(`Please fill out all fields to proceed`);
      // console.log(`Decline Registration`);
    }

    this.setState({ validated: true });
  }

  showAlert = () => {
    // const alert = useAlert();
    this.props.alert.show('Oh look, an alert!');
  }

  render() {
    const { firstName, lastName, email, primePassword, verifyPassword, validated } = this.state;

    return (
      <>
        <Row className="signup-container">
          <Col xs={10}>
            <h2>Join us! It's free.</h2>
            <Form
              noValidate
              validated={validated}
              onSubmit={this.handleSubmit}
            >
              <Row>
              <Col sm={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control onChange={this.handleInput} type="text" placeholder="First Name" value={firstName} required />
              </Form.Group>
              </Col>
              <Col sm={6}>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control onChange={this.handleInput} type="text" placeholder="Last Name" value={lastName} required />
              </Form.Group>
                </Col>
              </Row>
              
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={this.handleInput} type="email" placeholder="You@mail.com" value={email} required />
              </Form.Group>

              <Form.Group controlId="primePassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={this.handleInput} type="password" placeholder="Password" value={primePassword} required />
              </Form.Group>

              <Form.Group controlId="verifyPassword">
                <Form.Label>Verify Password</Form.Label>
                <Form.Control onChange={this.handleInput} type="password" placeholder="Verify Password" value={verifyPassword} required />
              </Form.Group>

              <Button type="submit" id="register" variant="cata-primary" size="lg" block>Sign Up</Button>
            </Form>

          </Col>
          <Col>
            <div id="redirect-login">
              <Link to="/login">Go to Login</Link>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default compose(withAppContext,withRouter,withAlert())(Signup);
