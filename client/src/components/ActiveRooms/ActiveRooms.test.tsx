import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme

import { Link } from 'react-router-dom';

import quizService from '../../service/quiz-service';



/*
mocks
*/
jest.mock("../../service/quiz-service")




/*
Default mock implementation
*/
beforeEach(() => {
    jest.resetAllMocks()

    quizService.getActiveRooms.mockImplementation(() => {
        return Promise.resolve([{
            id: "a",
            name: "b",
            quiz: { category: 1 },
            players: []
        }])
    })

    quizService.getCategories.mockImplementation(() => {
        return Promise.resolve({ categories: { 1: "q", 2: "p" } })
    })


});


import ActiveRooms from './ActiveRooms';

describe('ActiveRooms', () => {
    const container = shallow(<ActiveRooms />);

    it('Draw room correctly', () => {

        //expect(container.containsMatchingElement(<td>a</td>)).toEqual(true);

    })
})
