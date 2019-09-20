import React, { Component } from 'react';
import { compose } from 'recompose';
import { withSearchListingContext } from '../../Context/SearchListingContext.jsx';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import './InputSearch.scss'


class InputSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: ''
    }

    this.searchKeyword = this.searchKeyword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnKeyup = this.handleOnKeyup.bind(this);
    
    
  }

  handleInputChange(e){
    e.preventDefault();

    this.setState({keyword: e.target.value});
  }

  handleOnKeyup(e){
    if(e.keyCode === 13) this.searchKeyword();
	}

  searchKeyword(){
    console.log(`input: ${this.state.keyword}`);

    this.props.ctxSearch.setSearchFilter(this.state.keyword);
    setTimeout(() => {
      this.props.ctxSearch.execSearch();
    }, 1);
    
  }

  render() {
    return (
      <div className="input-search">

        {/* <Button type="button" variant="cata-success" size="sm" id="overlay-search">
          <strong>Search</strong>
        </Button> */}
        <strong id="overlay-search" onClick={ this.searchKeyword }>Search</strong>
        
        <FormControl id="search-field" value={this.state.keyword} onChange={this.handleInputChange} onKeyUp={this.handleOnKeyup} />

        

      </div>
    )
  }
}

export default compose(withSearchListingContext)(InputSearch);