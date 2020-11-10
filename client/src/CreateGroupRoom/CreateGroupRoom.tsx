import React, { useEffect, useState, useContext } from 'react';
import ActiveRooms from '../components/ActiveRooms/ActiveRooms'
import Button from '../components/Button/Button';
import quizService from '../service/quiz-service'
import { store } from '../store/store';

import './CreateGroupRoom.scss';


function CreateGroupRoom() {
    const [createQuiz, setCreateQuiz] = useState(false)
    const [findingQuiz, setFindingQuiz] = useState(false)
    const [categories, setCategories] = useState(null)
    const [quizes, setQuizes] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const { state } = useContext(store);

    useEffect(() => {  
        const fetchData = async () => {
            const {categories} = await quizService.getCategories();
            setCategories(categories);

        };
        fetchData();
    }, []);

    useEffect(() => {
      if(selectedCategory === -1) return;
      async function findQuiz() {
        setFindingQuiz(true);
        const quizes = await quizService.findQuizesByCategory(selectedCategory);
        if(quizes) {
          setQuizes(quizes)
          setFindingQuiz(false)
        }
      }
      findQuiz()
    }, [selectedCategory])

    async function createQuizRoom(quizId) {
      /**
       * Add in stuff to create a quiz room - it is pretty straight
       * forward. Just follow the setup we have created in the firestore
       * and when it's created: send the user to the group-room. Because
       * the id of the quiz-master is added to the group-room it's
       * easy to know that current user is the quiz master, no need for fancy
       * middleware stuff.
       */
    }
  
  return (
    <div className="CreateGroupRoom">
      {
        createQuiz ?
        <div className="quiz-create">
          <Button onClick={() => {setCreateQuiz(false)}}>Tilbake</Button>
          <h2>Velg kategori</h2>
          <select onChange={(e) => setSelectedCategory(e.currentTarget.value)} disabled={findingQuiz} >
            <option value={-1}>Velg kategori</option>
            {categories && 
            Object.entries(categories).map(([key, value]) => <option value={key} key={key}>{value}</option>)}
          </select>

          {
            quizes.length > 0 ?
            <div>
                {quizes.map(quiz => {
                  return (
                    <section key={quiz.id} className="quiz-preview" onClick={() => createQuizRoom(quiz.id)}>
                    <h4>{quiz.name}</h4>
                    <h5>Spørsmål:</h5>
                    <ol>{Object.entries(quiz.questions).map(([key, value]) => {
                    return (<li key={key}>{value.question}</li>)
                    })}</ol>
                    </section>
                  )
                })}
              </div>
              :
              <h3>Ingen quizer funnet...</h3>
          }
        </div>
        :
        <>
        <ActiveRooms />
        {
         state?.user && 
        <Button onClick={() => {setCreateQuiz(true)}}>
          Lag eget grupperom
        </Button>
        }
        </>
      }
    </div>
  );
}

export default CreateGroupRoom;
