import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Form, Button, Nav } from 'react-bootstrap';
import { withAlert } from 'react-alert';
import { withAppContext } from '../../../components/Context/AppContext.jsx';
import './FormLogin.scss';

class FormLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "", password: "",
      validated: false
    };

    this.renderLogin = this.renderLogin.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    const field = e.target.id;
    switch (field) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
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

    this.setState({ validated: true });
    if (isFormValid) {
      console.log(`Logging-in User`);

      const { email, password } = this.state;

      // let isAuthenticated = await catalystApi.auth({ username: email, password });
      let isAuthenticated = await this.props.ctxApp.login({username: email, password});

      if (isAuthenticated) {
        // TODO: redirect to homepage
        this.props.history.push("/home");
      } else {
        this.props.alert.error('Invalid Login.')
        // alert(`Invalid Login`);
      }
    } else {
      this.props.alert.error('Login Declined.');
      // console.log(`Decline Login`);
    }
    
  }

  renderLogin(){
    let { email, password, validated } = this.state;
    return (
      <div className="login-container">
        <Col>
          <Form
            noValidate
            validated={validated}
            onSubmit={this.handleSubmit}
          >
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={this.handleInput} type="email" placeholder="You@mail.com" value={email} required />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={this.handleInput} type="password" placeholder="Password" value={password} required />
            </Form.Group>

            <Button type="submit" id="register" variant="cata-info" size="lg" block>Login</Button>
          </Form>

        </Col>
        <Link to="/">Sign Up</Link>
      </div>
    );
  }

  render() {
    // let { email, password, validated } = this.state;
    return ( this.renderLogin() );
  }
}

export default compose(withRouter, withAppContext, withAlert())(FormLogin);
