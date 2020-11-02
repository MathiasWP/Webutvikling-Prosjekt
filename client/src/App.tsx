import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
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

function App() {

  /**
   * BOILERPLATE FOR APPLICATION
   * SHOWCASING CREATING AND LOGGING IN/OUT USER
   */

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=> {
    console.log(currentUser)
  },[currentUser])

  const createUser = () => {
    quizService.createUser({email: email, password: password})
    .then(data => setCurrentUser(data.user))
    .catch(e => console.log(e))
  }

  const loginUser = () => {
    quizService.login({email: email, password: password})
    .then(data => {
      setCurrentUser(data.user)
    })
    .catch(e => console.log(e))
  }

  const logOutUser = () => {
    quizService.logout()
    .then(data => {
      setCurrentUser(data)
    })
    .catch(e => console.log(e))
  }

  return (
    <div className="App">
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
    
    </div>
  );
}

export default App;
