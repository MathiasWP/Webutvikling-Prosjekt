import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ActiveRooms from '../components/ActiveRooms/ActiveRooms'
import Button from '../components/Button/Button'

import './FrontPage.scss';


function FrontPage() {
    const history = useHistory();

    function goToPlay() {
      history.push("/start");
    }
    function goToCreate() {
      history.push("/user/create-quiz");
    }


  return (
    <div className="FrontPage">
      <ActiveRooms />
      <h1>Quiz-time!</h1>
      <div id="front-module">
        <Button onClick={goToPlay}>Play</Button>
        <Button onClick={goToCreate}>Create quiz</Button>
      </div>
    </div>
  );
}

export default FrontPage;
