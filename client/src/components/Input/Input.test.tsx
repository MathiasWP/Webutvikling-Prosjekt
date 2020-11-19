import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme
import Input from './Input';

describe('Input', () => {
    const container = shallow(<Input name="aaa" disabled={false} id="choice0" type="radio" value="bbb" />);
    it('Draw correctly', () => {
        expect(container.containsMatchingElement(<input className="input" name={"aaa"} type={"radio"} value={"bbb"} />)).toEqual(true);

    })
})
