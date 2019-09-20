import React, { Component } from "react";
import Signup from '../Forms/Signup/Signup.jsx'
import imgJoiner from '../../img/joiner.svg';
import sampleJoiner from '../../img/sampleJoiner.png';
import sampleFriends from '../../img/friends.jpeg';
import sampleCollage from '../../img/collage.png';
import { Image } from 'react-bootstrap';

import "./Landing.scss";

// class Landing extends Component
const Landing = () => {
  // render() {
  return (
    <>
      <div className="landing">
        <div className="landing-panel-reverse">
          <div className="panel-cell blue">
            <Signup />
          </div>
          <div className="panel-text">
            <h1>Cushy Trip</h1>
            Where Travellers and Joiners <br />
            meet and share the journey.
            </div>


        </div>
        <div className="landing-panel">
          <div className="panel-cell green">
            <div id="sample-collage">
              <Image src={sampleCollage}/>
            </div>
          </div>

          <div className="panel-text">
            Travelling is more fun with friends and family. <br />
            <br />
            We just got what you might be <br />
            looking for.
            </div>
        </div>

        <div className="landing-panel-reverse">
          <div className="panel-cell yellow">
            <div id="sample-friends">
              <Image src={sampleFriends}/>
            </div>
          </div>
          <div className="panel-text">No more travelling alone.</div>
        </div>

        <div className="landing-panel">
          <div className="panel-cell green">
            <div id="sample-joiner">
              <Image src={sampleJoiner}/>
            </div>
          </div>
          <div className="panel-text">
            Just click "Join" in our special tour packages indicated with:
              <br />
            <div id="joiner-indicator">
              <Image src={imgJoiner}/>
            </div>
          </div>
        </div>

        <div className="landing-panel">
          <div className="panel-text">
            {/* <Button variant="cata-info" size="lg">
                Sign Me Up!
              </Button> */}
            <br />
            Your friends in Cushy Trip will be hard at work looking for fellow
            travellers that will accompany you.
            </div>
        </div>
      </div>
    </>
  );
  // }
}

export default Landing;
