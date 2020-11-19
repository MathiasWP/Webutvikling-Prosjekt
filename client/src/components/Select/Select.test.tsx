import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme




import Select from './Select';

describe('Loading', () => {
    const container = shallow(<Select mmm="aaaa" value="abc" />);

    it('Draw correctly', () => {

        expect(container.containsMatchingElement(<select mmm="aaaa" value={"abc"} className={`select`} disabled={false}></select>)).toEqual(true);

    })
})
