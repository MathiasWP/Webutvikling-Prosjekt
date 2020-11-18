import { isInaccessible } from '@testing-library/react';
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import quizService from '../service/quiz-service';
import './CreateQuiz.scss';
import firebase from 'firebase'
import { useHistory } from 'react-router-dom';
import { store } from '../store/store';
import Input from '../components/Input/Input'
import Button from '../components/Button/Button'
import Select from '../components/Select/Select'


function CreateQuiz() {
  const history = useHistory();
  const { state, dispatch } = useContext(store);
  const [title: string, setTitle] = useState("");
  const [categories: object, setCategories] = useState([]);
  const [question: string, setQuestion] = useState("");
  const [answer, SetAnswer] = useState();
  const [checked, setChecked] = useState();
  const [questionsCollection, setQuestionsCollection] = useState([])
  const [buttonClickState, setButton] = useState(false)
  const initialOptionsState = {
    option1: "",
    option2: "",
    option3: "",
    option4: ""
  }
  const [optionsCollection, setOptions] = useState(initialOptionsState);
  const [selectedCategory: string, setSelectedCategory] = useState("1");
  let questionId = 1

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


  function changeTitle(e) {
    const newTitle: string = e.target.value;
    setTitle(newTitle);

  };

  function getCategories() {
    quizService
      .getQuestionsCategories()
      .then((categories) => setCategories(categories))
      .catch((error: Error) => console.log('Error getting categories: ' + error.message));

  };

  useEffect(() => {
    getCategories()
  }, [setCategories])


  function getSelectedCategory(e) {
    const newSelected = e.target.value;
    setSelectedCategory(newSelected)
  }

  function handleQuestionChange(e) {
    const newQuestion: string = e.target.value;
    setQuestion(newQuestion);
  };

  
  function handleOptionsChange(e) {
    const newValue = e.currentTarget.value;
    const inputName = e.currentTarget.name;

    setOptions(preValue => {
      return {
        ...preValue,
        [inputName]: newValue
      }
    })
  };

  function handleChange(e) {
    const newAnswer = e.currentTarget.value;
    const checked = e.currentTarget.name;
    setChecked(checked)
    SetAnswer(newAnswer)
  }

  function buttonHandel() {
    questionId = questionId + 1;
    setQuestionsCollection((prev) => [
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
        <div className="addedQuestion">
          <ul>
            {
              questionsCollection.map(element => <li className="option">
                <h4 key="question">Question: {element.question}</h4>
                Options:
                {Object.values(element.options).map(option => <li>Option: {option}</li>)}
                <b>Right answer: {element.answer}</b>
                <br />
              </li>)
            }
          </ul>
        </div>
      );
    } else return <div></div>;
  }

  function handleSubmit(e: Event) {
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
            <form className="mainForm" onSubmit={handleSubmit}>
              <fieldset>
                <label>
                  <p>Title:</p>
                  <Input type="text" value={title} onChange={changeTitle} autoFocus required />
                </label>
                <br />
                <label>
                  <p>Choose a category:</p>
                  <Select value={selectedCategory} onChange={getSelectedCategory}>
                    {Object.keys(categories).map((key) => <option value={key}>{categories[key]}</option>)}
                  </Select>
                </label>

              </fieldset>
              <fieldset>
                <label>
                  <p>Question:</p>
                  <Input name="question" type="text" value={question} onChange={handleQuestionChange} />
                </label>
                <br />
                <label>
                  <p>Options and choose a right answer:</p>

                  {
                    Object.entries(optionsCollection).map(([key, value], i) => {
                      return (
                          <span key={key} className="optionInput">
                             <Input name={`option${i+1}`} type="text" value={value} onChange={handleOptionsChange} />
                              <input className="radio" type="radio" name={`answer${i+1}`} value={value} checked={answer == value && checked ===`answer${i+1}`} onChange={handleChange} />
                          </span>
                      )
                    })
                  }    
                </label>
                <br />
                <Button type="success" onClick={buttonHandel} disabled={Object.values(optionsCollection).some(o => o.trim().length === 0) || !answer}>Add question</Button>
              </fieldset>
              <Button htmlType="submit" disabled={questionsCollection.length < 1}>
                Create quiz
                </Button>
            </form>


            <div className="addedQuestions">
              <h3>You are adding the following:</h3>
            {checkButton()}
            </div>
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
