import { db, auth } from './firebase'

class QuizService {
  test() {
    return db.collection('test').add({hello: 'world'});
  }

  checkCurrentUser() {
    return Promise.resolve(auth.currentUser);
  };
  
  createUser(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
    };
  
  
  logInUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  };
  
  logOutUser() {
    return auth.signOut()
  }

  getAll() {
    return new Promise((resolve, reject) => {
        /**
         * CLOUD-FUNCTION FIRED FROM HERE
         */
    });
  }

  create(data: object) {
    return new Promise((resolve, reject) => {
        /**
         * CLOUD-FUNCTION FIRED FROM HERE
         */
    });
  }

  update(data: object) {
    return new Promise((resolve, reject) => {        
        /**
        * CLOUD-FUNCTION FIRED FROM HERE
        */
    })
  }

  /**
   * Delete task with given id.
   */
  delete(id: number) {
    return new Promise<void>((resolve, reject) => {        
        /**
        * CLOUD-FUNCTION FIRED FROM HERE
        */
    });
  }
}

const quizService = new QuizService();
export default quizService;
