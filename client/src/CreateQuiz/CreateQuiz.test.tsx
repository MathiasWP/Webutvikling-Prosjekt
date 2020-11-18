/**
 * Mandatory imports to make test work
 */

import React from 'react'; 
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({adapter: new Adapter()}); // Configure enzyme


/**
 * Test for CreateQuiz:
 */

import CreateQuiz from './CreateQuiz'; 

describe('CreateQuiz', () => {
    const container = shallow(<CreateQuiz />);
  
    it('To show not logged in', () => {
      expect(
        container.contains([<p>please login</p>])
      ).toBeTruthy();
    });
});
