import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme



import QuestionCard from '../QuestionCard/QuestionCard';

const question = {
    answer: "a",
    question: "b",
    options: {
        option1: "1",
        option2: "2",
        option3: "3",
        option4: "4"
    }
}

describe('QuestionCard', () => {

    const container = shallow(< QuestionCard question={question} disabledAnswers={false} onAnswer={() => { }} />);

    it('Draw correctly', () => {

        console.log(container.debug())
        expect(container.containsMatchingElement(<h3>b</h3>))
        expect(
            container.containsMatchingElement(<input name="choice0" disabled={false} id="choice0" type="radio" value="option1" />)
        ).toEqual(true);
    });








});

