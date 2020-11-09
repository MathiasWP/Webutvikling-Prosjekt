import axios from 'axios';
import firebase from '../config/firebase'

axios.defaults.baseURL = 'http://localhost:3000/api/v1';


class QuizService {
  getUserDetails(uid: string) {
    return axios.put(`/user/${uid}`)
      .then((response: { data: any }) => response.data)
      .catch(error => console.error(error))
  }

  addUserToDatabase(user: any) {
    return axios.post('/adduser', {
      data: {
        user
      }
    })
      .then((response: { data: any }) => response.data)
      .catch(error => console.error(error))
  }

  changeUsername(userName: string, userToChange: string) {
    if (userToChange !== this.getCurrentUser().uid) {
      return;
    }

    return axios.post('/changeusername', {
      data: {
        userName: userName,
        userToChange: userToChange
      }
    })
      .then((response: { data: any }) => response.data)
      .catch(error => console.error(error))
  }

  /**
   * This is done here because the firebase api works that way (cookies ftw)
   */
  createUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(data => {
        this.addUserToDatabase(data)
      })
      .catch((error) => {
        // Handle Errors here.
        const { code, message } = error;
      });
  }

  logIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(data => {

        data
      }) // Add to store or something so we know which user is logged in?
      .catch((error) => {
        // Handle Errors here.
        const { code, message } = error;
      });
  }

  signOut() {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  getQuestionsCategories() {
    return axios.get('/categories').then((response) => response.data.categories);

  }

  submitQuiz(quizData) {
    return axios.post('/submitQuiz', quizData)
      .then((response: { data: any }) => response.data)
      .catch(error => console.error(error))
  }
}

const quizService = new QuizService();
export default quizService;
