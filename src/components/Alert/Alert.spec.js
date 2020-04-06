import React from 'react';
import { shallow } from 'enzyme';

import Alert from './Alert';

describe('<Alert />', () => {
    let wrapper;
    const props = {};

    beforeEach(() => {
        props.isConnected = false;

        wrapper = shallow(<Alert {...props} />);
    });

    describe('<RENDER>', () => {
        it('render alert', () => {
            expect(wrapper.find('div')).toHaveLength(1);
        });

        it('close alert', () => {
            expect(wrapper.find('#close-btn')).toHaveLength(1);

            wrapper.find('#close-btn').simulate('click');

            expect(wrapper.find('div')).toHaveLength(0);
        });
    });
});
