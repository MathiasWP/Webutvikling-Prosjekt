import { db, auth, _firestore, adminAuth } from './firebase'


class QuizService {
  async getUserInfoById(token: { i: string }) {
    try {
      const isAllowed = await adminAuth.verifyIdToken(token.i);

      if (isAllowed.uid) {
        const doc = await db.collection("users").doc(isAllowed.uid).get()
        if (doc.exists) {
          return doc.data();
        } else {
          throw Error("No such document!");
        }
      } else {
        throw Error("Not allowed")
      }
    } catch (error) {
      throw Error(error.message);
    }
  };


  async addUser(user: any, token: { i: string }) {
    try {
      const isAllowed = await adminAuth.verifyIdToken(token.i);

      if (isAllowed.uid) {
        const username = user.email.split('@')[0]; // Taking email name as username
        const timestamp = new Date().toUTCString();

        const data = {
          name: username,
          created: timestamp,
          quizes: {}
        };

        const response = await db.collection("users").doc(isAllowed.uid).set(data);

        return response;
      } else {
        throw Error("Not allowed")
      }
    } catch (error) {
      throw Error(error.message)
    }
  };




  getQuestionsCategories() {
    return db
      .collection("categories")
      .doc("categories")
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


  submitQuiz(quizData) {
    let autoID = db.collection("quizes").doc().id;
    const timestamp = new Date().toUTCString();

    /*
    name: title,
          category: parseInt(selectedCategory),
          questions: questionsCollection*/

    const data = {
      category: quizData.category,
      creater: quizData.creator,
      name: quizData.name,
      questions: quizData.questions,
      type: "multiple",
      timestamp_created: timestamp
    };

    return db
      .collection('quizes')
      .doc(autoID)
      .set(data);
  }

  async changeUserName(userName: string, token: { i: string }) {
    try {
      const isAllowed = await adminAuth.verifyIdToken(token.i)
      if (isAllowed.uid) {
        return db.collection("users").doc(isAllowed.uid).update({ "name": userName });
      } else {
        throw Error("Not allowed")
      }
    } catch (error) {
      throw Error(error.message)
    }

  }

  async getActiveRooms() {
    let rooms = [];
    const groupRooms = db.collection('group-rooms');
    const snapshot = await groupRooms.where('active', '==', true).get();
    let i = 0;

    snapshot.forEach(doc => {
      const docData = doc.data();
      if (!docData.finished) {
        rooms.push(docData);
        rooms[i].id = doc.id;
        i++;
      }
    });

    return rooms
  }

  async getRoom(id: string) {
    const groupRoom = await db.collection('group-rooms').doc(id);
    try {
      const doc = await groupRoom.get();
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getCategories() {
    const categories = await db.collection('categories').doc('categories');
    try {
      const doc = await categories.get();
      if (doc.exists) {
        return doc.data();
      } else {
        return [null];
      }
    } catch (error) {
      throw Error(error.message);
    }
  }

  async findQuizesByCategory(category: string | number, token: { i: string }) {
    try {
      const isAllowed = await adminAuth.verifyIdToken(token.i)
      if (isAllowed.uid) {
        const quizes = [];
        const snapshot = await db.collection('quizes').where('category', '==', category).get();
        let i = 0;
        snapshot.forEach(doc => {
          const docData = doc.data();
          if (!docData.finished) {
            quizes.push(docData);
            quizes[i].id = doc.id;
            i++;
          }
        });

        return quizes;
      } else {
        throw Error("Not allowed")
      }
    } catch (error) {
      throw Error(error.message)
    }
  }

  async createQuizRoom(quiz){
        /* create quiz room here */
        let setDoc = await db.collection('group-rooms').add(quiz)
        return setDoc
    }

  async getQuizById(id: string){
        const ref  = db.collection('quizes').doc(id)
        const doc = await ref.get();
        return doc.data()
    }


  async addUserToQuizRoom(token: { i: string }, data, roomId) {
    try {
      const isAllowed = await adminAuth.verifyIdToken(token.i)
      if(data.uid === isAllowed.uid) { // Don't add quizmaster to his own quiz
        return null;
      }
      if (isAllowed.uid) {
        const action = db.collection("group-rooms").doc(roomId)
        .update({
          players: _firestore.FieldValue.arrayUnion(data)
        });

        return data;
      } else {
        throw Error("Not allowed")
      }
    } catch (error) {
      throw Error(error.message)
    }

  }

  async removeUserFromQuizRoom(token: { i: string }, data, roomId) {
    try {
      const isAllowed = await adminAuth.verifyIdToken(token.i)
      if (isAllowed.uid) {
        const action = db.collection("group-rooms").doc(roomId)
        .update({
          players: _firestore.FieldValue.arrayRemove(data)
        });

        return data;
      } else {
        throw Error("Not allowed")
      }
    } catch (error) {
      throw Error(error.message)
    }

  }
  
}
const quizService = new QuizService();
export default quizService;
