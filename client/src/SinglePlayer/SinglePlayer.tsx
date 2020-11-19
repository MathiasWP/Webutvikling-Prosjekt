import React, { useEffect, useState, useContext } from 'react';
import QuestionRound from '../components/QuestionRound/QuestionRound';
import quizService from '../service/quiz-service'
import { search } from '../__mocks__/fileMock';
import './SinglePlayer.scss';
import { db } from './firebase'


function SinglePlayer() {

  const [categories, setCategories] = useState([]);
  const [quizes, setQuizes] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [quiz, setQuiz] = useState(undefined)
  const [bestemmer, setBestemmer] = useState(undefined)
  let [data, setData] = useState(undefined)
  const [valgt, setValgt] = useState()
  const [disabledAnswers, setDisabledAnswers] = useState(false);
  let [rundeteller, setRundeteller] = useState(0)
  const [isQuizMaster, setIsQuizMaster] = useState();
  const [quizferdig, setQuizFerdig] = useState()
  const [useranswer, setUserAnswer] = useState([])
  const [antallriktige, setAntallRiktige] = useState([])
  
  const [allquizes, setAllQuizes] = useState([])  
  const [filtered, setFiltered] = useState([])  

  let arr = ['a', 'b', 'c', 'abe', 'okse', 'gdkfg', 'mxcviyr', 'wermcvbbbb', 'qert', 'wegsdfdsf', 'uhbtg'];

 

  function getSelectedCategory(e) {
    const newSelected = e.target.value;
    setSelectedCategory(newSelected)
  }



 
  function onAnswer(answer){
    answer!=false?
  console.log(answer)
  :
  console.log('hei')

  rundeteller+1 < valgt.questions.length?
  setRundeteller(rundeteller+1)
  :
  setQuizFerdig(1)

 
  setUserAnswer(useranswer.concat(answer))
  
  answer==valgt.questions[rundeteller].answer?
  setAntallRiktige(antallriktige.concat(answer))
    :
  <h1></h1>
 }




  useEffect(() => {
    getCategories()
  }, [setCategories]
  
  )
  useEffect(() => {
    getAllQuizes()
  },[setAllQuizes]
  )
  function changeround() {
   }
function getAllQuizes(){
  quizService
  .getqqq()
  .then((data) => setAllQuizes(data))
  .catch((error: Error) => console.log('Error getting categories: ' + error.message));
  console.log(allquizes)

  
}
  function getCategories() {
    quizService
      .getQuestionsCategories()
      .then((categories) => setCategories(categories))
      .catch((error: Error) => console.log('Error getting categories: ' + error.message));

 

      searchbar.addEventListener('keyup', (e)=> {
        const searchstring = (e.target.value.toLowerCase());
        const filtered = arr.filter((arr)=> { return (arr.toLowerCase().includes(searchstring))});
        setFiltered(filtered)
        

      })
    
  };

  async function createQuizRoom(quizen) {
    setData(quizen)
    setValgt(quizen)
    setBestemmer(1)
  }
  useEffect(()=> {
    quizferdig==true?
    setData(undefined)
    
    :
    setBestemmer(bestemmer)

  })
    useEffect(async () => {
        const parsed =parseInt(selectedCategory, 10)
        const quizes = await quizService.findQuizesByCategory(parsed)
        setQuizes(quizes) 
 

    }, [selectedCategory])

  return (
    <div className="SinglePlayer">


  
       {bestemmer==undefined?
            <label>
                <select value={selectedCategory} onChange={getSelectedCategory}>
                    <option value={-1}>Velg kategori</option>
{                    Object.keys(categories).map((key) => <option value={key}>{categories[key]}</option>)}
                </select>

            </label>
            :
            <h1></h1>
            


          }         
          {
            bestemmer==undefined?
              
            <div>
            {quizes.map(quiz => {
              return (
                <section key={quiz.id} className="quiz-preview" onClick={ () => createQuizRoom(quiz)}>
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
                  
              <h1></h1>   
            
            
            }

            
      {bestemmer==undefined?
      <label>
        <input type="text" name="seachbar" id="searchbar" placeholder="søk etter navn"></input>
        <ul>
          
{                    Object.keys(filtered).map((key) => <li value={key}>{filtered[key]}</li>)}
        </ul>
      </label>
        :
        <h1></h1>
      }
            



           
    
    {
            data==undefined ? 
            <h1></h1>
            :
            <QuestionRound disabledAnswers={disabledAnswers} isQuizmaster={isQuizMaster} onChangeRound={changeround} allQuestions={valgt.questions}  round={rundeteller} onAnswer={onAnswer} />
            

          }

    {

      quizferdig==undefined ?
      <h1></h1>
      :
      <table>
       <thead><tr>
          <th>Spørsmål</th>
          <th>Riktig svar</th>
          <th>Ditt svar</th>
        </tr></thead>
        <tbody>
        {Object.keys(useranswer).map((key) => <tr><td value={key}>{valgt.questions[key].question}</td><td>{valgt.questions[key].answer}</td><td>{useranswer[key]}</td></tr>)}
        </tbody>    
      </table>
      
    }
    {
      quizferdig==undefined ?
      <h1></h1>
      :
    <h1>Antall riktige: {antallriktige.length}</h1>
    }
    </div>
  );
}

export default SinglePlayer;
