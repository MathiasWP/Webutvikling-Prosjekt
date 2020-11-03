import React, { useEffect, useState, useContext } from 'react';
import {useParams} from 'react-router-dom'
import firebase from '../config/firebase';
import './UserProfile.scss';
import quizService from '../service/quiz-service'

import Input from '../components/Input/Input'
import { sign } from 'crypto';

import { store } from '../store/store';

function UserProfile() {
    // We can use this to check if the person visiting the site is the same 
    // as the user stored in the store. With this we can create an app where
    // people can look at each others users, while only yourself having the
    // possibility to do stuff like changing the username
    const { user } = useParams(); 

    const { state } = useContext(store);

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
  
    function changeUserName() {
        quizService
        .changeUsername(username, state.auth.uid)
        .then(data => alert('Name changed'))
        .catch(error => console.error(error))
    }


    useEffect(() => {
        if(state.user?.name) {
            setUsername(state.user?.name)
        }
    }, [state])



  return (
    <div className="UserProfile">
        <div id="profile-info">

        {
            state?.user ?
            <>
            <button onClick={quizService.signOut}>Log out</button>
            <span>
            Username: <Input value={username} onChange={(e) => setUsername(e.currentTarget.value)}/>
            <button onClick={changeUserName}>Save</button>
            </span>
            <span>
                Created at: {state.user.created}
            </span>
            <span>
                User-id: {state.auth.uid}
            </span>
            <section id="quizes">
                Your quizes:
                {
                    Object.keys(state.user.quizes).length ?
                    <>
                        {Object.values(state.user.quizes).map(q => <p>{q}</p>)}
                    </>
                    : 
                    <p>You have no quizes</p>
                }
            </section>
        </>
        :
        <>
            <span>
            Username: <Input value={username} onChange={(e) => setUsername(e.currentTarget.value)}/>
            </span>
            <span>
            Password: <Input value={password} onChange={(e) => setPassword(e.currentTarget.value)}/>
            </span>
            <button onClick={() => quizService.logIn(username, password)}>Log in</button>
            <button onClick={() => quizService.createUser(username, password)}>Create user</button>
        </>

        }
        </div>
    </div>
  );
}

export default UserProfile;
