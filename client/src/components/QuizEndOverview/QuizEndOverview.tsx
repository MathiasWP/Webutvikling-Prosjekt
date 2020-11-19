import React, { useEffect, useState } from 'react';
import QuestionCard from '../QuestionCard/QuestionCard'
import './QuizEndOverview.scss';
import Button from '../Button/Button'
type QuizEndOverviewProps = { overview: Record<string, unknown> }; 

function QuizEndOverview({ overview }: QuizEndOverviewProps) {
  console.log(overview)
  return (
    <div className="overview-wrapper">
      <h1>Your answers:</h1>
      
      <div className="overview">
      {
        Object.entries(overview).map(([round, stats]) => {
          return (
            <div className="stats" key={round}>
                <span>
              Round:
              <p>
               {round}
              </p>
                </span>
                <span>
              Your answer:
               <p>
                {stats.answered}
                </p>
                </span>
                <span>
              Correct answer:
              <p>
               {stats.correctAnswer}
              </p>
                </span>
                <span>
              Epic win:
              <p>
               {`${stats.correctAnswer === stats.answered}`}
              </p>
                </span>
            </div>
            )

        })
      }
      </div>
    </div>
  );
}

export default QuizEndOverview;
