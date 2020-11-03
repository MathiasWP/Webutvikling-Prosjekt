import { db, auth } from './firebase'

class QuizService {  

  getUserInfoById(id: string) {
    console.log(id)
    return db
      .collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            return "No such document!"
        }
      }).catch((error) => {
          return error
      });
  };
  
  
  addUser(user: any) {
    const username = user.email.split('@')[0]; // Taking email name as username
    const timestamp = new Date().toUTCString();

    const data = {
      name: username,
      created: timestamp,
      quizes: {}
    };

    return db
      .collection("users")
      .doc(user.uid)
      .set(data)
    }
    

    changeUserName(userName:string, UID:string) {
      return db.collection("users").doc(UID).update({"name": userName});
    }
}

const quizService = new QuizService();
export default quizService;
