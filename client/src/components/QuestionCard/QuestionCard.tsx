import React, { useEffect, useState } from 'react';

import './QuestionCard.scss';

type QuestionCardProps = {question: Record<string, unknown>, onAnswer: void, disabledAnswers: boolean}; // This any is not correct

function QuestionCard({ question, onAnswer, disabledAnswers }: QuestionCardProps) {
  const correctAnswer = question.answer // THIS WILL BE CHANGES FROM ARRAY TO STRING( changed !!!)
  const options = question.options;
  const questionText = question.question//Changed it from questions to question according to the change in createQuiz page;
  const [chosen, setChosen] = useState(null)

  function handleCheck(e) {
    if (!disabledAnswers) {
      setChosen(e.currentTarget.value)
    }
  }


  console.log(disabledAnswers)

  useEffect(() => {
    if(chosen) {
      onAnswer(chosen)
      setChosen(null)
    }
  }, [chosen])

  return (
    <div>
      <h3>{questionText}</h3>
      <div className="choices">
        {
          Object.entries(options).map(([opt, value], i) => {

            return (
              <span key={opt} value={opt}>
                <span className={`option ${disabledAnswers && 'disabled'}`} >
                <input name={'choice' + i} disabled={disabledAnswers} id={'choice' + i} onChange={handleCheck} type="radio" value={opt} />
                <label htmlFor={'choice' + i}>{value}</label>
                </span>
              </span>
            )
          })
        }
      </div>
    </div>
  );
}

export default QuestionCard;
