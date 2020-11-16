import React, { useEffect, useState } from 'react';

import './QuestionCard.scss';

type QuestionCardProps = {}; // This any is not correct

function QuestionCard({ question, onAnswer, disabledAnswers }: QuestionCardProps) {
  const correctAnswer = question.answer // THIS WILL BE CHANGES FROM ARRAY TO STRING( changed !!!)
  const options = question.options;
  const questionText = question.question//Changed it from questions to question according to the change in createQuiz page;
  const [chosen, setChosen] = useState(null)
  const [answersLocked, setAnswersLocked] = useState(false)

  function handleCheck(e) {
    if (!answersLocked) {
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
                <input disabled={disabledAnswers || answersLocked} onChange={handleCheck} type="radio" name="choice" value={opt} />
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default QuestionCard;
