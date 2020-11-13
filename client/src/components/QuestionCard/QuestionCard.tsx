import React, { useEffect, useState } from 'react';

import './QuestionCard.scss';

type QuestionCardProps = {}; // This any is not correct

function QuestionCard({question, onAnswer, disabledAnswers}:QuestionCardProps) {
  const correctAnswer = question.answers[0] // THIS WILL BE CHANGES FROM ARRAY TO STRING
  const options = question.options;
  const questionText = question.questions;
  const [chosen, setChosen] = useState(null)
  const [answersLocked, setAnswersLocked] = useState(false)

  function handleCheck(e) {
    if(!answersLocked) {
      setChosen(e.currentTarget.value)
    }
    setAnswersLocked(true)
  }

  useEffect(() => {
    onAnswer(chosen)
  }, [chosen])

  return (
    <div>
      <h1>{questionText}</h1>
      <ul>
        {
          Object.entries(options).map(([opt, value]) => {
          
            return (
            <li key={opt} value={opt}>
                {value}
                <input disabled={disabledAnswers || answersLocked} onChange={handleCheck} type="radio" name="choice" value={opt}/>
            </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default QuestionCard;
