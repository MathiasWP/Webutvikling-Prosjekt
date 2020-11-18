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
  const [isReady, setIsReady] = useState(false)
  const [players, setPlayers] = useState([]);
  const [currentRoundAnswers, setCurrentRoundAnswers] = useState([]);
  const [isQuizMaster, setIsQuizMaster] = useState(false);
  const [disabledAnswers, setDisabledAnswers] = useState(false);
  // Using refs because their value is updated immediately (but doesn't cause a re-render). Useful for knowing current data-values
  const subscriptionRef = useRef(null);
  const roundAnswers = useRef(null);
  const alreadyInitRoom = useRef(false);
  const currentPlayer = useRef(null);

  const location = useLocation();
  const { state } = useContext(store);
  const roomId = location.pathname.split('/').pop(); // For some reason the param/key object is weird, so we have to extract it the rough way  

  useEffect(() => {
      const fetchData = async () => {
          const result = await quizService.getRoom(roomId);
          setQuizRoom(result);
          setPlayers(result.players)
      };

      if(state?.user === null) {
        /**
         * User that joined doesn't have a userprofile.
         * Considering that we have to choies:
         * 1. Create a user with random data and add information in their cookie
         * 2. See if the user already has the cookie, and if yes, use that information
         */
        if(document.cookie.includes("uid")) {
            const cookieArr = document.cookie.split(';').map(i => i.trim().split('='))
            currentPlayer.current = {
              name: cookieArr[1][1],
              uid: cookieArr[0][1]
            }
        } else {
          currentPlayer.current = {
            name: `Bobby ${Math.random()}`,
            uid: uuidv4()
          }
         document.cookie = `uid=${currentPlayer.current.uid};`;
         document.cookie = `name=${currentPlayer.current.name};`;
        }
      } else {
        /**
         * User has a profile, so just use that one
         */
        currentPlayer.current = {
          name: state.user.name,
          uid: state.auth.uid
        }
      }
      fetchData();
    }, []);
    

    // This may be an extra step to take (this could just be checked in the isReady useEffect below)
    // but it's just for having a little more control over the state-cycles 
    useEffect(() => {
      if(quizRoom && currentPlayer.current.uid !== undefined) {        
        setIsReady(true);
      }
    }, [quizRoom, currentPlayer])


  useEffect(() => {
     if(!alreadyInitRoom.current && isReady) {
       alreadyInitRoom.current = true;
       /**
        * Find out if the current user is the quiz-master or not
        */
      const isMaster = state?.auth?.uid === quizRoom.quiz_master;
      setIsQuizMaster(isMaster);


      /**
       * SOCKETS BABY
       */
      subscriptionRef.current = socketService.subscribe();

      // Called when the subscription is ready
      subscriptionRef.current.onopen = () => {
        if(!quizRoom.players.find(p => p.uid === currentPlayer.current.uid) && currentPlayer.current.uid !== quizRoom.quiz_master) {
          socketService.send(
            {
              type: "ADD_PLAYER_ADMIN",
              data: currentPlayer.current
            }
          )
        } else {
          console.log(currentPlayer)
          socketService.send(
            {
              type: "PLAYER_REJOINED",
              data: currentPlayer.current
            }
          )
        }
      };

      // Called on incoming message
      subscriptionRef.current.onmessage = (message) => {
        /**
         * Socket messages that are exclusive to the quiz-master
         * Mostly for doing admin stuff like altering the firestore.
         */
        if(isMaster) {
          if(message.type === 'ADD_PLAYER_ADMIN' && !players.find(p => p.uid === message.data.uid)) {
            // Only the quiz-master should add the user to the backend aswell
                quizService.addUserToQuizRoom(message.data, roomId)
                .then((data) => {socketService.send({
                  type: "ADD_PLAYER",
                  data
                })
              })
            }


          if(message.type === 'PLAYER_REJOINED') {
            // If a player rejoined (for example refreshed their page) and have already given answers then the quiz-master disables her radio-buttons
            if(roundAnswers.current.find(a => a.user.uid === message.data.uid)) {
              socketService.send({
                    type: "DISABLE_PLAYER_OPTIONS",
                    uid: message.data.uid
                  });
              }
            }

          if(message.type === 'REMOVE_PLAYER_ADMIN') {
            // Only the quiz-master should remove the user to the backend aswell
                quizService.removeUserFromQuizRoom(message.data, roomId)
                .then((data) => {socketService.send({
                  type: "REMOVE_PLAYER",
                  data
                })
              })  
            }

            if(message.type === 'ANSWERED_QUESTION') {
              if(!message.data.answer) {
                return;
              }
              setCurrentRoundAnswers(a => [...a, message.data])
            }
        }
        

        /**
         * Normal socket-messages that all players can recieve (mostly for updating the UI)
         * and going to the next quiz-room
         */
        if(message.type === "ADD_PLAYER") {
          setPlayers(players => [...players, message.data])
        }
        if(message.type === "REMOVE_PLAYER") {
          setPlayers(players => players.filter(p => p.uid !== message.data.uid));
        }
        if(message.type === "QUIZ_ROOM") {

          if(message.room.finished) {
            //alert("DONE")
          }
          console.log('CHANGED ROOM')
          setDisabledAnswers(false);
          setQuizRoom(message.room)
        }

        if(message.type === 'DISABLE_PLAYER_OPTIONS' && message.uid === currentPlayer.current.uid) {
          console.log('hello')
          setDisabledAnswers(true);
        }

        if(message.type === "QUIZ_OVER") {
          //alert('Quiz is over, the quiz-master left')
          //history.push('/')
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


      /**
       * Not sure what to do here yet, what should happen if the quiz-master
       * leaves? Or a user?
       * 
       * Atm if a user leaves then the user is removed from the firestore
       * (but not in cookies), so wanna decide what to do.
       */
      const userLeaving = () => {
        if(isMaster) {
          socketService.send({
            type: "QUIZ_OVER"
          });
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
        window.addEventListener('beforeunload', () => {
         // document.cookie = '';
        });

        return function cleanup() {
            userLeaving()
        }
  }
  
  }, [isReady])


  useEffect(() => {
    roundAnswers.current = currentRoundAnswers
  }, [currentRoundAnswers])

  /**
   * Beginning the quiz (setting the round equal to 0 in firestore)
   */
  function beginQuiz() {
    quizService.beginQuizRoom(roomId)
    .then((data) => {
      setQuizRoom(data)
      socketService.send({
        type: "QUIZ_ROOM",
        room: data
      })
    })
  }

  /***
   * Sending a socket if someone answered a question, currently
   * this message is only read by the quiz-master
   */
  function answerQuestion(answer) {
    socketService.send({
      type: "ANSWERED_QUESTION",
      data: {
        user: currentPlayer.current,
        answer
      }
    })
    setDisabledAnswers(true)
    console.log("I answered", answer)
  }

  /**
   * Changing the round (incrementing the value by 1).
   * Still have to decide what to do when the round is over.
   */
  function changeRound() {
    quizService.changeQuizRoomRound(roomId)
    .then((data) => {
      //console.log(data)
      setQuizRoom(data)
      socketService.send({
        type: "QUIZ_ROOM",
        room: data
      })
    })
  }


  return (
    <div className="GroupRoom">
      {
        quizRoom ?
        quizRoom.finished ?
        <h2>Spillet er over!</h2>
        :
          quizRoom?.round >= 0 ?
            <QuestionRound disabledAnswers={disabledAnswers} isQuizMaster={isQuizMaster} onChangeRound={changeRound} allQuestions={quizRoom.quiz.questions} round={quizRoom.round} onAnswer={answerQuestion} />
            :
             <WaitingRoom players={players} quizRoom={quizRoom} onBegin={beginQuiz}/>
          :
        <Loading label="Snart klar til å spille?" />
      }
      {
        isQuizMaster &&
        <div>
          <h3>Answers:</h3>
          <ul>
            {
              currentRoundAnswers.map((a, i) => {
                return (
                <li key={`${a.user.uid}${i}`}>{a.user.name} answered {a.answer}</li>
                )
              })
            }
          </ul>
        </div>
      }
    </div>
  );
}

export default GroupRoom;
