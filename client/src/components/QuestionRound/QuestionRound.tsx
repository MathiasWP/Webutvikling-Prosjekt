import React, { useEffect, useState } from 'react';
import QuestionCard from '../QuestionCard/QuestionCard'
import './QuestionRound.scss';
import Button from '../Button/Button'
type QuestionRoundProps = { allQuestions: Record<string, unknown>, disabledAnswers: boolean, round: number, onAnswer: void, onChangeRound: void, isQuizMaster: boolean }; // This any is not correct

function QuestionRound({ allQuestions, disabledAnswers, round, onAnswer, onChangeRound, isQuizMaster }: QuestionRoundProps) {
  return (
    <div className="round">
      <h1>Round {round + 1}</h1>
      {
        isQuizMaster ?
          <Button onClick={onChangeRound}>Neste runde</Button>
          :
          <QuestionCard disabledAnswers={disabledAnswers} question={allQuestions[round]} onAnswer={onAnswer} />
      }
    </div>
  );
}

export default QuestionRound;
