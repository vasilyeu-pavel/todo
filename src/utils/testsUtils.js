import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';

import * as firebase from 'firebase';
import config from '../config';

firebase.initializeApp(config);

import { StateProvider } from '../providers/store/store';

export const render = component => mount(
    <Router>
        <StateProvider>
            {component}
        </StateProvider>
    </Router>
);
