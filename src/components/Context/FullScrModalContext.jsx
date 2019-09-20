import React from 'react';
import { compose } from 'recompose';
import { withAlert } from 'react-alert';
import FullScrModal from '../common/FullScrModal/FullScrModal.jsx';
// for isolated testing of this context
export const initialValue = {
 
};

const FullScrModalContext = React.createContext(initialValue);

class FullScrModalProvider extends React.Component {
  constructor(props) {
    super(props);
    console.log({thisProps: this.props});
    this.state = {
      // show: true,
      show: false,
      user:{},
      pkg: {}
    };

    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  closeModal(){
    this.setState({show:false, user:{}, pkg:{}});
  }

  showModal({user,pkg}={}){
    console.log("ShowModal");
    this.setState({show:true, user, pkg});
  }

  render(){
    return (
      <FullScrModalContext.Provider
        value={{ 
          ...this.state,
          showModal: this.showModal,
          closeModal: this.closeModal
        }}
      >
        <FullScrModal show={this.state.show} closeModal={this.closeModal} user={this.state.user} pkg={this.state.pkg} alert={this.props.alert} />
        {this.props.children}
      </FullScrModalContext.Provider>
    );
  }
}

export default compose(withAlert())(FullScrModalProvider)

export function withFullScrModalContext(Component) {
  return function WrapperComponent(props) {
      return (
        <FullScrModalContext.Consumer>
          {state => <Component {...props} ctxFullScrModal={state} />}
        </FullScrModalContext.Consumer>
      );
  };
}