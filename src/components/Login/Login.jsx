import React, { Component } from 'react';
import { compose } from 'recompose';
import { Col } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import FormLogin from '../Forms/Login/FormLogin.jsx'
import { withAppContext } from '../Context/AppContext.jsx';
import './Login.scss';

class Login extends Component {
  constructor(props){
    super(props);

  }

  componentDidUpdate(){
    this.autoLogin();
  }

  componentDidMount(){
    this.autoLogin();
  }

  autoLogin = () => {
    let { isLoggedIn } = this.props.ctxApp;

    if( isLoggedIn ){
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <>
        <div className="login">
          <div className="login-panel">
            <FormLogin/>
          </div>
        </div>
      </>
    );
  }
}

export default compose(withAppContext, withRouter)(Login);