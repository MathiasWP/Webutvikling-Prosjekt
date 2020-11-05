import axios from 'axios';
import firebase from '../config/firebase'

axios.defaults.baseURL = 'http://localhost:3000/api/v1';


class QuizService {
  getUserDetails(uid: string) {
      return axios.put(`/user/${uid}`)
      .then((response: {data: any}) => response.data)
      .catch(error => console.error(error))
  }

  addUserToDatabase(user: any) {
    return axios.post('/adduser', {
      data: {
         user
      }
    })
    .then((response: {data: any}) => response.data)
    .catch(error => console.error(error))
  }

  changeUsername(userName: string) {
    return axios.post('/changeusername', {
      data: {
         userName: userName,
         token: this.getCurrentUserToken()
      }
    })
    .then((response: {data: any}) => response.data)
    .catch(error => console.error(error))
  }

  /**
   * This is done here because the firebase api works that way (cookies ftw)
   */
  createUser(email: string, password: string) {
   return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  logIn(email: string, password: string) {
   return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  getCurrentUserToken() {
    return this.getCurrentUser().getIdToken();
  }
}

const quizService = new QuizService();
export default quizService;
