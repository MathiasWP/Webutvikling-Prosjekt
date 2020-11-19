import quizService from "./quiz-service";
import config from "../keys/config.js";
import axios from "axios";

var admin = require("firebase-admin");
let uid = "l6DDbz2LSjcqzYrVRPeCd9YhNNG2";
let userToken = "";
let apiKey = config.apiKey;
// userToken.i for test@test.test
//const userToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlNTQyN2NkMzUxMDhiNDc2NjUyMDhlYTA0YjhjYTZjODZkMDljOTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd2VidXR2aWtsaW5nLW50bnUtcXVpeiIsImF1ZCI6IndlYnV0dmlrbGluZy1udG51LXF1aXoiLCJhdXRoX3RpbWUiOjE2MDU3MDkyNDksInVzZXJfaWQiOiJsNkREYnoyTFNqY3F6WXJWUlBlQ2Q5WWhOTkcyIiwic3ViIjoibDZERGJ6MkxTamNxellyVlJQZUNkOVloTk5HMiIsImlhdCI6MTYwNTcwOTI0OSwiZXhwIjoxNjA1NzEyODQ5LCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRlc3RAdGVzdC50ZXN0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.MjDPPQ-zV0YFyVCOWxvF48Fak6clK7H-fuTFW9CcYdFMKmcvDFvuPHB-yRvvVCMsEF3wF_RAI9sx6WE3SpjzoTpWzCU6YMATvbY6_HivLF4Fs1sOjJwey6gPEks03qNPeKhFg3d4gClqHvlfm2ggszy8gaXqGPMcYYlNpUpyCfhR19uJUHvcmlA7NC0MlAY50ZrMjCIj-B_2IyZ6y5oc8j8-698FXiw7n0_uCen8nu-wDcnJB46QsszmbDKTGtEf4Fw1nPR9ELZbcFjjVe-1NZ5w5ynvaZyKvPkJNApU5LDk7eLily_nyc61ThSjh5sG_O3njlKK9koI3kvWlw0K7A'
describe("category tests", () => {
  test("check if getCategories returns all categories", async () => {
    const testData = {
      categories: {
        "1": "history",
        "2": "religion",
        "3": "nature",
        "4": "politics",
        "5": "math",
        "6": "physics",
        "7": "other",
        "8": "any",
      },
    };

    const data = await quizService.getCategories();
    expect(data).toEqual(testData);
  });

  test("check if findQuizesByCategory return category 1", async () => {
    let customToken = await admin.auth().createCustomToken(uid);
    let response = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=" +
        apiKey,
      {
        token: customToken,
        returnSecureToken: true,
      }
    );

    userToken = response.data.idToken;

    const data = await quizService.findQuizesByCategory(1, { i: userToken });
    expect(data.length).toBeGreaterThan(0);
  });
});

describe("user tests", () => {
  test.skip("check if user is added properly", async () => {
    const data = await quizService.addUser("", { i: userToken });
  });

  test("get user info by id", async () => {
    const data = await quizService.getUserInfoById({ i: userToken });

    expect(data.name).toEqual("test");
  });

  test.skip("update user with new quiz", async () => {
    const testQuiz = {
      name: "testquiz",
      creator: "mOCOiyJFvPU9ojL2O1kHmjT39Y92",
    };

    const data = await quizService.updateUserWithNewQuiz(
      "mOCOiyJFvPU9ojL2O1kHmjT39Y92",
      testQuiz
    );
    console.log(data);
  });

  test("change username", async () => {
    let spy = jest.spyOn(console, "log");
    const data = await quizService.changeUserName("test", {
      i: userToken,
    });
    //expect(data).toEqual("123");
    //expect(console.log).toHaveBeenCalledWith("Successful name change");
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith("Successful name change");
  });
});

describe("quiz tests", () => {
  test("get quiz details", async () => {
    const data = await quizService.getQuizById("1gMHov7NY8UN9fpr9Pc4");
    expect(Object.keys(data).length).toBeGreaterThan(0);
  });

  test("update quiz", async () => {
    const newQuestion = {
      question: "Hva er 1+1?",
      answer: 2,
      options: [{ option1: 1, option2: 2, option3: 3, option4: 4 }],
    };
    const data = await quizService.updateQuiz(
      newQuestion,
      "1tlbot3Atdasgc5TSFsG"
    );

    const modifiedQuiz = await quizService.getQuizById("1tlbot3Atdasgc5TSFsG");
    expect(modifiedQuiz.questions.question).toEqual("Hva er 1+1?");
  });
});

describe("room tests", () => {
  test("get active rooms", async () => {
    const data = await quizService.getActiveRooms();
    expect(data.length).toBeGreaterThan(0);
  });

  test("get room", async () => {
    const data = await quizService.getRoom("vw3l3lOqWyNIMQ6wREHz");
    expect(Object.keys(data).length).toBeGreaterThan(0);
  });

  test.skip("create quiz room", async () => {
    const data = await quizService.createQuizRoom({
      name: "test",
      quiz: "123",
    });
  });

  test("begin quiz round", async () => {
    const data = await quizService.beginQuizRoom(
      { i: userToken },
      "0uSjfDZf4O2azXUYlaGM"
    );
    expect(data.inProgress).toBeTruthy();
  });

  test("change quiz room round", async () => {
    const data = await quizService.changeQuizRoomRound(
      { i: userToken },
      "0uSjfDZf4O2azXUYlaGM"
    );
    expect(data.round).toBeGreaterThan(0);
  });
});
