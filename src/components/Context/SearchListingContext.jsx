import React from 'react';
import Fuse from 'fuse.js';
import { catalystApi } from '../../lib/catalystApi.js';

// for isolated testing of this context
export const initialValue = {
 
};

const SearchListingContext = React.createContext(initialValue);

export default class SearchProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "",
      packages: [
        
      ]
    };

    this.execSearch = this.execSearch.bind(this); 
    this.getListing = this.getListing.bind(this);
    this.setSearchFilter = this.setSearchFilter.bind(this);
  }

  async getListing(){
    let response = await catalystApi.allListing();

    console.log({packages:response.packageListing});

    this.setState({packages: response.packageListing});
  }

  // sample use of Fuse.js
  async execSearch(){

    let { filter } = this.state;

    let {packageListing} = await catalystApi.allListing();

    if( filter=="" ){
      this.setState({packages: packageListing});
      return;
    }

    console.log({filter,packageListing});
    // let opus = [];
    let options = {
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "name",
        "travelAgency.name",
        "packageType",
        "details"
      ]
    };
    let fuse = new Fuse(packageListing, options);

    let result = fuse.search( filter ); // use keyword if provided

    console.log({result});

    this.setState({packages: result});
  }

  setSearchFilter(filter){
    this.setState({filter});
  }

  render(){
    return (
      <SearchListingContext.Provider
        value={{ 
          ...this.state,
          execSearch: this.execSearch,
          getListing: this.getListing,
          setSearchFilter: this.setSearchFilter
        }}
      >
        {this.props.children}
      </SearchListingContext.Provider>
    );
  }
}

export function withSearchListingContext(Component) {
  return function WrapperComponent(props) {
      return (
        <SearchListingContext.Consumer>
          {state => <Component {...props} ctxSearch={state} />}
        </SearchListingContext.Consumer>
      );
  };
}