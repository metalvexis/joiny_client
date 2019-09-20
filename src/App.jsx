import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import './App.scss';

import AppProvider from './components/Context/AppContext.jsx';
import SearchListingProvider from './components/Context/SearchListingContext.jsx';
import FullScrModalProvider from './components/Context/FullScrModalContext.jsx';

import Header from './components/Header/Header.jsx';
import Login from './components/Login/Login.jsx';
import Home from './components/Home/Home.jsx';
import Landing from './components/Landing/Landing.jsx';
import AcctVerification from './components/AcctVerification/AcctVerification.jsx';
import { CheckoutSuccess, CheckoutFailure, CheckoutCancel } from './components/common/CheckoutStatus'


class App extends Component {

  main() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="app-header">
            <Route component={Header} />
          </div>
          <div className="app-content">
            <Route path="/home" component={Home} exact />
            <Route path="/login" component={Login} exact />

            <Route path="/app/profile/verify/:guestId" component={AcctVerification} />
            <Route path="/app/checkout/success/:guestId/:tourPackageId" component={CheckoutSuccess} />
            <Route path="/app/checkout/failure/:guestId/:tourPackageId" component={CheckoutFailure} />
            <Route path="/app/checkout/cancel/:guestId/:tourPackageId" component={CheckoutCancel} />

            <Route path="/" component={Landing} exact />
          </div>
        </div>
      </BrowserRouter>
    );
  }

  render() {
    const options = {
      // you can also just use 'bottom center'
      position: positions.TOP_RIGHT,
      timeout: 10000,
      offset: '30px',
      // you can also just use 'scale'
      transition: transitions.FADE,
      containerStyle: {
        zIndex: 9999
      }
    }


    return (
      <AppProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <SearchListingProvider>
            <FullScrModalProvider>
              {this.main()}
            </FullScrModalProvider>
          </SearchListingProvider>
        </AlertProvider>
      </AppProvider>
    );
  }
}

export default App;
