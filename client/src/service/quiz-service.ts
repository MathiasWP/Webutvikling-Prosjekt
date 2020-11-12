import axios from 'axios';
import firebase from '../config/firebase'

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

class QuizService {
  async getUserDetails() {
    try {
      const response = await axios.post('/getuserinfo', {
        data: {
          token: this.getCurrentUserToken()
        }
      });

      return response.data;
    } catch (error) {
      throw Error(error.message)
    }

  }

  async addUserToDatabase(user: any) {
    try {
      const response = await axios.post('/adduser', {
        data: {
          user,
          token: this.getCurrentUserToken()
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

  async createUser(email: string, password: string) {
    try {
      const data = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = this.addUserToDatabase(data);
      return user;
    } catch (error) {
      throw Error(error)
    }
  }

  async logIn(email: string, password: string) {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      return response;
    } catch (error) {
      throw Error(error)
    }
  }

  async signOut() {
    try {
      firebase.auth().signOut();
    } catch (error) {
      throw Error(error)
    }
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  getQuestionsCategories() {
    return axios.get('/question-categories').then((response) => response.data.categories);
  }

  submitQuiz(quizData) {
    return axios.post('/submitQuiz', quizData)
      .then((response: { data: any }) => response.data)
      .catch(error => console.error(error))
  }

  getCurrentUserToken() {
    return this.getCurrentUser()?.getIdToken();
  }

  getActiveRooms() {
    return axios.get('/activerooms')
      .then(response => response.data)
      .catch(error => console.log(error))
  }

  async getRoom(id: number | string) {
    try {
      const response = await axios.post('/getroom', {
        data: {
          id
        }
      });

      return response.data;
    } catch (error) {
      throw Error(error.message)
    }
  }

  async getCategories() {
    try {
      const response = await axios.post('/categories');
      return response.data;
    } catch (error) {
      throw Error(error.message)
    }
  }

  async findQuizesByCategory(category: number) {
    try {
      const response = await axios.post('/getquizes', {
        data: {
          category,
          token: this.getCurrentUserToken()
        }
      });

      return response.data;
    } catch (error) {
      throw Error(error.message)
    }
  }


  async createQuizRoom(room: any){
    return await axios.post('/createroom', room)
  }


  async getQuizById(id: string){
    return await axios.post('/getquiz', {id: id})
  }

  async addUserToQuizRoom(data: any, roomId: string) {
    try {
      const response = await axios.post('/addusertoquiz', {
        data: {
          data,
          token: this.getCurrentUserToken(),
          roomId
        }
      });

      return response.data;
    } catch (error) {
      throw Error(error.message)
    }  
  }

  async removeUserFromQuizRoom(data: any, roomId: string) {
    try {
      const response = await axios.post('/removeuserfromquiz', {
        data: {
          data,
          token: this.getCurrentUserToken(),
          roomId
        }
      });

      return response.data;
    } catch (error) {
      throw Error(error.message)
    }  
  }


}

const quizService = new QuizService();
export default quizService;
