import React from 'react';
import { catalystApi } from '../../lib/catalystApi.js'
// const ThemeContext = React.createContext('light')

// for isolated testing of this context
export const initialValue = {
 
};

const AppContext = React.createContext(initialValue);

export default class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: null,
      isLoggedIn: false,
      isVerified: false,
      user: {}
    };
    this.setAccessToken = this.setAccessToken.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentWillMount(){
    let userId = localStorage.getItem('user');
    let response = await catalystApi.getAcct({guestId: userId});
    this.setState({
      accessToken: '',
      isLoggedIn: !!response.guest,
      isVerified: response.guest.isVerified,
      user: response.guest
    });
  }

  componentWillReceiveProps(){
    console.log("Receiving props");
  }

  static getDeriveStateFromProps(props,state){
    console.log("getDeriveStateFromProps");
  }

  setAccessToken(){
    console.log("setAccessToken");
    this.setState({
      // accessToken: "asdfasdf"
    });
  }

  async login({ username, password } = {}){
    let result = await catalystApi.auth({ username, password });
    let isAuthenticated = !!result.user;

    
    if( isAuthenticated ){
      console.log({setUser: localStorage.setItem('user',result.user._id)});
      this.setState({
        // accessToken: result.token,
        accessToken: '',
        isLoggedIn: true,
        user: result.user,
        isVerified: result.user.isVerified || false
      });
    }
    
    console.log({isAuthenticated});

    return isAuthenticated;
  }

  logout(){
    localStorage.setItem('user',null);
    this.setState({
      // accessToken: result.token,
      accessToken: '',
      isLoggedIn: false,
      user: {}
    });
  }

  isVerified = () => {
    return this.state.isVerified;
  }

  reSyncUser = async ({guestId}) => {
    // let guestId = this.state.user._id;
    
    if( !guestId ) throw new Error('NO_USER');
    
    let response = await catalystApi.getAcct({guestId});

    console.log({response});

    this.setState({
      isLoggedIn: true,
      user: response.guest,
      isVerified: response.guest.isVerified || false
    });
    
  }

  render(){
    return (
      <AppContext.Provider
        value={{ 
          ...this.state,
          setAccessToken: this.setAccessToken,
          login: this.login,
          logout: this.logout,
          reSyncUser: this.reSyncUser
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export function withAppContext(Component) {
  return function WrapperComponent(props) {
      return (
        <AppContext.Consumer>
          {state => <Component {...props} ctxApp={state} />}
        </AppContext.Consumer>
      );
  };
}