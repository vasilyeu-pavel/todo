import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { StateProvider } from './providers/store/store';

import * as firebase from 'firebase';
import config from './config';

import { routes } from './routes';
import './App.css';

firebase.initializeApp(config);

const App = () => (
    <Router>
        <StateProvider>
            <Switch>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        component={props => (
                            <route.layout {...props}>
                                <route.component {...props} />
                            </route.layout>
                        )}
                    />
                ))}
            </Switch>
        </StateProvider>
    </Router>
);

export default App;
