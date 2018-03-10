import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import ConcertsContainer from '../../client/dist/components/ConcertsContainer.jsx';



describe('< ConcertsContainer >', function() {
    it('should exist', function() {
        const wrapper = shallow(< ConcertsContainer />);
        expect(wrapper).to.be.undefined;
    })
})