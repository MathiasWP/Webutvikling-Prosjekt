import React, { useEffect, useState, useContext, useRef } from 'react';

import './UserProfile.scss';

import quizService from '../service/quiz-service'

import Input from '../components/Input/Input'
import Button from '../components/Button/Button'
import Loading from '../components/Loading/Loading'

import { store } from '../store/store';

import { NavLink } from 'react-router-dom'

import { useHistory } from 'react-router-dom';

function UserProfile() {
    const history = useHistory();
    const { state, dispatch } = useContext(store);

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [showSaveUsername, setShowSaveUsername] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const storedUsername = useRef();
    const [error, setError] = useState({ error: '', message: '' });
    const [feedback, setFeedback] = useState(null);

    function handleError(error: { code: string, message: string }) {
        const { code, message } = error;
        setError({ error: code, message: message });
        setIsLoading(false);
    }


    function handleLogIn() {
        setIsLoading(true);

        quizService.logIn(username, password)
            .then(data => {
                // console.log(data)
            })
            .catch(error => handleError(error))
    }


    function handleCreateUser() {
        setIsLoading(true);
        quizService.createUser(username, password)
            .catch(error => handleError(error))
    }

    function handleSignOut() {
        setUsername('');
        setPassword('');
        quizService.signOut();
    }


    function handleUsernameChange(e) {
        const value = e.currentTarget.value
        setUsername(value);
        setShowSaveUsername(value !== storedUsername.current);
    }


    function changeUserName() {
        quizService
            .changeUsername(username)
            .then(() => {
                storedUsername.current = username;
                setShowSaveUsername(username !== storedUsername.current);
                setFeedback({ type: 'username', message: "New username saved!" });

                setTimeout(() => {
                    setFeedback(null);
                }, 3200)
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        if (state.user?.name) {
            const currentValue = state.user.name;
            setUsername(currentValue);
            storedUsername.current = currentValue;
            setIsLoading(false);
        }
    }, [state])

    function updateQuiz() {

        const quizId = props.match.params.id

        const newQuestions = questions

        quizService
            .updateQuiz(newQuestions, quizId)
            .then(response => {
                history.push("/user/update/success");


            })
            .catch((error: Error) => console.log('Error ' + error.message));



    }

    function deleteQuizInBoth(quizObject) {

        const userId = quizService.getCurrentUser().uid
        const quizId = quizObject.quizid


        quizService.deleteQuizInUsers(userId, quizObject)
            .then(() => quizService.deleteQuiz(quizId))
            .then(response => {
                console.log("success delete")
                dispatch({
                    type: 'REMOVE QUIZ', 
                    payload: {
                      id: quizId
                    }
                  })
            })

            .catch((error: Error) => console.log('Error ' + error.message));



    }

    return (
        <div className="UserProfile">
            {
                isLoading ?
                    <Loading label="Trying to log you in..." />
                    :
                    <div id="profile-info">
                        {
                            state?.user && state?.auth ?
                                <>
                                    <div className="row">
                                        Username: <Input value={username} onChange={handleUsernameChange} />
                                        {
                                            showSaveUsername &&
                                            <Button type="success" onClick={changeUserName}>Save</Button>
                                        }
                                    </div>
                                    {
                                        feedback?.type === "username" &&
                                        <p id="feedback-username">{feedback.message}</p>
                                    }
                                    <div className="row">
                                        Created at: {state.user.created}
                                    </div>
                                    <section id="quizes">
                                        <h2>Your quizes:</h2>
                            {
                                            state?.user?.quizes && state.user.quizes.length ?
                                                <>
                                                    {state.user.quizes.map(q =>
                                                        <ul className="quiz-link">
                                                            <li><NavLink to={'/user/quizes/' + q.quizid}>{q.name}</NavLink> <Button type="error" onClick={(e) => deleteQuizInBoth(q)}>Delete</Button></li>
                                                        </ul>

                                                    )}


                                                </>
                                                :
                                                <p>You have no quizes</p>
                                        }
                                    </section>
                                    <Button id="log-out" onClick={handleSignOut}>Log out</Button>
                                </>
                                :
                                <>
                                    <div className="row">
                                        Username: <Input value={username} onChange={(e) => setUsername(e.currentTarget.value)} />
                                    </div>
                                    <div className="row">
                                        Password: <Input value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                                    </div>
                                    {
                                        error.error && error.message &&
                                        <div id="error-message" >{error.message}</div>
                                    }
                                    <div id="buttons-wrapper">
                                        <Button onClick={handleCreateUser}>Create user</Button>
                                        <Button onClick={handleLogIn}>Log in</Button>
                                    </div>
                                </>
                        }
                    </div>
            }
        </div>
    );
}

export default UserProfile;
