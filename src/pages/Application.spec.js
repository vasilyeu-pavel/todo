import React from 'react'
import { render } from '../utils/testsUtils';
import Application from './Application';


describe('<Application>', () => {
    let app;

    const props = {
        className: 'test',
    };

    beforeEach(() => {
        app = render(<Application {...props} />);
    });

    it('should create snapshot', () => {
        expect(app).toMatchSnapshot()
    });

    it('should render main content', () => {
        expect(app.find('.main-content')).toHaveLength(1);
    });
});
