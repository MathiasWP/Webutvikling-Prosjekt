import { db, auth, adminAuth } from './firebase'

class QuizService {
  async getUserInfoById(token: {i: string}) {
    try {
      const isAllowed = await adminAuth.verifyIdToken(token.i);

      if(isAllowed.uid) {
        const doc = await db.collection("users").doc(isAllowed.uid).get()
        if(doc.exists) {
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
  
  
   async addUser(user: any, token: {i: string}) {
      try {
        const isAllowed = await adminAuth.verifyIdToken(token.i);

        if(isAllowed.uid) {
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
    

    async changeUserName(userName:string, token: {i: string}) {
      try {
        const isAllowed = await adminAuth.verifyIdToken(token.i)
          if(isAllowed.uid) {
            return db.collection("users").doc(isAllowed.uid).update({"name": userName});
          } else {
            throw Error("Not allowed")
          }
      } catch (error) {
          throw Error(error.message)
      }
     
    }

    async getActiveRooms(){
      let rooms = [];
      const groupRooms = db.collection('group-rooms');
      const snapshot = await groupRooms.where('active', '==', true).get();
      let i = 0;

      snapshot.forEach(doc => {
        const docData = doc.data();
        if(!docData.finished) {
            rooms.push(docData);
            rooms[i].id = doc.id;
            i++;
        }
      });

      return rooms
  }

  async getRoom(id) {
    const groupRoom = await db.collection('group-rooms').doc(id);
    try {
      const doc = await groupRoom.get();
      if(doc.exists) {
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
      if(doc.exists) {
        return doc.data();
      } else {
        return [null];
      }
    } catch (error) {
      throw Error(error.message);
    }
  }

  async findQuizesByCategory(category:string|number, token: {i: string}) {
    try {
      const isAllowed = await adminAuth.verifyIdToken(token.i)
        if(isAllowed.uid) {
          const quizes= [];
          const snapshot = await db.collection('quizes').where('category', '==', category).get();
          let i = 0;
          snapshot.forEach(doc => {
            const docData = doc.data();
            if(!docData.finished) {
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
}
const quizService = new QuizService();
export default quizService;
