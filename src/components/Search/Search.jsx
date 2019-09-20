import React, { Component } from 'react';
import { compose } from 'recompose';
import { Button, Image } from 'react-bootstrap';
import Fuse from 'fuse.js';
import { withAppContext } from '../Context/AppContext.jsx';
import { withSearchListingContext } from '../Context/SearchListingContext.jsx';
import { withFullScrModalContext } from '../Context/FullScrModalContext.jsx';
import { find } from 'lodash';
import './Search.scss';
import imgJoiner from '../../img/joiner.svg';

class Search extends Component {

  constructor(props){
    super(props);

    this.state = {
      // packages: []
    };

    this.renderResults = this.renderResults.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
    this.showPkgInfoModal = this.showPkgInfoModal.bind(this);
    this.renderTourCard = this.renderTourCard.bind(this);
    this.isPurchased = this.isPurchased.bind(this);
    
    
  }
  
  componentDidMount(){
    console.log({props: this.props});
    this.props.ctxSearch.getListing();
  }

  
  renderResults() {
    let { packages } = this.props.ctxSearch;
    return packages.map( (pkg)=>{
      return this.renderTourCard( pkg );
    })
  }

  showPkgInfoModal(pkg){
    let { user } = this.props.ctxApp;
    if(!pkg || !user) return;
    // console.log('buttonClicked');
    // console.log({user});
    this.props.ctxFullScrModal.showModal({user,pkg});
  }

  isPurchased(pkg){
    let { user } = this.props.ctxApp;
    if(user){
      let isJoined = find(pkg.joiners,{ _id:user._id });
      return isJoined;
    }
    return false;
    
  }

  renderTourCard(pkg){
    return (
      <div className="tour-card" key={pkg._id}>

        <div className="left-section">
        <img src="" alt="pkgimage" />
        </div>

        <div className="right-section">
            <div className="tour-card-slots">
              <div id="joiner-indicator">
                {pkg.pax - pkg.purchases.length} <Image src={imgJoiner}/>
              </div>
              
              slots left
            </div>
            <div className="tour-card-header"> {pkg.name}
          </div>
          <div className="tour-card-body"> {pkg.details} </div>
          <div className="tour-card-footer"> Agency: {pkg.travelAgency.name} </div>
        </div>

        { !this.isPurchased(pkg) && <Button type="button" variant="cata-info" size="lg" onClick={()=>this.showPkgInfoModal(pkg)}>JOIN</Button> }
        { this.isPurchased(pkg) && <Button type="button" variant="cata-success" size="lg" onClick={()=>this.showPkgInfoModal(pkg)}>JOINED</Button> }
        

      </div>
    )
  }

  // sample use of Fuse.js
  searchKeyword(){
    let { packages } = this.state;
    // let opus = [];
    let options = {
      shouldSort: true,
      threshold: 0.6,
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
    let fuse = new Fuse(packages, options);

    let result = fuse.search("wet");

    console.log({result});
  }
  render() {
    return (
      <>
        <div className="search-container">     
          <div className="search-result">
            { this.renderResults() }
          </div>
        </div>
      </>
    );
  }
}

export default compose(withSearchListingContext,withAppContext,withFullScrModalContext)(Search);