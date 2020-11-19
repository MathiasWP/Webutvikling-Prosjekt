import React, { useEffect, useState, useContext } from 'react';
import QuestionRound from '../components/QuestionRound/QuestionRound';
import quizService from '../service/quiz-service'
import './SinglePlayer.scss';


function SinglePlayer() {

  const [allQuizes, setAllQuizes] = useState([]);

  useEffect(() => {
      quizService.getAllQuizes()
      .then(data => {
        setAllQuizes(data)
      })
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
      console.log(allQuizes)
  }, [allQuizes])


  return (
    <div className="SinglePlayer">
      <div>
      <h2>Finn din quiz:</h2>
      </div>
    </div>
  )
}

export default SinglePlayer;
