import quizService from "./quiz-service";
import * as config from "../keys/config.js";
import axios from "axios";
var admin = require("firebase-admin");

// enter the UID of a firebase authentication user
let uid = "l6DDbz2LSjcqzYrVRPeCd9YhNNG2";
// enter the ID of a quiz used to testing.
let testQuizId = "1gMHov7NY8UN9fpr9Pc4";
// enter ID of a room used for testing
let testRoomId = "0uSjfDZf4O2azXUYlaGM";

let userToken = "";
let apiKey = config.apiKey;

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
      creator: "randomid123",
    };

    const data = await quizService.updateUserWithNewQuiz(uid, testQuiz);
    console.log(data);
  });

  test("change username", async () => {
    let spy = jest.spyOn(console, "log");
    const data = await quizService.changeUserName("test", {
      i: userToken,
    });
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith("Successful name change");
  });
});

describe("quiz tests", () => {
  test("get quiz details", async () => {
    const data = await quizService.getQuizById(testQuizId);
    expect(Object.keys(data).length).toBeGreaterThan(0);
  });

  test("update quiz", async () => {
    const newQuestion = {
      question: "Hva er 1+1?",
      answer: 2,
      options: [{ option1: 1, option2: 2, option3: 3, option4: 4 }],
    };
    const data = await quizService.updateQuiz(newQuestion, testQuizId);

    const modifiedQuiz = await quizService.getQuizById(testQuizId);
    expect(modifiedQuiz.questions.question).toEqual("Hva er 1+1?");
  });
});

describe("room tests", () => {
  test("get active rooms", async () => {
    const data = await quizService.getActiveRooms();
    expect(data.length).toBeGreaterThan(0);
  });

  test("get room", async () => {
    const data = await quizService.getRoom(testRoomId);
    expect(Object.keys(data).length).toBeGreaterThan(0);
  });

  test.skip("create quiz room", async () => {
    const data = await quizService.createQuizRoom({
      name: "test",
      quiz: "123",
    });
  });

  test("begin quiz round", async () => {
    const data = await quizService.beginQuizRoom({ i: userToken }, testRoomId);
    expect(data.inProgress).toBeTruthy();
  });

  test("change quiz room round", async () => {
    const data = await quizService.changeQuizRoomRound(
      { i: userToken },
      testRoomId
    );
    expect(data.round).toBeGreaterThan(0);
  });
});
