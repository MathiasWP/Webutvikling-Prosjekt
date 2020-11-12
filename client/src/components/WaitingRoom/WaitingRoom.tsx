import React, { useEffect, useState, useContext } from 'react';
import { store } from '../../store/store';
import Button from '../Button/Button'


import './WaitingRoom.scss';

type WaitingRoomProps = {}; // This any is not correct

function WaitingRoom({quizRoom, players, onBegin}:WaitingRoomProps) {
  const { state } = useContext(store);
  console.log(players)
  return (
    <div>
      {
        quizRoom ?
        <>
      <h1>Waiting room</h1>
      {
        players?.length > 0 ?
        <>
        <ul>
          {
            players.map(player => {
              console.log(player)
              return (
              <li key={player?.uid}>{player?.name}</li>  
                )
              })
            }
            </ul>
        </>
        :
        <h3>Ingen spillere</h3>
      }
      {
        state?.auth?.uid === quizRoom.quiz_master &&
      <Button onClick={onBegin}>Start!</Button>
      }
      </>:
    <h2>Laster</h2>
      }
    </div> 
  );
}

export default WaitingRoom;
