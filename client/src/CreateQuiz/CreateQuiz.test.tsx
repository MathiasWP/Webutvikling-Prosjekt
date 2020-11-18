import React from 'react'; 
import CreateQuiz from './CreateQuiz'; 
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

// Configure enzyme
configure({adapter: new Adapter()});

describe('CreateQuiz', () => {
    const container = shallow(<CreateQuiz />);
  
    it('To show not logged in', () => {
      expect(
        container.contains([<p>please login</p>])
      ).toBeTruthy();
    });
});
