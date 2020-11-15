
import React, { useEffect, useState, useContext } from 'react';
import ActiveRooms from '../components/ActiveRooms/ActiveRooms'
import Button from '../components/Button/Button';
import quizService from '../service/quiz-service'
import { store } from '../store/store';
import { useHistory } from 'react-router-dom';

import './CreateGroupRoom.scss';


function CreateGroupRoom() {
    const [createQuiz, setCreateQuiz] = useState(false)
    const [findingQuiz, setFindingQuiz] = useState(false)
    const [categories, setCategories] = useState(null)
    const [quizes, setQuizes] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(0)
    const { state } = useContext(store);
    const history = useHistory();

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
      console.log(selectedCategory)

    }, [selectedCategory])

    async function createQuizRoom(quizId) {
        let currentUser = await quizService.getCurrentUser() // denne henter fra firebase auth, men vet ikke om vi vil ha denne IDen eller den fra firetore?
        let quizRef = await quizService.getQuizById(quizId);
        let room = {
              active: true,
              finished: false,
              inProgress: false,
              name: state.user.name + "'s Room" ,
              players: [],
              quiz: quizRef.data,
              quiz_master: currentUser.uid,
              round: -1,
            }
        let roomId = await quizService.createQuizRoom(room);
        history.push('/grouproom/' + roomId.data)
    }

  return (
    <div className="CreateGroupRoom">
      {
        createQuiz ?
        <div className="quiz-create">
          <Button onClick={() => {setCreateQuiz(false)}}>Tilbake</Button>
          <h2>Velg kategori</h2>
          <select onChange={(e) => setSelectedCategory(parseInt(e.currentTarget.value))} disabled={findingQuiz} >
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
