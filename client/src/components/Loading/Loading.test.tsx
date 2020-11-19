import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() }); // Configure enzyme




import Loading from './Loading';

describe('Loading', () => {
    const container = shallow(<Loading label="laaa" />);

    it('Draw correctly', () => {

        expect(container.containsMatchingElement(<div id="loading-wrapper">
            <h5>laaa</h5>
            <div id="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>)).toEqual(true);

    })
})
