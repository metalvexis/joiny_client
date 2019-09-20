import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import InputSearch from '../common/InputSearch/InputSearch.jsx';
import SmallModal from '../common/SmallModal/SmallModal.jsx';
import { MdBookmark, MdPriorityHigh, MdAccountBox, MdExitToApp } from "react-icons/md";

import { compose } from 'recompose';
import { withAppContext } from '../Context/AppContext.jsx';
import './Header.scss';


class Header extends Component {

  renderSearch(){
    let { match, location, history } = this.props;

    if(location.pathname === '/home'){
      return (
        <div id="search-control">
          <InputSearch/>
        </div>
      );
    }
    return null;
  }

  renderNavbar(){
    let { match, location, history } = this.props;

    if(location.pathname === '/home'){
      return (
        <div id="user-control">

          {/* <div id="control-bookmark">
            <MdBookmark />
            0 Marked
          </div> */}

          <div id="control-profile">
            { 
              !this.props.ctxApp.isVerified && this.props.ctxApp.isLoggedIn &&
              <span id="acct-unverified" 
                onClick={ 
                  ()=>{
                    this.props.history.push(`/app/profile/verify/${this.props.ctxApp.user._id}`);
                  }
                }
              >
                <MdPriorityHigh/> Verify Account
              </span>
            }
            { 
              this.props.ctxApp.isVerified &&
              <MdAccountBox/>
            }
            
            { 
              !this.props.ctxApp.isLoggedIn &&
              <div style={{display: 'inline'}} onClick={ ()=>this.props.history.push('/login') }>
                Login
              </div>
            }
            { 
              this.props.ctxApp.isLoggedIn && this.props.ctxApp.isVerified &&
              this.props.ctxApp.user.email
            }
            
            
          </div>

          <div id="control-logout" onClick={ 
            ()=>{ 
              this.props.ctxApp.logout(); 
              setTimeout(()=>this.props.history.push('/login'),200);
            }}
          >
            <MdExitToApp/>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    return(
      <>
      <div className="header">
        <div className="header-title">
          
            <div id="title">
              <Link to="/">
                Cushy Trip
              </Link>
            </div>
          
          <div id="subtitle">"Where to go? Relax. We already know."</div>
          <div id="header-controls">
          {this.renderNavbar()}
          {this.renderSearch()}
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default compose(withAppContext,withRouter)(Header);
