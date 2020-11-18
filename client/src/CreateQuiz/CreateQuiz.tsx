import { isInaccessible } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import quizService from '../service/quiz-service';
import './CreateQuiz.scss';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { stringify } from 'querystring';



function CreateQuiz() {

  const history = useHistory();

  const useAuth = () => {
    const fireUser = firebase.auth().currentUser;
    const [user, setUser] = useState(fireUser);

    useEffect(() => {
      const unsub = firebase.auth().onAuthStateChanged((user) => {
        user ? setUser(user) : setUser(null);
      });
      return () => {
        unsub();
      };
    });
    return user;
  };


  const user: firebase.User | null = useAuth();




  const [title, setTitle] = useState<string>("");
  function changeTitle(e) {
    const newTitle: string = e.target.value;
    setTitle(newTitle);

  };


  const [categories, setCategories] = useState([]);
  function getCategories() {
    quizService
      .getQuestionsCategories()
      .then((categories) => setCategories(categories))
      .catch((error: Error) => console.log('Error getting categories: ' + error.message));

  };

  useEffect(() => {
    getCategories()
  }, [setCategories])


  const [selectedCategory, setSelectedCategory] = useState<string>("1");
  function getSelectedCategory(e) {
    const newSelected = e.target.value;
    setSelectedCategory(newSelected)
  }



  const [question, setQuestion] = useState<string>("");
  function handleQuestionChange(e) {

    const newQuestion: string = e.target.value;
    setQuestion(newQuestion);

  };

  interface Options {
    option1: string;
    option2: string;
    option3: string;
    option4: string;
  }


  const initialOptionsState: Options = {
    option1: "",
    option2: "",
    option3: "",
    option4: ""

  }
  const [optionsCollection, setOptions] = useState<Options>(initialOptionsState);
  function handleOptionsChange(e) {
    const newValue = e.target.value;
    const inputName = e.target.name;


    setOptions(preValue => {
      return {
        ...preValue,
        [inputName]: newValue

      }

    })
  };


  const [answer, SetAnswer] = useState<string | null>();
  function handleChange(e) {
    const newAnswer = e.target.value;
    SetAnswer(newAnswer)
  }

  interface Prevalue {
    question: string;
    options: Options;
    answer: string | null;
  }

  let questionId = 1
  const [questionsCollection, setQuestionsCollection] = useState<[{ question: string, options: {}, answer: string }]>([])
  const [buttonClickState, setButton] = useState(false)
  function buttonHandel() {

    questionId = questionId + 1

    setQuestionsCollection((prev: Prevalue) => [
      ...prev, {
        question: question,
        options: optionsCollection,
        answer: answer

      }

    ]
    );

    setButton(true)

    setQuestion("");
    setOptions(initialOptionsState);
    SetAnswer(null)
  }




  function checkButton() {
    if (buttonClickState) {

      return (
        <div>
          You are adding the following:
          <ul>

            {

              questionsCollection.map(element => <div>
                <div key="question">Question: {element.question}</div>

                Options:
                {Object.values(element.options).map(option => <li>Option: {option}</li>)}

                Right answer: {element.answer}
                <br />

              </div>)
            }

          </ul>
        </div>
      );
    } else return <div></div>;
  }


  function handleSubmit(e) {

    e.preventDefault();

    const quizData = {
      creator: user.uid,
      name: title,
      category: parseInt(selectedCategory),
      questions: questionsCollection
    }

    quizService
      .submitQuiz(quizData)
      .then(response => {
        history.push("/user/create/success");

      })
      .catch((error: Error) => console.log('Error ' + error.message));

    setTitle("")

  }


  return (
    <div className="CreateQuiz" >
      {
        user ?
          <>

            <h2>Make your own quiz</h2>
            {checkButton()}

            <form className="mainForm" onSubmit={handleSubmit}>


              <fieldset>
                <label>
                  <p>Title:</p>
                  <input className="inputTitle" type="text" value={title} onChange={changeTitle} autoFocus required />
                </label>
                <br />
                <label>
                  <p>Choose a category:</p>
                  <select value={selectedCategory} onChange={getSelectedCategory}>
                    {Object.keys(categories).map((key) => <option value={key}>{categories[key]}</option>)}
                  </select>
                </label>

              </fieldset>

              <fieldset>
                <label>
                  <p>Question:</p>
                  <input className="inputQuestion" name="question" type="text" value={question} onChange={handleQuestionChange} />
                </label>
                <br />
                <label>
                  <p>Options and choose a right answer:</p>
                  <input className="inputOption" name="option1" type="text" value={optionsCollection.option1} onChange={handleOptionsChange} />
                  <input className="radio" type="radio" name="answer" value={optionsCollection.option1} checked={answer == optionsCollection.option1} onChange={handleChange} />
                  <br />
                  <input className="inputOption" name="option2" type="text" value={optionsCollection.option2} onChange={handleOptionsChange} />
                  <input className="radio" type="radio" name="answer" value={optionsCollection.option2} checked={answer == optionsCollection.option2} onChange={handleChange} />
                  <br />
                  <input className="inputOption" name="option3" type="text" value={optionsCollection.option3} onChange={handleOptionsChange} />
                  <input className="radio" type="radio" name="answer" value={optionsCollection.option3} checked={answer == optionsCollection.option3} onChange={handleChange} />
                  <br />
                  <input className="inputOption" name="option4" type="text" value={optionsCollection.option4} onChange={handleOptionsChange} />
                  <input className="radio" type="radio" name="answer" value={optionsCollection.option4} checked={answer == optionsCollection.option4} onChange={handleChange} />


                </label>
                <br />

                <br />
                <button className="btn" type="button" onClick={buttonHandel}>Add question</button>
              </fieldset>
              <br />
              <input className="submitButton" type="submit" value="Submit" />

            </form>





          </>
          :
          <>
            <p>please login</p>
          </>
      }




    </div >
  );
}

export default CreateQuiz;
