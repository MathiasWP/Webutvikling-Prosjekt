import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme

import quizService from '../service/quiz-service';
import socketService from '../service/socket-service';

import Input from '../components/Input/Input';

import firebase from 'firebase'


/*
mocks
*/
jest.mock("../service/quiz-service")
jest.mock("../service/socket-service")
jest.mock("firebase")

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLocation: () => ({
        pathname: "a/b",
    }),
}));




/*
Default mock implementation
*/
beforeEach(() => {
    jest.resetAllMocks()

    quizService.beginQuizRoom.mockImplementation((roomId) => {
        return Promise.resolve({
            quiz_master: "m",
            players: [{ uid: "a" }]
        })
    })

    quizService.changeQuizRoomRound.mockImplementation((roomId) => {
        return Promise.resolve({
            quiz_master: "m",
            players: [{ uid: "a" }]
        })
    })
    quizService.getRoom.mockImplementation((roomId) => {
        return Promise.resolve({
            quiz_master: "m",
            players: [{ uid: "a" }]
        })
    })

    quizService.addUserToQuizRoom.mockImplementation((message, roomId) => {
        return Promise.resolve({})
    })

    quizService.removeUserFromQuizRoom.mockImplementation((message, roomId) => {
        return Promise.resolve({})
    })

    socketService.subscribe.mockImplementation(() => {
        return {
            onopen: () => any = () => { },
            onmessage: (arg0: any) => any = () => { },
            onclose: (code: any, reason: string) => any = () => { },
            onerror: (error: any) => any = () => { }
        }
    })
    socketService.send.mockImplementation((data) => {
        return {}
    })
    socketService.unsubscribe.mockImplementation((data) => {
        return {}
    })

    firebase.auth.mockImplementation(() => {
        return { currentUser: { uid: "abc" } }
    })
});



import GroupRoom from './GroupRoom';
import Loading from '../components/Loading/Loading'




describe('GroupRoom', () => {
    const container = shallow(<GroupRoom />);

    it('Draw room correctly', () => {
        expect(container.containsMatchingElement(<Loading label="Snart klar til å spille?" />)).toEqual(true);
    })
})
