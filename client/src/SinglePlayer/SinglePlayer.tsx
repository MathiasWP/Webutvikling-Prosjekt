import React, { useEffect, useRef, useState } from 'react';
import QuestionRound from '../components/QuestionRound/QuestionRound';
import QuizEndOverview from '../components/QuizEndOverview/QuizEndOverview';
import Input from '../components/Input/Input';
import quizService from '../service/quiz-service'
import './SinglePlayer.scss';
import Button from '../components/Button/Button';
import QuizPreviewCard from '../components/QuizPreviewCard/QuizPreviewCard';


function SinglePlayer() {
  const [searchValue, setSearchValue] = useState('');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);
  const answersRef = useRef({});
  const [isSearching, setIsSearching] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showQuizes, setShowQuizes] = useState(false);
  const [searchedQuizes, setSearchedQuizes] = useState([]);
  const [allQuizes, setAllQuizes] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
      quizService.getAllQuizes()
      .then(data => {
        setAllQuizes(data)
      })
      .catch(error => console.error(error))

      quizService.getQuestionsCategories()
      .then(data => {
        setCategories(data)
      })
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
      console.log(allQuizes)
      console.log(categories)
  }, [allQuizes, categories])

  function goToCategory(index) {
    setShowQuizes(true)
    setCurrentCategory(index)
  }

  function playQuiz(quiz) {
    setActiveQuiz(quiz)
    console.log(quiz)
  }

  function searchForQuiz(event) {
    const value = event.currentTarget.value;
    if(value.trim().length > 0)  {
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }
    setSearchValue(value)

  }

  function nextRound(answer) {
    answersRef.current[currentRound] = {
      answered: answer,
      correctAnswer: activeQuiz.questions[currentRound].answer
    }
    setCurrentRound(c => c += 1)
  }


  useEffect(() => {
      const foundBySearching = allQuizes.filter(q => {
        return q.name.toLowerCase().includes(searchValue.toLowerCase())
      });
      setSearchedQuizes(foundBySearching);
  }, [searchValue, allQuizes])

  return (
    <div className="SinglePlayer">
      <div>
    {
        activeQuiz ? 
        activeQuiz?.questions[currentRound] ? 
        <QuestionRound allQuestions={activeQuiz.questions} round={currentRound} onAnswer={nextRound}/>
        :
        <QuizEndOverview overview={answersRef.current}/>
        :
        <>
        <h2>Finn din quiz:</h2>
         <Input placeholder="Search for quiz" value={searchValue} onChange={searchForQuiz}/>
          {
            (isSearching && allQuizes) || (allQuizes && currentCategory && showQuizes) ?
            <div className="quizes">
              {currentCategory && <Button onClick={() => {setCurrentCategory(null)}}>Go back</Button>}
              <h3>Category {categories[currentCategory]}</h3>
                {
                  (searchedQuizes || allQuizes).filter(q => {
                    if(searchedQuizes && !currentCategory) { // Return all if searching
                      return q
                    } else {
                      return Number(q.category) === Number(currentCategory)
                    }
                    }).map(quiz => {
                      return (
                        <QuizPreviewCard onClick={() => playQuiz(quiz)} key={quiz.id} quiz={quiz}/>
                      )
                    })
                }
            </div>
        :
              <div className="categories">
                {
                  Object.entries(categories).map(([num, category]) => {
                    return (
                      <div key={category} className="category" onClick={() => goToCategory(num)}>
                          <h3>
                            {category}
                          </h3>
                      </div>
                    )
                  })
                }
              </div>
        }
    </>
    }
      </div>
    </div>
  )
}

export default SinglePlayer;
