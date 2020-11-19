import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme




import Button from './Button';

describe('Button', () => {
    const container = shallow(<Button aaa={"abc"} />);

    it('Draw correctly', () => {

        expect(container.containsMatchingElement(<button aaa={"abc"} type={"button"} className={`button button-normal`} disabled={false}></button>)).toEqual(true);

    })
})
