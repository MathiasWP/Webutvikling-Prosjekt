import React, { useEffect, useState } from 'react';
import quizService from '../service/quiz-service';
import { useParams } from 'react-router-dom'
import firebase from 'firebase'
import './QuizDetails.scss';



function QuizDetails(props) {

    /*cost  questions = [{ question: "", options: {}, answer: "" }]*/

    const [questions, setQuestions] = useState([{ question: "", options: {}, answer: "" }])

    const quizId = props.match.params.id

    function getQuizDetails() {
        quizService
            .getQuizDetails(quizId)
            .then((data) => setQuestions(data.questions))
            .catch((error: Error) => console.log('Error getting categories: ' + error.message));

    };

    useEffect(() => {
        getQuizDetails()
    }, [setQuestions]);


    function updateSingleQuestion(index, e) {
        console.log("index: " + index + " event " + e.target.value)
        setQuestions(prevState => (prevState.map(
            (el, idx) => idx === index ? { ...el, question: e.target.value } : el
        )))
    }
    function updateSingleAnswer(index, e) {
        console.log("index: " + index + " event " + e.target.value)
        setQuestions(prevState => (prevState.map(
            (el, idx) => idx === index ? { ...el, answer: e.target.value } : el
        )))
    }

    function updateSingleOption(index, key, e) {
        console.log("index: " + index + " key " + " event " + e.target.value)
        setQuestions(prevState => (prevState.map(
            (el, idx) => idx === index ? { ...el, options: { ...el.options, [key]: e.target.value } } : el
        )))
    }

    /*function updateEachOption(index, e) {
        console.log("index: " + index + " event " + e.target.value)
        setQuestions(prevState => (prevState.map(
            (el, idx) => idx === index ? { ...el, : e.target.value } : el
        )))
    }*/

    function updateQuiz() {

        const quizId = props.match.params.id

        const newQuestions = questions

        quizService
            .updateQuiz(newQuestions, quizId)
            .then(response => {
                console.log("success")

            })
            .catch((error: Error) => console.log('Error ' + error.message));



    }


    return (
        <div className="QuizDetails">


            <div>
                {questions.map((item, index) =>
                    <div>
                        <p className="row">Question:<input className="questionInput" value={item.question} onChange={(e) => updateSingleQuestion(index, e)} /></p>
                        <br></br>

                        <p className="row">Options: {Object.entries(item.options).map(([key, value]) => <input value={value} onChange={(e) => updateSingleOption(index, key, e)} />)}</p>
                        <br></br>

                        <p className="row">Answers:<input value={item.answer} onChange={(e) => updateSingleAnswer(index, e)} /></p>
                        <br></br>

                    </div>)}



            </div>

            <button onClick={updateQuiz}>Update your quiz</button>



        </div >
    );
}

export default QuizDetails;
