import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Start.scss';


function Start() {
    const history = useHistory();

    function goToSinglePlayer() {
      history.push("/singleplayer");
    }
    function goToGroupRoom() {
      history.push("/grouproom");
    }


  return (
    <div className="Start">
    <h3>Choose your way:</h3>
      <div id="start-module">
        <button onClick={goToSinglePlayer}>Singleplayer</button>
        <button onClick={goToGroupRoom}>Grouproom</button>
      </div>
    </div>
  )
}

export default Start;
