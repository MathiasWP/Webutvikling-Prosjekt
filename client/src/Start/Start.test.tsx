import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme

import quizService from '../service/quiz-service';
import firebase from 'firebase'



import Start from './Start';

describe('Start', () => {


    const container = shallow(<Start />);

    it('Draw correctly', () => {

        expect(
            container.containsMatchingElement([
                <h3>Choose your way:</h3>,
                <button>Singleplayer</button>,
                <button>Grouproom</button>
            ])
        ).toEqual(true);
    });


    it('Button calls function on click-event', () => {
        let buttonClicked = false;
        const wrapper = shallow(
            <button onClick={() => (buttonClicked = true)}>Singleplayer</button>
        );

        wrapper.find('button').simulate('click');

        expect(buttonClicked).toEqual(true);
    });





});