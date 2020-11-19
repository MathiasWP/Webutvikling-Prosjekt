import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme



/*
mocks
*/




import QuestionRound from './QuestionRound';
import Button from '../Button/Button';
import QuestionCard from '../QuestionCard/QuestionCard';


describe('QuestionRound', () => {


    const container = shallow(< QuestionRound disabledAnswers={false} isQuizMaster={false} onChangeRound={() => { }} allQuestions={{}} round={1} onAnswer={() => { }} />);


    it('Draw  correctly', () => {

        expect(
            container.containsMatchingElement([<QuestionCard disabledAnswers={false} question={{}} />])
        ).toEqual(true);
    });








});


