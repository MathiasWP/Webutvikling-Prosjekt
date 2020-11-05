import axios from 'axios';
import firebase from '../config/firebase'

axios.defaults.baseURL = 'http://localhost:3000/api/v1';


class QuizService {
  async getUserDetails(uid: string) {
    try {
      const response = await axios.put(`/user/${uid}`);
      return response.data;
    } catch (error) {
      throw Error(error.message)
    }

  }

  async addUserToDatabase(user: any) {
    try {
      const response = await axios.post('/adduser', {
        data: {
           user
        }
      });

      return response.data;
    } catch (error) {
      throw Error(error.message)
    }
  }

  async changeUsername(userName: string) {
    try {
      const response = await axios.post('/changeusername', {
        data: {
           userName: userName,
           token: this.getCurrentUserToken()
        }
      });

      return response.data;
    } catch (error) {
      throw Error(error.message)
    }
  }

  createUser(email: string, password: string) {
   return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  logIn(email: string, password: string) {
   return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  getCurrentUserToken() {
    return this.getCurrentUser()?.getIdToken();
  }
}

const quizService = new QuizService();
export default quizService;
