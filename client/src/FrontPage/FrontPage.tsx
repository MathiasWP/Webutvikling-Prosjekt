import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './FrontPage.scss';


function FrontPage() {
  const history = useHistory();

  function goToPlay() {
    history.push("/start");
  }
  function goToCreate() {
    history.push("/:user/create");
  }


  return (
    <div className="FrontPage">
      <h1>Quiz-time!</h1>
      <div id="front-module">
        <button onClick={goToPlay}>Play</button>
        <button onClick={goToCreate}>Create quiz</button>
      </div>
    </div>
  );
}

export default FrontPage;
