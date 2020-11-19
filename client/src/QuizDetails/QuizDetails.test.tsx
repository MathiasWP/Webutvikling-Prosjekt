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

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));



/*
Default mock implementation
*/
beforeEach(() => {
    jest.resetAllMocks()

    quizService.getQuizDetails.mockImplementation(() => {
        return Promise.resolve({

            category: 1,
            creater: "tester",
            name: "test quiz",
            questions: [
                {
                    question: "what is it",
                    options: {
                        option1: 1,
                        option2: 2,
                        option3: 3,
                        option4: 4
                    },
                    answer: 1
                }
            ],
            timestamp_created: "Sun, 15 Nov 2020 11:17:33 GMT",
            type: "multiple"

        })
    })

    quizService.updateQuiz.mockImplementation((newQuestions, quizId) => {

        return Promise.resolve("response")
    })
});



import QuizDetails from './QuizDetails';
import Input from '../components/Input/Input';


describe('QuizDetails', () => {

    firebase.auth.mockImplementation(() => {
        return { currentUser: { uid: "abc" } }
    })


    const container = shallow(<QuizDetails {...{ match: { params: { id: "av" } } }} />);


    it('Draw button correctly', () => {

        expect(
            container.containsMatchingElement([<button >Update your quiz</button>])
        ).toEqual(true);
    });

    it('Draw question', () => {

        expect(
            container.containsMatchingElement(<p className="row">Question:<input className="questionInput" value=""></input></p>)
        ).toEqual(true);
    });

    it('QuizDetails sets location on create', (done) => {

        container.find('input').at(0).simulate('change', { target: { value: "new question" } });

        expect(container.containsMatchingElement([<input className="questionInput" value="new question"></input>]))

        container.find('button').simulate('click');

        setTimeout(() => {
            expect(mockHistoryPush).toHaveBeenCalledWith('/user/update/success')
            done()
        })


    })





});


