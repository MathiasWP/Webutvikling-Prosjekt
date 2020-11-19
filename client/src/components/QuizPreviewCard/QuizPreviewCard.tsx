import React from 'react';

import './QuizPreviewCard.scss';

type QuizPreviewCardProps = {quiz: Record<string, unknown>, onClick: void};

function QuizPreviewCard({ quiz, onClick }: QuizPreviewCardProps) {

  return (
    <section key={quiz.id} className="quiz-preview" onClick={onClick}>
    <h4>{quiz.name}</h4>
    <h5>Spørsmål:</h5>
    <ol>{Object.entries(quiz.questions).map(([key, value]) => {
      return (<li key={key}>{value.question}</li>)
    })}</ol>
  </section>
  );
}

export default QuizPreviewCard;
