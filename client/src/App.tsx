import React ,{ useEffect, useState } from 'react';
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
      <header className="App-header">
        Hei og velkommen til Quiz!
      </header>
      <div className="App-body">
        <input type='text' placeholder='brukernavn' onChange={(e) => setEmail(e.currentTarget.value)}/>
        <input type="password" placeholder='passord' onChange={(e) => setPassword(e.currentTarget.value)}/>
        <button onClick={createUser}>Lag bruker</button>
        <button onClick={loginUser}>Logg inn bruker</button>
        {
          currentUser &&
        <div>
        Logged in user: {currentUser.uid}
        <button onClick={logOutUser}>Logg ut</button>
        </div>
        }
      </div>
    </div>
  );
}

export default App;
