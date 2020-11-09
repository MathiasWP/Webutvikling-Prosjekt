import { isInaccessible } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import quizService from '../service/quiz-service';
import './CreateQuiz.scss';
import firebase from 'firebase'
import { useHistory } from 'react-router-dom';



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


  const user = useAuth();


  const [title, setTitle] = useState("");

  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  function getSelectedCategory(e) {
    const newSelected = e.target.value;
    setSelectedCategory(newSelected)
  }

  console.log(selectedCategory)

  const [question, setQuestion] = useState("");

  const initialOptionsState = {
    option1: "",
    option2: "",
    option3: "",
    option4: ""

  }

  const [optionsCollection, setOptions] = useState(initialOptionsState);

  const [answersCollection, setAnswers] = useState([]);



  function changeTitle(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);

  };

  useEffect(() => {
    getCategories()
  }, [setCategories])


  function getCategories() {
    quizService
      .getQuestionsCategories()
      .then((categories) => setCategories(categories))
      .catch((error: Error) => console.log('Error getting categories: ' + error.message));
  };


  function handleQuestionChange(e) {

    const newQuestion = e.target.value;
    setQuestion(newQuestion);

  };

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
  /* setAnswers(answersCollection => [...answersCollection, newAnswer]);*/

  function handleAnswersChange(e) {

    const name = e.target.name;

    const newAnswer = e.target.value;

    setAnswers(preValue => {

      if (name === "answer1") {
        return [
          newAnswer,
          preValue[1],
          preValue[2]
        ]

      } else if (name === "answer2") {
        return [
          preValue[0],
          newAnswer,
          preValue[2]
        ]

      } else if (name === "answer3") {
        return [
          preValue[0],
          preValue[1],
          newAnswer
        ]



      }
    })



  };

  function getaAnswer(index) {
    if (index < answersCollection.length) {
      return answersCollection[index]
    } else {
      return ""
    }
  }

  let questionId = 1


  const [questionsCollection, setQuestionsCollection] = useState([])

  console.log(questionsCollection)
  const [buttonClickState, setButton] = useState(false)



  function buttonHandel() {

    questionId = questionId + 1

    setQuestionsCollection((prev) => [
      ...prev, {
        questions: question,
        options: optionsCollection,
        answers: answersCollection

      }

    ]




    );

    setButton(true)

    setQuestion("");
    setOptions(initialOptionsState);
    setAnswers([])



  }
  console.log(questionsCollection)


  function checkButton() {
    if (buttonClickState) {
      return (
        <div>
          You are adding the following:
          <ul>

            {

              questionsCollection.map(element => <div>
                <div key="questions">question:{element.questions}</div>
                <br />
                {Object.values(element.options).map(option => <li>option:{option}</li>)}
                <br />
                {element.answers.map(answer => <li>answer:{answer}</li>)}

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
        history.push("/:user/create/success");
        console.log('Success:', response)
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
                  <input type="text" value={title} onChange={changeTitle} autoFocus />
                </label>
                <br />
                <label>
                  <p>Choose categorier:</p>
                  <select value={selectedCategory} onChange={getSelectedCategory}>
                    {Object.keys(categories).map((key) => <option value={key}>{categories[key]}</option>)}
                  </select>
                </label>

              </fieldset>

              <fieldset>
                <label>
                  <p>Question:</p>
                  <input name="question" type="text" value={question} onChange={handleQuestionChange} />
                </label>
                <br />
                <label>
                  <p>Options:</p>
                  <input name="option1" type="text" value={optionsCollection.option1} onChange={handleOptionsChange} />
                  <input name="option2" type="text" value={optionsCollection.option2} onChange={handleOptionsChange} />
                  <input name="option3" type="text" value={optionsCollection.option3} onChange={handleOptionsChange} />
                  <input name="option4" type="text" value={optionsCollection.option4} onChange={handleOptionsChange} />


                </label>
                <br />
                <label>
                  <p>Answers:</p>
                  <input type="text" name="answer1" value={getaAnswer(0)} onChange={handleAnswersChange} />
                  <input type="text" name="answer2" value={getaAnswer(1)} onChange={handleAnswersChange} />
                  <input type="text" name="answer3" value={getaAnswer(2)} onChange={handleAnswersChange} />

                </label>
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
