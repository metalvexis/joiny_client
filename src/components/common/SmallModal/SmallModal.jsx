import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import './SmallModal.scss';

class SmallModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    return props;
  }

  render() {
    let { show, title, closeModal } = this.state;
    // let closeModal = () => {
    //   console.log('closeModal');
    //   this.setState({ show: false });
    // };

    return(
      <Modal
      show={show}
      className="small-modal"
      >
      <Modal.Body>
      <button type="button" class="close" onClick={closeModal}>x</button>
      <div id="childNode">
        {title}
      </div>
      
      </Modal.Body>
      
      </Modal>
    );
  }
}

SmallModal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired
}

export default SmallModal;




