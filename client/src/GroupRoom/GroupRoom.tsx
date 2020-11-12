import React, { useEffect, useRef, useMemo, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import quizService from '../service/quiz-service';
import Loading from '../components/Loading/Loading';
import QuestionRound from '../components/QuestionRound/QuestionRound';
import WaitingRoom from '../components/WaitingRoom/WaitingRoom';
import socketService from '../service/socket-service';
import {store} from '../store/store'
import './GroupRoom.scss';
const { v4: uuidv4 } = require('uuid');

function GroupRoom() {
  const [quizRoom, setQuizRoom] = useState(null)
  const subscriptionRef = useRef(null);
  const [players, setPlayers] = useState([]);

  const currentPlayer = useRef(null);
  const location = useLocation();
  const { state } = useContext(store);
  const history = useHistory()
  const roomId = location.pathname.split('/').pop();

  useEffect(() => {
    // For some reason the param/key object is weird, so we have to extract it the rough way  
    const fetchData = async () => {
          const result = await quizService.getRoom(roomId);
          setQuizRoom(result);
          setPlayers(result.players)
      };

      if(state?.user === null) {
        currentPlayer.current = {
          name: `Bobby ${Math.random()}`,
          uid: uuidv4()
        }
      } else {
        currentPlayer.current = {
          name: state.user.name,
          uid: state.auth.uid
        }
      }

      fetchData();
  }, []);


  useEffect(() => {
    if(!quizRoom) return;
    // Subscribe to socketService to receive events from Whiteboard server in this component
    subscriptionRef.current = socketService.subscribe();

    // Called when the subscription is ready
    subscriptionRef.current.onopen = () => {
      console.log('OPEN')

      if(!players.find(p => p.uid === currentPlayer.current.uid) && currentPlayer.current.uid !== quizRoom.quiz_master) {
        console.log(currentPlayer.current)
        socketService.send(
          {
            type: "ADD_PLAYER_ADMIN",
            data: currentPlayer.current
          }
        )
      }
    };

    // Called on incoming message
    subscriptionRef.current.onmessage = (message) => {
      if(message.type === 'ADD_PLAYER_ADMIN' && !players.find(p => p.uid === message.data.uid)) {
        // Only the quiz-master should add the user to the backend aswell
        if(state?.auth?.uid === quizRoom.quiz_master) {
            quizService.addUserToQuizRoom(message.data, roomId)
            .then((data) => {socketService.send({
              type: "ADD_PLAYER",
              data
            })
          })
        }
      }

      if(message.type === 'REMOVE_PLAYER_ADMIN') {
        console.log('REMOVE EM')
        // Only the quiz-master should add the user to the backend aswell
        if(state?.auth?.uid === quizRoom.quiz_master) {
            quizService.removeUserFromQuizRoom(message.data, roomId)
            .then((data) => {socketService.send({
              type: "REMOVE_PLAYER",
              data
            })
          })  
        }
      }
      
      if(message.type === "ADD_PLAYER") {
        setPlayers(players => [...players, message.data])
      }

      if(message.type === "REMOVE_PLAYER") {
        setPlayers(players => players.filter(p => p.uid !== message.data.uid));
      }
      if(message.type === "QUIZ_OVER") {
        history.push('/')
      }
      console.log(message)
    };

    // Called if connection is closed (THIS DIDN'T WORK SO USING beforeunload EVENT LISTENER INSTEAD)
    subscriptionRef.current.onclose = (code, reason) => {
      console.log(code, reason)
    };

    // Called on connection error
    subscriptionRef.current.onerror = (error) => {
      console.log(error)
    };

    const userLeaving = () => {
      if(state?.auth?.uid === quizRoom.quiz_master) {
        socketService.send({
          type: "QUIZ_OVER"
        })
      }
      socketService.send({
        type: "REMOVE_PLAYER_ADMIN",
        data: currentPlayer.current
      })
      socketService.unsubscribe(subscriptionRef.current);
    }

    /**
     * IF A PLAYER LEAVES (BOTH EXITING TAB OR GOING SOMEWHERE ELSE)
     */
    window.addEventListener('beforeunload',  userLeaving);
    return function cleanup() {
      userLeaving()
    }

  }, [quizRoom])


  function sendRoundData() {
    socketService.send("next round")
  }

  useEffect(() => {
      console.log(quizRoom)
  },[quizRoom])

  return (
    <div className="GroupRoom">
      {
        quizRoom ?
          quizRoom.round > 0 ?
            <QuestionRound />
            :
             <WaitingRoom players={players} quizRoom={quizRoom} onBegin={sendRoundData}/>
          :
        <Loading label="Snart klar til å spille?" />
      }
    </div>
  );
}

export default GroupRoom;
