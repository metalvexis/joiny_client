const CATALYST_API = {
  auth: {
    guest: '/api/auth/guest',
    verify: '/api/auth/verify/guest'
  },
  guests: {
    allGuest: '/api/guests/allGuests',
    createAccount: '/api/guests/createAccount',
    getAcct:  '/api/guests/getAcct?guestId=',
  },
  tourPackages: {
    allTourPackages: '/api/tourPackages/allTourPackages',
    allListing: '/api/tourPackages/allListing',
    purchasePackage: '/api/tourPackages/purchasePackage',
    checkoutPackage: '/api/tourPackages/checkoutPackage',
  },
  travelAgencies: {
    allTravelAgencies: '/api/travelAgencies/allTravelAgencies'
  },
  chatLog: {
    allChat: '/api/chat/allChat',
    sendMessage: '/api/chat/sendMessage'
  },
  purchases: {
    allPurchases: '/api/purchases/allPurchases'
  }
};


export const catalystApi = {
  async createAccount({ password, email, username='', firstName='' , lastName='', middleName='', contact='' } = {}){
    let isFieldValid = password && email;
    console.log({email,password})
    if( isFieldValid ){
      console.log(`Sending Request`);
      try{
        let acct = {
          password, email, username, firstName , lastName, middleName, contact
        };

        let response = await fetch( CATALYST_API.guests.createAccount, {
          method: 'POST',
          body: JSON.stringify(acct),
          headers:{
            'Content-Type': 'application/json'
          }
        });

        let body = await response.json();
        
        console.log({response});
        console.log({body});
        
        return body;
      }catch(err){
        console.log({err});
      }
      
    }else{
      console.log(`Request Cancelled`);
    }
  },

  async auth({ username, password } = {}){
    if( username && password ){
      try{
        let response = await fetch( CATALYST_API.auth.guest,{
          method: 'POST',
          body: JSON.stringify({username,password}),
          headers:{
            'Content-Type': 'application/json'
          }
        });

        let body = await response.json();
          
        console.log({response});
        console.log({body});
        
        return body;
      }catch(err){
        console.log(err);
      }
    }
  },

  async verifyGuest({ guestId, veriCode } = {}){
    if( guestId && veriCode ){
      try{
        let response = await fetch( CATALYST_API.auth.verify ,{
          method: 'POST',
          body: JSON.stringify({guestId, veriCode}),
          headers:{
            'Content-Type': 'application/json'
          }
        });

        let body = await response.json();
          
        console.log({response});
        console.log({body});
        
        return body;
      }catch(err){
        console.log(err);
      }
    }
  },

  async allGuests(){
    try{
      let response = await fetch( CATALYST_API.guests.allGuests,{
        method: 'GET',
      });

      let body = await response.json();

      return body;
    }catch(err){
      console.log(err);
    }
  },

  async getAcct({guestId}={}){
    try{
      let response = await fetch( CATALYST_API.guests.getAcct + guestId,{
        method: 'GET',
      });

      let body = await response.json();

      return body;
    }catch(err){
      console.log(err);
    }
  },
  
  async allTourPackages(){
    try{
      let response = await fetch( CATALYST_API.tourPackages.allTourPackages,{
        method: 'GET',
      });

      let body = await response.json();

      return body;
    }catch(err){
      console.log(err);
    }
  },

  async allListing(){
    try{
      let response = await fetch( CATALYST_API.tourPackages.allListing,{
        method: 'GET',
      });

      let body = await response.json();

      return body;
    }catch(err){
      console.log(err);
    }
  },

  async allTravelAgencies(){
    try{
      let response = await fetch( CATALYST_API.travelAgencies.allTravelAgencies,{
        method: 'GET',
      });

      let body = await response.json();

      return body;
    }catch(err){
      console.log(err);
    }
  },

  async allPurchases(){
    try{
      let response = await fetch( CATALYST_API.purchases.allPurchases,{
        method: 'GET',
      });

      let body = await response.json();

      return body;
    }catch(err){
      console.log(err);
    }
  },

  async purchasePackage({guestId, tourPackageId}={}){

    try{
      let response = await fetch( CATALYST_API.tourPackages.purchasePackage,{
        method: 'POST',
        body: JSON.stringify({guestId, tourPackageId}),
        headers:{
          'Content-Type': 'application/json'
        }
      });

      let body = await response.json();

      return body;
    }catch(err){
      console.log(err);
    }    
  },

  async checkoutPackage({guestId, tourPackageId}={}){

    try{
      let response = await fetch( CATALYST_API.tourPackages.checkoutPackage,{
        method: 'POST',
        body: JSON.stringify({guestId, tourPackageId}),
        headers:{
          'Content-Type': 'application/json'
        }
      });

      let body = await response.json();

      return body;
    }catch(err){
      console.log(err);
    }    
  }
};