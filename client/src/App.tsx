import React, { useMemo, useState , useContext} from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import firebase from './config/firebase';
import FrontPage from './FrontPage/FrontPage';
import GroupRoom from './GroupRoom/GroupRoom';
import CreateGroupRoom from './CreateGroupRoom/CreateGroupRoom';
import NoMatch from './NoMatch/NoMatch';
import SinglePlayer from './SinglePlayer/SinglePlayer';
import Start from './Start/Start';
import UserProfile from './UserProfile/UserProfile';
import CreateQuiz from './CreateQuiz/CreateQuiz';

import './App.scss';
import quizService from './service/quiz-service'
import { store } from './store/store';

function App() {
  const { state, dispatch } = useContext(store);


  /**
   * Finding out if a user is logged in via auth-api and
   * adding it to the store (only doing on load)
   */
  useMemo(() => {
      firebase.auth().onAuthStateChanged((user) => {
        /**
         * ATM we always have a user object in our store, but
         * if the user was not found we just set it to null.
         */
        if (user) {
          quizService.getUserDetails(user.uid)
            .then(data => dispatch({ type: 'SET USER', payload: 
            {
              user_details: data,
              auth: quizService.getCurrentUser()
            }}))
            .catch(error => console.log(error))
        }
        else {
          dispatch({ type: 'SET USER', payload: 
            {
              user_details: null,
              auth: null
            }})
        }
        } 
      );
  }, [])

  return (
    <div className="App">
      {
        state?.user ?
        <>
          <nav>
            <Link to="/">Startpage</Link>
            <Link to="/:user">Profile page</Link>
            </nav>
          <Switch>
           <Route exact path="/">
            <FrontPage />
          </Route>
          <Route path="/start">
            <Start />
          </Route>
          <Route path="/singleplayer">
            <SinglePlayer />
          </Route>
          <Route path="/grouproom">
            <CreateGroupRoom />
          </Route>
          <Route exact path="/grouproom/:id">
            <GroupRoom />
          </Route>
          <Route exact path="/:user">
            <UserProfile />
          </Route>
          <Route exact path="/:user/create">
            <CreateQuiz />
          </Route>
          <Route>
            <NoMatch />
          </Route>
         </Switch>
        </>
        :
        'Laster'
      }
    </div>
  );
}

export default App;
