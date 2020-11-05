import React, { useEffect, useState, useContext, useRef } from 'react';
import {useParams} from 'react-router-dom'
import firebase from '../config/firebase';
import './UserProfile.scss';
import quizService from '../service/quiz-service'

import Input from '../components/Input/Input'
import Button from '../components/Button/Button'

import { store } from '../store/store';

function UserProfile() {
    // We can use this to check if the person visiting the site is the same 
    // as the user stored in the store. With this we can create an app where
    // people can look at each others users, while only yourself having the
    // possibility to do stuff like changing the username
    const { user } = useParams(); 

    const { state } = useContext(store);

    const [password, setPassword] = useState('passord');
    const [username, setUsername] = useState('test@test.test');
    const [showSaveUsername, setShowSaveUsername] = useState(false);
    const storedUsername = useRef();
    const [error, setError] = useState({error: '', message: ''});
    const [feedback, setFeedback] = useState(null)
  
    function handleLogIn() {
            quizService.logIn(username, password)
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                const {code, message} = error;
                setError({error: code, message: message})
            })
    }

    
    function handleCreateUser() {
        quizService.createUser(username, password)
        .then(data => {
            quizService.addUserToDatabase(data)
        })
        .catch(error => {
            const {code, message} = error;
            setError({error: code, message: message})
        })
    }

    function handleSignOut() {
        setUsername('');
        setPassword('');
        quizService.signOut();
    }


    function handleUsernameChange(e) {
        const value =e.currentTarget.value 
        setUsername(value)
        setShowSaveUsername(value !== storedUsername.current)
    }

    
    function changeUserName() {
        quizService
        .changeUsername(username)
        .then(data => {
            storedUsername.current = username
            setShowSaveUsername(username !== storedUsername.current)
            setFeedback({type: 'username', message: "New username saved!"})

            setTimeout(() => {
                setFeedback(null)
            }, 3200)
        })
        .catch(error => console.error(error))
    }




    useEffect(() => {
        if(state.user?.name) {
            const currentValue = state.user.name;
            setUsername(currentValue)
            storedUsername.current = currentValue;
        }
    }, [state])


    console.log(state)
  return (
    <div className="UserProfile">
        <div id="profile-info">
        {
            state?.user && state?.auth ?
            <>
            <div className="row">
            Username: <Input value={username} onChange={handleUsernameChange}/>
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
                Your quizes:
                {
                    state?.user?.quizes && Object.keys(state.user.quizes).length ?
                    <>
                        {Object.values(state.user.quizes).map(q => <p>{q}</p>)}
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
            Username: <Input value={username} onChange={(e) => setUsername(e.currentTarget.value)}/>
            </div>
            <div className="row">
            Password: <Input value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
            </div>
            {
                error.error && error.message  &&
            <div id="error-message" >{error.message}</div>
            }
            <div id="buttons-wrapper">
            <Button onClick={handleCreateUser}>Create user</Button>
            <Button onClick={handleLogIn}>Log in</Button>
            </div>
        </>

        }
        </div>
    </div>
  );
}

export default UserProfile;
