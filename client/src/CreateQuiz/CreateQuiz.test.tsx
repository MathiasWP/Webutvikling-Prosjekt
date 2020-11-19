/**
 * Mandatory imports to make test work
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme

import quizService from '../service/quiz-service';
import firebase from 'firebase'


/*
mocks
*/
jest.mock("../service/quiz-service")
jest.mock("firebase")

/*
Default mock implementation
*/
beforeEach(() => {
  jest.resetAllMocks()

  quizService.getQuestionsCategories.mockImplementation(() => {
    return Promise.resolve({
      1: "history",
      2: "religion",
      3: "nature",
      4: "politics",
      5: "math",
      6: "physics",
      7: "other",
      8: "any"
    })
  })
});


import CreateQuiz from './CreateQuiz';
import Input from '../components/Input/Input';


describe('CreateQuiz not logged in', () => {

  firebase.auth.mockImplementation(() => {
    return { currentUser: null }
  })

  const container = shallow(<CreateQuiz />);

  it('To show not logged in', () => {

    expect(
      container.contains([<p>please login</p>])
    ).toBeTruthy();
  });


});

describe('CreateQuiz logged in', () => {

  firebase.auth.mockImplementation(() => {
    return { currentUser: { uid: "abc" } }
  })
  const container = shallow(<CreateQuiz />);

  it('Draw correctly', () => {

    expect(
      container.contains([<h2>Make your own quiz</h2>])
    ).toBeTruthy();
  });

  it('Draw some options', () => {

    expect(
      container.containsMatchingElement(<Input name="option1" type="text" value="" />)
    ).toEqual(true);
  });

  it('Draw answer', () => {

    expect(
      container.containsMatchingElement(<input name="answer1" type="radio" />)
    ).toEqual(true);
  });



});




