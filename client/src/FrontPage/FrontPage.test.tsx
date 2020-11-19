import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme

import quizService from '../service/quiz-service';
import firebase from 'firebase'



import FrontPage from './FrontPage';
import Button from '../components/Button/Button';

describe('FrontPage', () => {


    const container = shallow(<FrontPage />);

    it('Draw correctly', () => {

        expect(
            container.containsMatchingElement([
                <h1>Quiz-time!</h1>,
                <Button >Play</Button>,
                <Button >Create quiz</Button>
            ])
        ).toEqual(true);
    });


    it('Button calls function on click-event', () => {
        let buttonClicked = false;
        const wrapper = shallow(
            <Button onClick={() => (buttonClicked = true)}>Create quiz</Button>
        );

        wrapper.find('button').simulate('click');

        expect(buttonClicked).toEqual(true);
    });





});