import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme

import firebase from 'firebase'



/*
mocks
*/
jest.mock("firebase")


/*
Default mock implementation
*/
beforeEach(() => {
    jest.resetAllMocks()

    firebase.auth.mockImplementation(() => {
        return { currentUser: { uid: "abc" } }
    })


});


import WaitingRoom from './WaitingRoom';

describe('WaitingRoom', () => {
    const container = shallow(<WaitingRoom players={[{ name: "player" }]} quizRoom={{ quiz_master: "aaa" }} onBegin={() => { }} />);

    it('Draw room correctly', () => {

        expect(container.containsMatchingElement(<h1>Waiting room</h1>)).toEqual(true);
        expect(container.containsMatchingElement(<li>player</li>)).toEqual(true);

    })
})
